import { useState } from 'react';

export default function EditProductDrawer({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    description: product.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const adjustStock = (delta) => {
    setFormData((prev) => ({
      ...prev,
      stock: Math.max(0, prev.stock + delta),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, ...formData });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Telemetry Editor</span>
              <h2 className="text-xl font-black text-white mt-1">Modify Product Specs</h2>
              <p className="text-xs text-slate-400 mt-1">Target ID: #{product.id.toString().padStart(4, '0')}</p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form id="edit-form" onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Product Title
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Current Units on Shelf
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => adjustStock(-1)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="flex-1 text-center bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => adjustStock(1)}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Product Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </form>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-mono uppercase rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-form"
            className="px-5 py-2.5 text-xs font-mono uppercase font-bold rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Commit Changes ↵
          </button>
        </div>
      </div>
    </div>
  );
}