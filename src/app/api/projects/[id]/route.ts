import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    let projectObj = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      projectObj = await Project.findById(id)
        .populate("category", "name slug logoUrl")
        .lean();
    }

    if (!projectObj) {
      projectObj = await Project.findOne({ slug: id })
        .populate("category", "name slug logoUrl")
        .lean();
    }

    if (!projectObj) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const tags = Array.isArray(projectObj.tags) ? projectObj.tags : [];
    const images = Array.isArray(projectObj.images) ? projectObj.images : [];
    const mainImage = images.length ? images[0] : "/images/placeholder.png";

    const project = {
      id: projectObj._id.toString(),
      title: projectObj.title,
      slug: projectObj.slug,
      descriptionMarkdown: projectObj.descriptionMarkdown || "",
      description: projectObj.descriptionMarkdown || "",
      longDescription: projectObj.descriptionMarkdown || "",
      images,
      image: mainImage,
      thumbnails: images.length ? images : [mainImage],
      actualPrice: projectObj.actualPrice,
      discountPrice: projectObj.discountPrice,
      price:
        projectObj.discountPrice > 0 && projectObj.discountPrice < projectObj.actualPrice
          ? projectObj.discountPrice
          : projectObj.actualPrice,
      url: projectObj.url || `/projects/${projectObj._id.toString()}`,
      tags,
      tech: Array.isArray((projectObj as any).tech) ? (projectObj as any).tech : [],
      rating: typeof (projectObj as any).rating === "number" ? (projectObj as any).rating : 4.8,
      sales: typeof (projectObj as any).sales === "number" ? (projectObj as any).sales : 0,
      category: (projectObj.category as any)?.name || projectObj.categoryName || "Uncategorized",
      categorySlug: (projectObj.category as any)?.slug || "uncategorized",
      reviewsCount: typeof (projectObj as any).reviewsCount === "number" ? (projectObj as any).reviewsCount : 0,
      creator: (projectObj as any).creator || {
        name: "Verified Creator",
        avatar: "VC",
      },
      details: (projectObj as any).details || {
        lastUpdated: new Date(projectObj.updatedAt || projectObj.createdAt || Date.now()).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }),
        released: new Date(projectObj.createdAt || Date.now()).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }),
        highResolution: true,
        documentation: "Included",
        fileTypes: tags.map((t: string) => t.toUpperCase()).filter((t: string) => ["FIGMA", "HTML", "CSS", "JS", "REACT", "ZIP"].includes(t)),
      },
      updates: Array.isArray((projectObj as any).updates) ? (projectObj as any).updates : [],
      reviews: Array.isArray((projectObj as any).reviews) ? (projectObj as any).reviews : [],
      features: Array.isArray((projectObj as any).features) ? (projectObj as any).features : [
        "Fully responsive layout",
        "Clean coding structure",
        "Lifetime support and updates"
      ],
    };

    if (project.details.fileTypes.length === 0) {
      project.details.fileTypes = ["ZIP", "HTML"];
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
