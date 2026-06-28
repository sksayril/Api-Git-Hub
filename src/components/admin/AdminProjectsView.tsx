"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Clock, Filter, FolderKanban, Loader2, Plus, Search, Tag, UploadCloud } from "lucide-react";

interface ProjectCategory {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
}

interface AdminProject {
  _id: string;
  title: string;
  slug: string;
  descriptionMarkdown: string;
  images: string[];
  actualPrice: number;
  discountPrice: number;
  url: string;
  tags: string[];
  categoryName: string;
  category?: { name: string; slug: string; logoUrl?: string } | null;
  createdAt: string;
  updatedAt: string;
}

interface ProjectFormState {
  title: string;
  descriptionMarkdown: string;
  images: string[];
  actualPrice: string;
  discountPrice: string;
  url: string;
  tags: string;
  categoryId: string;
}

const initialProjectForm: ProjectFormState = {
  title: "",
  descriptionMarkdown: "",
  images: [],
  actualPrice: "",
  discountPrice: "",
  url: "",
  tags: "",
  categoryId: "",
};

const initialCategoryForm = {
  name: "",
  logoUrl: "",
  description: "",
};

export default function AdminProjectsView() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showComposer, setShowComposer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectFormState>(initialProjectForm);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const [categoryFile, setCategoryFile] = useState<File | null>(null);
  const [creatingCategory, setCreatingCategory] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [projectsResponse, categoriesResponse] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/project-categories"),
      ]);

      const projectsData = await projectsResponse.json();
      const categoriesData = await categoriesResponse.json();

      if (!projectsResponse.ok) {
        throw new Error(projectsData.error || "Unable to load projects.");
      }

      if (!categoriesResponse.ok) {
        throw new Error(categoriesData.error || "Unable to load categories.");
      }

      setProjects(projectsData.projects || []);
      setCategories(categoriesData.categories || []);
      if (!projectForm.categoryId && (categoriesData.categories || []).length > 0) {
        setProjectForm((current) => ({ ...current, categoryId: categoriesData.categories[0]._id }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load admin project data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const queryMatch =
        !query ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.descriptionMarkdown.toLowerCase().includes(query.toLowerCase()) ||
        project.categoryName.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = categoryFilter === "all" || project.categoryName === categoryFilter;
      return queryMatch && categoryMatch;
    });
  }, [categoryFilter, projects, query]);

  const stats = useMemo(() => ({
    total: projects.length,
    categories: categories.length,
    discounted: projects.filter((project) => project.discountPrice < project.actualPrice).length,
  }), [categories.length, projects]);

  const resetProjectForm = () => {
    setProjectForm(initialProjectForm);
    setProjectFiles([]);
  };

  const handleProjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);

    try {
      let uploadedImages = projectForm.images;

      if (projectFiles.length > 0) {
        setUploadingFiles(true);
        const formData = new FormData();
        projectFiles.forEach((file) => formData.append("files", file));

        const uploadResponse = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || "Image upload failed.");
        }

        uploadedImages = uploadData.urls || [];
        setUploadingFiles(false);
      }

      const payload = {
        title: projectForm.title,
        descriptionMarkdown: projectForm.descriptionMarkdown,
        images: uploadedImages,
        actualPrice: Number(projectForm.actualPrice),
        discountPrice: projectForm.discountPrice ? Number(projectForm.discountPrice) : Number(projectForm.actualPrice),
        url: projectForm.url,
        tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        categoryId: projectForm.categoryId,
      };

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Project creation failed.");
      }

      setProjects((current) => [data.project, ...current]);
      setNotice(`Project "${data.project.title}" was created successfully.`);
      resetProjectForm();
      setShowComposer(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Project creation failed.");
    } finally {
      setUploadingFiles(false);
      setSubmitting(false);
    }
  };

  const handleCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setCreatingCategory(true);

    try {
      let logoUrl = categoryForm.logoUrl.trim();

      if (categoryFile) {
        const formData = new FormData();
        formData.append("files", categoryFile);
        const uploadResponse = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || "Category logo upload failed.");
        }

        logoUrl = uploadData.urls?.[0] || "";
      }

      const response = await fetch("/api/admin/project-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name,
          logoUrl,
          description: categoryForm.description,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Category creation failed.");
      }

      setCategories((current) => [data.category, ...current]);
      setProjectForm((current) => ({ ...current, categoryId: data.category._id }));
      setCategoryForm(initialCategoryForm);
      setCategoryFile(null);
      setNotice(`Category "${data.category.name}" is ready to use.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Category creation failed.");
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Add marketplace products with markdown descriptions, S3 images, pricing, tags, and categories.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowComposer((current) => !current)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          {showComposer ? "Close Composer" : "Add New Project"}
        </button>
      </div>

      {notice ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500">Products</p>
        </div>
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-4">
          <p className="text-2xl font-bold text-white">{stats.categories}</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500">Categories</p>
        </div>
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-4">
          <p className="text-2xl font-bold text-white">{stats.discounted}</p>
          <p className="text-xs uppercase tracking-wider text-zinc-500">Discounted</p>
        </div>
      </div>

      {showComposer ? (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleProjectSubmit} className="space-y-4 rounded-2xl border border-white/6 bg-[#111827] p-5">
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Create Product</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Product Title</span>
                <input
                  value={projectForm.title}
                  onChange={(event) => setProjectForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="Ex: AI Landing Page Kit"
                  required
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Category</span>
                <select
                  value={projectForm.categoryId}
                  onChange={(event) => setProjectForm((current) => ({ ...current, categoryId: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-sm text-zinc-400">
              <span className="mb-1.5 block">Description (Markdown)</span>
              <textarea
                value={projectForm.descriptionMarkdown}
                onChange={(event) => setProjectForm((current) => ({ ...current, descriptionMarkdown: event.target.value }))}
                className="min-h-36 w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                placeholder="Write a rich markdown product description..."
                required
              />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Actual Price</span>
                <input
                  type="number"
                  min="0"
                  value={projectForm.actualPrice}
                  onChange={(event) => setProjectForm((current) => ({ ...current, actualPrice: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="0"
                  required
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Discount Price</span>
                <input
                  type="number"
                  min="0"
                  value={projectForm.discountPrice}
                  onChange={(event) => setProjectForm((current) => ({ ...current, discountPrice: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="0"
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Product URL</span>
                <input
                  value={projectForm.url}
                  onChange={(event) => setProjectForm((current) => ({ ...current, url: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="https://example.com"
                  required
                />
              </label>
            </div>

            <label className="block text-sm text-zinc-400">
              <span className="mb-1.5 block">Tags</span>
              <input
                value={projectForm.tags}
                onChange={(event) => setProjectForm((current) => ({ ...current, tags: event.target.value }))}
                className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                placeholder="AI, Next.js, SaaS"
              />
            </label>

            <label className="block text-sm text-zinc-400">
              <span className="mb-1.5 block">Product Images</span>
              <div className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0b1120] px-3 py-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    setProjectFiles(files);
                  }}
                  className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-300 hover:file:bg-blue-600/30"
                />
              </div>
              {projectFiles.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {projectFiles.map((file) => (
                    <span key={file.name} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                      {file.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={submitting || uploadingFiles}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting || uploadingFiles ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {submitting ? "Creating project..." : uploadingFiles ? "Uploading images..." : "Create project"}
            </button>
          </form>

          <div className="space-y-4">
            <form onSubmit={handleCategorySubmit} className="space-y-4 rounded-2xl border border-white/6 bg-[#111827] p-5">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">Create Category</h2>
              </div>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Category Name</span>
                <input
                  value={categoryForm.name}
                  onChange={(event) => setCategoryForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="Ex: UI Kits"
                  required
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Category Logo URL</span>
                <input
                  value={categoryForm.logoUrl}
                  onChange={(event) => setCategoryForm((current) => ({ ...current, logoUrl: event.target.value }))}
                  className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="https://..."
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Category Logo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setCategoryFile(event.target.files?.[0] || null)}
                  className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-600/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-300 hover:file:bg-violet-600/30"
                />
              </label>

              <label className="block text-sm text-zinc-400">
                <span className="mb-1.5 block">Description</span>
                <textarea
                  value={categoryForm.description}
                  onChange={(event) => setCategoryForm((current) => ({ ...current, description: event.target.value }))}
                  className="min-h-24 w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500/40"
                  placeholder="Short category description"
                />
              </label>

              <button
                type="submit"
                disabled={creatingCategory}
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {creatingCategory ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {creatingCategory ? "Creating category..." : "Create category"}
              </button>
            </form>

            <div className="rounded-2xl border border-white/6 bg-[#111827] p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Existing Categories</h2>
                <span className="text-sm text-zinc-500">{categories.length}</span>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center justify-between rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      {category.logoUrl ? (
                        <img src={category.logoUrl} alt={category.name} className="h-9 w-9 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/20 text-violet-300">
                          <Tag className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{category.name}</p>
                        <p className="text-xs text-zinc-500">/{category.slug}</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{category.description ? "Ready" : "No description"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-white/8 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500/40 sm:min-w-[220px]"
              placeholder="Search products..."
            />
          </div>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="appearance-none rounded-xl border border-white/8 bg-[#111827] py-2.5 pl-10 pr-10 text-sm text-white outline-none transition focus:border-blue-500/40"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-2xl border border-white/6 bg-[#111827] p-8 text-center text-sm text-zinc-500">
            <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-blue-400" />
            Loading products...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-white/6 bg-[#111827] p-8 text-center text-sm text-zinc-500">
            No products found yet. Create your first one above.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="rounded-2xl border border-white/6 bg-[#111827] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                      {project.categoryName || "Uncategorized"}
                    </span>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      {project.discountPrice < project.actualPrice ? "On Sale" : "Regular"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {project.descriptionMarkdown.replace(/\s+/g, " ").slice(0, 160)}{project.descriptionMarkdown.length > 160 ? "..." : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="min-w-[280px] rounded-2xl border border-white/8 bg-[#0b1120] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">${project.actualPrice}</p>
                      {project.discountPrice < project.actualPrice ? (
                        <p className="text-sm text-emerald-400">${project.discountPrice} discounted</p>
                      ) : null}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-sm font-semibold text-blue-400"
                    >
                      Visit
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.images.slice(0, 2).map((image) => (
                      <img key={image} src={image} alt={project.title} className="h-24 w-full rounded-xl object-cover" />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
