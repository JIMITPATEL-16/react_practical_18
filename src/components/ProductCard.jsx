export default function ProductCard({ product, onSelect }) {
  const isCritical = product.stock <= 5;
  const stockRatio = Math.min((product.stock / 25) * 100, 100);

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div>
        {/* Header tags */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
            {product.category}
          </span>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
              isCritical
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
            {product.stock} in stock
          </span>
        </div>

        {/* Product Details */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Stock Meter */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
            <span>Capacity</span>
            <span>{product.stock} units</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isCritical ? 'bg-rose-500' : 'bg-cyan-400'
              }`}
              style={{ width: `${stockRatio}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer / Price & Edit trigger */}
      <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Unit Cost</span>
          <span className="text-lg font-black text-white font-mono">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>
        <button
          onClick={() => onSelect(product)}
          className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-slate-800 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-mono text-xs font-semibold border border-cyan-500/30 hover:border-transparent transition-all shadow-sm hover:shadow-cyan-500/20"
        >
          Configure →
        </button>
      </div>
    </div>
  );
}