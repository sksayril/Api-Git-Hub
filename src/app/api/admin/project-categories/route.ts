import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
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
  const categories = await ProjectCategory.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { name, logoUrl, description } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    await connectDB();

    const categoryName = name.trim();
    const slug = slugify(categoryName);
    const existing = await ProjectCategory.findOne({
      $or: [{ name: categoryName }, { slug }],
    });

    if (existing) {
      return NextResponse.json({ error: "Category already exists." }, { status: 409 });
    }

    const category = await ProjectCategory.create({
      name: categoryName,
      slug,
      logoUrl: logoUrl?.trim() || "",
      description: description?.trim() || "",
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Project category create error:", error);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}
