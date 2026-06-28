import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectCategory from "@/models/ProjectCategory";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  await connectDB();
  const projects = await Project.find({}).populate("category", "name slug logoUrl").sort({ createdAt: -1 }).lean();

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      descriptionMarkdown,
      images,
      actualPrice,
      discountPrice,
      url,
      tags,
      categoryId,
    } = body;

    if (!title?.trim() || !descriptionMarkdown?.trim()) {
      return NextResponse.json(
        { error: "Title and markdown description are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    }

    if (!url?.trim()) {
      return NextResponse.json({ error: "Project URL is required." }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: "Category is required." }, { status: 400 });
    }

    const parsedActualPrice = Number(actualPrice);
    if (Number.isNaN(parsedActualPrice) || parsedActualPrice < 0) {
      return NextResponse.json({ error: "Actual price must be a valid number." }, { status: 400 });
    }

    const parsedDiscountPrice = discountPrice === "" || discountPrice == null ? parsedActualPrice : Number(discountPrice);
    if (Number.isNaN(parsedDiscountPrice) || parsedDiscountPrice < 0) {
      return NextResponse.json({ error: "Discount price must be a valid number." }, { status: 400 });
    }

    await connectDB();

    const category = await ProjectCategory.findById(categoryId);
    if (!category) {
      return NextResponse.json({ error: "Selected category was not found." }, { status: 404 });
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;
    while (await Project.exists({ slug })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const project = await Project.create({
      title: title.trim(),
      slug,
      descriptionMarkdown: descriptionMarkdown.trim(),
      images: images.filter(Boolean),
      actualPrice: parsedActualPrice,
      discountPrice: parsedDiscountPrice,
      url: url.trim(),
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
      category: category._id,
      categoryName: category.name,
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
