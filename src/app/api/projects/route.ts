import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectCategory from "@/models/ProjectCategory";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim().toLowerCase() || "";
  const category = url.searchParams.get("category")?.trim() || "";
  const minPrice = Number(url.searchParams.get("minPrice") || "0");
  const maxPrice = Number(url.searchParams.get("maxPrice") || "1000000");
  const tags = url.searchParams
    .get("tags")
    ?.split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean) || [];

  await connectDB();

  const rawProjects = await Project.find({})
    .populate("category", "name slug logoUrl")
    .sort({ createdAt: -1 })
    .lean();

  const projects = rawProjects.map((project) => {
    const tags = Array.isArray(project.tags) ? project.tags : [];
    const images = Array.isArray(project.images) ? project.images : [];

    return {
      id: project._id.toString(),
      title: project.title,
      slug: project.slug,
      descriptionMarkdown: project.descriptionMarkdown,
      description: project.descriptionMarkdown,
      images,
      image: images.length ? images[0] : "/images/placeholder.png",
      actualPrice: project.actualPrice,
      discountPrice: project.discountPrice,
      price:
        project.discountPrice > 0 && project.discountPrice < project.actualPrice
          ? project.discountPrice
          : project.actualPrice,
      url: project.url,
      tags,
      tech: Array.isArray((project as any).tech) ? (project as any).tech : [],
      rating: typeof (project as any).rating === "number" ? (project as any).rating : 4.8,
      sales: typeof (project as any).sales === "number" ? (project as any).sales : 0,
      category: (project.category as any)?.name || project.categoryName || "Uncategorized",
      categorySlug: (project.category as any)?.slug || "uncategorized",
      createdAt: project.createdAt,
    };
  });

  const filtered = projects.filter((project) => {
    const matchesSearch =
      !search ||
      project.title.toLowerCase().includes(search) ||
      project.category.toLowerCase().includes(search) ||
      project.descriptionMarkdown.toLowerCase().includes(search) ||
      project.tags.some((tag: string) => tag.toLowerCase().includes(search));

    const matchesCategory = !category || project.category === category;
    const matchesPrice = project.price >= minPrice && project.price <= maxPrice;
    const matchesTags =
      !tags.length || tags.every((tag) => project.tags.some((projectTag: string) => projectTag.toLowerCase() === tag));

    return matchesSearch && matchesCategory && matchesPrice && matchesTags;
  });

  return NextResponse.json({ projects: filtered });
}
