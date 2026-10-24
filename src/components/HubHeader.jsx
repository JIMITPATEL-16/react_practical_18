export default function HubHeader({ totalProducts, lowStockCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-lg">⚡</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase font-mono">
                Aether<span className="text-cyan-400">Stock</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/50 rounded-md">
                v2.6 Live
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Real-Time Catalog & Telemetry</p>
          </div>
        </div>

        {/* Live operational badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">{totalProducts} active items</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
              lowStockCount > 0
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-sm shadow-amber-500/10'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <span>⚠️</span>
            <span>{lowStockCount} critical stock</span>
          </div>
        </div>
      </div>
    </header>
  );
}