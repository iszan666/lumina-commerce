import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOL } from '../constants';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-slate-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-6 shadow-sm">
              <div className="w-24 h-24 flex-shrink-0 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <Link to={`/product/${item.id}`} className="font-semibold text-lg text-slate-100 hover:text-violet-400 transition-colors">{item.name}</Link>
                   <button 
                     onClick={() => removeFromCart(item.id)} 
                     aria-label={`Remove ${item.name} from cart`}
                     className="text-slate-400 hover:text-red-400 transition-colors p-1"
                   >
                     <Trash2 size={18} aria-hidden="true" />
                   </button>
                </div>
                <p className="text-sm text-slate-400 mb-4">{item.category}</p>
                
                <div className="flex justify-between items-end">
                   <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors rounded-l-lg"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-slate-200" aria-live="polite">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors rounded-r-lg"
                         aria-label="Increase quantity"
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                   </div>
                   <div className="font-bold text-white text-lg">
                      {CURRENCY_SYMBOL}{(item.price * item.quantity).toFixed(2)}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sticky top-24 shadow-xl shadow-black/20">
            <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200">{CURRENCY_SYMBOL}{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (Estimated)</span>
                <span className="text-slate-200">{CURRENCY_SYMBOL}{(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-4 flex justify-between font-bold text-xl text-white">
                <span>Total</span>
                <span className="text-violet-400">{CURRENCY_SYMBOL}{(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center group"
            >
              Checkout <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};