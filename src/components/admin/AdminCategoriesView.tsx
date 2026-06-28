"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Tag, UploadCloud } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
}

export default function AdminCategoriesView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/project-categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load categories.");
      setCategories(data.categories || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);

    try {
      let finalLogo = logoUrl.trim();
      if (logoFile) {
        const formData = new FormData();
        formData.append("files", logoFile);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Logo upload failed.");
        finalLogo = uploadData.urls?.[0] || "";
      }

      const res = await fetch("/api/admin/project-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, logoUrl: finalLogo, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed.");
      setCategories((c) => [data.category, ...c]);
      setName("");
      setDescription("");
      setLogoUrl("");
      setLogoFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Tag className="h-5 w-5 text-violet-400" />
        <h1 className="text-2xl font-display font-bold text-white">Categories</h1>
      </div>

      {error ? <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-300">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <form onSubmit={handleCreate} className="space-y-4 rounded-2xl border border-white/6 bg-[#111827] p-5">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Create Category</h2>
          </div>

          <label className="block text-sm text-zinc-400">
            <span className="mb-1.5 block">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none" />
          </label>

          <label className="block text-sm text-zinc-400">
            <span className="mb-1.5 block">Logo URL</span>
            <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none" />
          </label>

          <label className="block text-sm text-zinc-400">
            <span className="mb-1.5 block">Logo File</span>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0] || null;
                setLogoError(null);
                if (!file) return setLogoFile(null);
                setLogoFile(file);
                // upload immediately to S3 via existing upload route
                try {
                  setUploadingLogo(true);
                  const fd = new FormData();
                  fd.append("files", file);
                  const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
                  const uploadData = await uploadRes.json();
                  if (!uploadRes.ok) throw new Error(uploadData.error || "Logo upload failed");
                  const url = uploadData.urls?.[0] || "";
                  setLogoUrl(url);
                } catch (err) {
                  setLogoError(err instanceof Error ? err.message : String(err));
                } finally {
                  setUploadingLogo(false);
                }
              }}
              className="block w-full text-sm text-zinc-500"
            />
            {uploadingLogo ? <div className="mt-2 text-xs text-zinc-500">Uploading logo...</div> : null}
            {logoError ? <div className="mt-2 text-xs text-red-400">{logoError}</div> : null}
            {logoUrl ? (
              <div className="mt-2">
                <img src={logoUrl} alt="logo preview" className="h-12 w-12 rounded-lg object-cover" />
              </div>
            ) : null}
          </label>

          <label className="block text-sm text-zinc-400">
            <span className="mb-1.5 block">Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-24 w-full rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5 text-sm text-white outline-none" />
          </label>

          <button type="submit" disabled={creating || uploadingLogo} className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />} {creating ? "Creating..." : "Create category"}
          </button>
        </form>

        <div className="md:col-span-2 space-y-3">
          <div className="rounded-2xl border border-white/6 bg-[#111827] p-4">
            <h2 className="text-lg font-semibold text-white">Existing Categories</h2>
            <div className="mt-3 grid gap-2">
              {loading ? (
                <div className="text-sm text-zinc-500">Loading...</div>
              ) : categories.length === 0 ? (
                <div className="text-sm text-zinc-500">No categories yet.</div>
              ) : (
                categories.map((cat) => (
                  <div key={cat._id} className="flex items-center justify-between rounded-xl border border-white/8 bg-[#0b1120] px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      {cat.logoUrl ? <img src={cat.logoUrl} alt={cat.name} className="h-9 w-9 rounded-lg object-cover" /> : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/20 text-violet-300"><Tag className="h-4 w-4" /></div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{cat.name}</p>
                        <p className="text-xs text-zinc-500">/{cat.slug}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500">{cat.description ? "Has description" : "No description"}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
