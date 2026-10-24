export default function MetricsBar({ products }) {
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const avgPrice = products.length ? totalValue / products.reduce((acc, p) => acc + p.stock, 1) : 0;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  const cards = [
    {
      label: 'Inventory Valuation',
      val: `₹${totalValue.toLocaleString('en-IN')}`,
      sub: 'Cumulative retail equity',
      accent: 'from-cyan-500/20 to-blue-500/0 border-cyan-500/30 text-cyan-400',
    },
    {
      label: 'Weighted Unit Avg',
      val: `₹${Math.round(avgPrice).toLocaleString('en-IN')}`,
      sub: 'Per-unit calculated value',
      accent: 'from-indigo-500/20 to-purple-500/0 border-indigo-500/30 text-indigo-400',
    },
    {
      label: 'Active Clusters',
      val: categoriesCount,
      sub: 'Product categories loaded',
      accent: 'from-fuchsia-500/20 to-pink-500/0 border-fuchsia-500/30 text-fuchsia-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-b bg-slate-900/60 p-5 border backdrop-blur-md transition-all hover:translate-y-[-2px] ${c.accent}`}
        >
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{c.label}</p>
          <p className="text-3xl font-extrabold text-white mt-2 tracking-tight font-mono">{c.val}</p>
          <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}