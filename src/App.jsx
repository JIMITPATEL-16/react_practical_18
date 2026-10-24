import { useState, useMemo } from 'react';
import HubHeader from './components/HubHeader';
import MetricsBar from './components/MetricsBar';
import ProductCard from './components/ProductCard';
import EditProductDrawer from './components/EditProductDrawer';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Cyberpunk Keychron V1 Neo',
    category: 'Keyboards',
    price: 6499,
    stock: 12,
    description: 'Custom hot-swappable tactile RGB board with gasket mount design and smoke acrylic chassis.',
  },
  {
    id: 2,
    name: 'Starlight Pulse Optical Mouse',
    category: 'Peripherals',
    price: 3299,
    stock: 3,
    description: 'Ultra-lightweight 49g wireless mouse with PixArt 3395 sensor and 4000Hz polling rate.',
  },
  {
    id: 3,
    name: 'OLED Horizon 27" 240Hz',
    category: 'Displays',
    price: 38999,
    stock: 2,
    description: '0.03ms GTG response time, HDR TrueBlack 400, and 99% DCI-P3 cinematic color spectrum.',
  },
  {
    id: 4,
    name: 'Neural Thunderbolt Docking Hub',
    category: 'Peripherals',
    price: 8499,
    stock: 16,
    description: 'Quad-display PCIe bandwidth bridge featuring dual 100W PD outputs and 2.5G Ethernet.',
  },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
    setSelectedProduct(null);

    // Flash toast
    setToastMessage(`Updated ${updatedProduct.name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 pb-16">
      <HubHeader totalProducts={products.length} lowStockCount={lowStockCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <MetricsBar products={products} />

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 text-sm">No products found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Slide-over Drawer */}
      {selectedProduct && (
        <EditProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleUpdateProduct}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 shadow-2xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}