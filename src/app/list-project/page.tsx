export default function ListProjectPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <h1 className="text-4xl font-bold mb-6 font-display tracking-tight text-white">List Your Project</h1>
        <p className="text-zinc-400 mb-8">Share your work with the world. Fill out the details below to list your project on our marketplace.</p>
        
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Project Name</label>
              <input type="text" className="w-full rounded-lg bg-black/50 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-primary" placeholder="e.g. Next.js Dashboard Template" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
              <textarea rows={4} className="w-full rounded-lg bg-black/50 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-primary" placeholder="Describe your project..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Price ($)</label>
              <input type="number" className="w-full rounded-lg bg-black/50 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-primary" placeholder="0.00" />
            </div>
            
            <button type="button" className="w-full rounded-lg bg-brand-primary py-3 font-semibold text-white hover:bg-brand-primary-dark transition-colors">
              Submit Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
