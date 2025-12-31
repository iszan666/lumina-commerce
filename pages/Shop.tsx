import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, CURRENCY_SYMBOL } from '../constants';
import { Star, ShoppingBag, Search } from 'lucide-react';

export const Shop = () => {
  const { products, addToCart, isLoading } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950"><div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" aria-label="Loading products"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Discover Products</h1>
          <p className="text-slate-400 mt-1 font-light">Curated tech and lifestyle gear.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
           {/* Search */}
           <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} aria-hidden="true" />
             <label htmlFor="search-products" className="sr-only">Search products</label>
             <input 
               id="search-products"
               type="text" 
               placeholder="Search products..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-200 placeholder-slate-500 w-full sm:w-64 transition-all"
             />
           </div>

           {/* Category Filter */}
           <div className="relative">
             <label htmlFor="category-select" className="sr-only">Filter by category</label>
             <select 
               id="category-select"
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="appearance-none pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-200 cursor-pointer w-full transition-all"
             >
               {CATEGORIES.map(cat => (
                 <option key={cat} value={cat} className="bg-slate-900 text-slate-200">{cat}</option>
               ))}
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
             </div>
           </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-32 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
          <ShoppingBag size={48} className="mx-auto text-slate-600 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-slate-300">No products found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-violet-900/10 hover:border-violet-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1">
              <Link to={`/product/${product.id}`} className="relative aspect-square bg-slate-800 overflow-hidden" aria-label={`View details for ${product.name}`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-700 px-2 py-1 rounded text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  {product.category}
                </div>
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                   <div className="flex items-center mb-2" role="img" aria-label={`Rated ${product.rating} out of 5 stars based on ${product.reviews} reviews`}>
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={14} aria-hidden="true" fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-700"} />
                     ))}
                     <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
                   </div>
                   <Link to={`/product/${product.id}`} className="block text-lg font-bold text-slate-100 hover:text-violet-400 transition-colors line-clamp-1 mb-1">
                     {product.name}
                   </Link>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow font-light">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                  <span className="text-xl font-bold text-white">{CURRENCY_SYMBOL}{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-2.5 bg-slate-800 text-slate-200 rounded-lg hover:bg-violet-600 hover:text-white transition-all duration-300 active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};