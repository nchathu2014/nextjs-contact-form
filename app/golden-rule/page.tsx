export default function CachingCheatSheet() {
  return (
    <div className="bg-zinc-950 text-white font-mono max-w-4xl mx-auto p-10 rounded-2xl">

      {/* Header */}
      <div className="border-b border-zinc-800 pb-8 mb-10">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2">Reference Sheet</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js 16 Caching
        </h1>
        <h2 className="text-4xl font-bold tracking-tight text-violet-400">
          Golden Rules
        </h2>
        <p className="text-sm text-zinc-500 mt-4">
          // cache invalidation · "use cache" · updateTag · revalidateTag
        </p>
      </div>

      {/* Two Cache Layers */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4">
          ⬡ &nbsp;Cache invalidation requires busting TWO layers
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-violet-950 border border-violet-700 rounded-xl p-5">
            <p className="text-xs text-violet-400 uppercase tracking-widest mb-2">Page Cache</p>
            <p className="text-base font-bold text-violet-300">revalidatePath("/path")</p>
            <p className="text-sm text-zinc-400 mt-2">Busts the rendered HTML of the page</p>
          </div>
          <div className="bg-cyan-950 border border-cyan-700 rounded-xl p-5">
            <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2">Data Cache</p>
            <p className="text-base font-bold text-cyan-300">updateTag("key")</p>
            <p className="text-sm text-zinc-400 mt-2">Busts the raw DB / fetch result</p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 my-8" />

      {/* Read Functions */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs bg-emerald-500 text-black px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            Read
          </span>
          <span className="text-base font-bold text-zinc-200">Server Actions — Data Fetching</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5">
            <p className="text-xs text-red-400 uppercase tracking-widest mb-4">❌ Next.js 15 — Old</p>
            <pre className="text-sm leading-relaxed text-zinc-500 whitespace-pre-wrap">{`const getCached = unstable_cache(
  async () => { ... },
  ["key"],
  { tags: ["key"] }
);

export async function getData() {
  return getCached();
}`}</pre>
          </div>

          <div className="bg-zinc-900 border border-emerald-700 rounded-xl p-5">
            <p className="text-xs text-emerald-400 uppercase tracking-widest mb-4">✅ Next.js 16 — New</p>
            <pre className="text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap">{`export async function getData() {
  "use cache";
  cacheTag("key");

  // fetch your data here
  return await db.find({});
}`}</pre>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 my-8" />

      {/* Mutation Functions */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs bg-amber-400 text-black px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            Mutation
          </span>
          <span className="text-base font-bold text-zinc-200">Server Actions — Create / Update / Delete</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-zinc-900 border border-emerald-700 rounded-xl p-5">
            <p className="text-xs text-emerald-400 uppercase tracking-widest mb-2">User Triggered</p>
            <p className="text-base font-bold text-emerald-300 mb-2">updateTag("key")</p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Expires cache <span className="text-white font-semibold">immediately</span>. User sees fresh data right away.
            </p>
            <p className="text-xs text-zinc-600 border-t border-zinc-800 mt-4 pt-3">
              form submit · button click · user action
            </p>
          </div>

          <div className="bg-zinc-900 border border-amber-700 rounded-xl p-5">
            <p className="text-xs text-amber-400 uppercase tracking-widest mb-2">Background / Webhook</p>
            <p className="text-base font-bold text-amber-300 mb-2">revalidateTag("key", "max")</p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <span className="text-white font-semibold">Stale-while-revalidate</span>. Serves old data once, refreshes in background.
            </p>
            <p className="text-xs text-zinc-600 border-t border-zinc-800 mt-4 pt-3">
              webhook · cron job · route handler
            </p>
          </div>
        </div>

        {/* Code block */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
          <div className="border-b border-zinc-800 px-5 py-3 flex items-center justify-between bg-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-zinc-400">actions.ts — mutation pattern</span>
          </div>
          <pre className="text-sm leading-loose p-6 whitespace-pre-wrap overflow-x-auto text-zinc-200">{`export async function createContact(formData: FormData) {
  try {
    await dbConnect();
    await Contact.create({ ... });

    updateTag("all-contacts-key");   // ✅ bust data cache
    updateTag("contact-stats-key");  // ✅ bust stats data cache
    revalidatePath("/contacts");     // ✅ bust page cache

  } catch (error) {
    return { status: "error", data: { message: String(error) } };
  }

  redirect("/contacts"); // ✅ OUTSIDE try-catch — redirect throws internally
}`}</pre>
        </div>
      </div>

      <div className="border-t border-zinc-800 my-8" />

      {/* Important Notes */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            ⚠ Notes
          </span>
          <span className="text-base font-bold text-zinc-200">Important Rules</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "redirect()", value: "must be OUTSIDE try-catch — it throws internally", color: "text-red-400" },
            { key: "updateTag()", value: "works in Server Actions ONLY — not Route Handlers", color: "text-emerald-400" },
            { key: "revalidateTag()", value: "works in Server Actions AND Route Handlers", color: "text-cyan-400" },
            { key: '"use cache"', value: "requires cacheComponents: true in next.config.ts", color: "text-violet-400" },
            { key: "Never", value: "call revalidatePath / updateTag inside READ functions", color: "text-red-400" },
            { key: "Always", value: "bust ALL affected tags when multiple caches are impacted", color: "text-amber-400" },
          ].map(({ key, value, color }) => (
            <div key={key} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-3">
              <span className={`font-bold text-sm shrink-0 w-32 ${color}`}>{key}</span>
              <span className="text-sm text-zinc-400 leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 mt-10 pt-5 text-center">
        <p className="text-xs text-zinc-600 tracking-wide">
          Next.js 16 · Cache Components · "use cache" · cacheTag · updateTag · revalidateTag · revalidatePath
        </p>
      </div>

    </div>
  );
}