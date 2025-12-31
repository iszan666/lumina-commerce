import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOL } from '../constants';
import { Star, Truck, ShieldCheck, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { generateProductInsights, generateReviewSummary } from '../services/geminiService';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === id);
  
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [reviewSummary, setReviewSummary] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
       // Auto-generate review summary on load
       generateReviewSummary(product).then(setReviewSummary);
    }
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200">
      <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      <button onClick={() => navigate('/shop')} className="text-violet-500 hover:text-violet-400 hover:underline">Back to Shop</button>
    </div>;
  }

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    const answer = await generateProductInsights(product, aiQuery);
    setAiResponse(answer);
    setIsAiLoading(false);
    setAiQuery(''); // Optional: clear or keep
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        aria-label="Go back to previous page"
        className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" /> Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-8 flex items-center justify-center shadow-2xl shadow-black/40">
          <img src={product.image} alt={product.name} className="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center space-x-2 text-sm text-violet-400 font-semibold uppercase tracking-wide mb-3">
            <span>{product.category}</span>
            <span className="text-slate-700" aria-hidden="true">•</span>
            <span className={product.stock > 0 ? "text-emerald-400" : "text-red-400"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{product.name}</h1>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-white">{CURRENCY_SYMBOL}{product.price.toFixed(2)}</span>
            <div className="flex items-center" role="img" aria-label={`Rated ${product.rating} out of 5 stars based on ${product.reviews} reviews`}>
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={18} aria-hidden="true" fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-700"} />
               ))}
               <span className="text-slate-400 ml-2 text-sm">({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6 text-lg font-light">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.features.map((feat, idx) => (
              <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                {feat}
              </span>
            ))}
          </div>

          <div className="flex space-x-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/40 transform active:scale-95"
            >
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-8 border-t border-b border-slate-800 py-6">
            <div className="flex items-center"><Truck size={18} className="mr-3 text-slate-500" aria-hidden="true" /> Free Express Shipping</div>
            <div className="flex items-center"><ShieldCheck size={18} className="mr-3 text-slate-500" aria-hidden="true" /> 2 Year Warranty</div>
          </div>

          {/* AI Section */}
          <div className="relative overflow-hidden rounded-xl p-0.5 bg-gradient-to-br from-violet-600/50 to-indigo-600/50">
            <div className="bg-slate-950 rounded-[10px] p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none" aria-hidden="true">
                 <Sparkles size={100} className="text-violet-500" />
              </div>
              
              <h3 className="font-semibold text-violet-200 mb-3 flex items-center">
                <Sparkles size={18} className="mr-2 text-violet-400" aria-hidden="true" /> 
                Ask AI Assistant
              </h3>
              
              <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-slate-800 h-40 overflow-y-auto no-scrollbar" aria-live="polite">
                 {aiResponse ? (
                   <p className="text-slate-300 text-sm leading-relaxed animate-fade-in">{aiResponse}</p>
                 ) : (
                   <div className="h-full flex flex-col justify-center">
                     <p className="text-slate-400 text-sm italic">
                       {reviewSummary ? (
                         <span><strong className="text-violet-400">Review Summary:</strong> {reviewSummary}</span>
                       ) : (
                         "Ask me anything about this product! e.g., 'Is this good for running?'"
                       )}
                     </p>
                   </div>
                 )}
                 {isAiLoading && <div className="mt-2 text-xs text-violet-400 animate-pulse flex items-center"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-1"></span> Thinking...</div>}
              </div>

              <form onSubmit={handleAiAsk} className="flex gap-3">
                <label htmlFor="ai-query" className="sr-only">Ask a question</label>
                <input 
                  id="ai-query"
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm text-slate-200 placeholder-slate-500"
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !aiQuery}
                  aria-label="Send question to AI"
                  className="bg-slate-800 text-white p-2.5 rounded-lg hover:bg-violet-600 border border-slate-700 hover:border-violet-500 transition-colors disabled:opacity-50 disabled:hover:bg-slate-800"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};