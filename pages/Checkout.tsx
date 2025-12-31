import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOL } from '../constants';
import { CreditCard, CheckCircle, Lock } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, createOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '', cardName: '', cardNumber: '', exp: '', cvc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate backend call
    await createOrder(formData);
    setIsProcessing(false);
    setStep('success');
  };

  if (cart.length === 0 && step !== 'success') {
     navigate('/shop');
     return null;
  }

  const total = (cartTotal * 1.08).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="flex justify-center mb-12" role="list" aria-label="Checkout progress">
        <div className="flex items-center space-x-4">
           <div role="listitem" aria-current={step === 'shipping' ? 'step' : undefined} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'shipping' ? 'bg-violet-600 text-white ring-4 ring-violet-900/30' : 'bg-emerald-500 text-black'}`}>1</div>
           <div className="h-1 w-12 bg-slate-800" aria-hidden="true">
             <div className={`h-full transition-all duration-500 ${step !== 'shipping' ? 'bg-emerald-500' : ''}`}></div>
           </div>
           <div role="listitem" aria-current={step === 'payment' ? 'step' : undefined} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'payment' ? 'bg-violet-600 text-white ring-4 ring-violet-900/30' : step === 'success' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-500'}`}>2</div>
           <div className="h-1 w-12 bg-slate-800" aria-hidden="true">
             <div className={`h-full transition-all duration-500 ${step === 'success' ? 'bg-emerald-500' : ''}`}></div>
           </div>
           <div role="listitem" aria-current={step === 'success' ? 'step' : undefined} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'success' ? 'bg-emerald-500 text-black ring-4 ring-emerald-900/30' : 'bg-slate-800 text-slate-500'}`}>3</div>
        </div>
      </div>

      {step === 'shipping' && (
        <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl shadow-black/30 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6 text-white">Shipping Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
              <input id="name" required name="name" onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-400 mb-1.5">Address</label>
              <input id="address" required name="address" onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-400 mb-1.5">City</label>
                <input id="city" required name="city" onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-slate-400 mb-1.5">ZIP Code</label>
                <input id="zip" required name="zip" onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full mt-8 bg-white text-black py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">Continue to Payment</button>
        </form>
      )}

      {step === 'payment' && (
        <form onSubmit={handlePayment} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl shadow-black/30 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-6 flex justify-between items-center text-white">
            Payment Method
            <span className="text-sm font-normal text-emerald-400 flex items-center bg-emerald-900/20 px-2 py-1 rounded border border-emerald-900/30"><Lock size={14} className="mr-1" aria-hidden="true"/> Secure SSL</span>
          </h2>
          
          <div className="bg-slate-950 p-5 rounded-lg mb-6 flex justify-between items-center border border-slate-800">
             <span className="font-medium text-slate-400">Total Amount</span>
             <span className="font-bold text-xl text-violet-400">{CURRENCY_SYMBOL}{total}</span>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-400 mb-1.5">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} aria-hidden="true" />
                <input id="cardNumber" required name="cardNumber" maxLength={19} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-mono text-white placeholder-slate-500 transition-all" placeholder="0000 0000 0000 0000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="exp" className="block text-sm font-medium text-slate-400 mb-1.5">Expiry Date</label>
                <input id="exp" required name="exp" maxLength={5} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-mono text-white placeholder-slate-500 transition-all" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-slate-400 mb-1.5">CVC</label>
                <input id="cvc" required name="cvc" maxLength={3} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none font-mono text-white placeholder-slate-500 transition-all" placeholder="123" />
              </div>
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-slate-400 mb-1.5">Cardholder Name</label>
              <input id="cardName" required name="cardName" onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-white placeholder-slate-500 transition-all" placeholder="Name on Card" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full mt-8 bg-violet-600 text-white py-3 rounded-lg font-bold hover:bg-violet-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-lg shadow-violet-900/40"
          >
            {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : `Pay ${CURRENCY_SYMBOL}${total}`}
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="text-center bg-slate-900 p-12 rounded-2xl border border-slate-800 shadow-xl shadow-black/30 animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/50">
            <CheckCircle size={48} className="text-emerald-500" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Thank you for your purchase. We have sent a confirmation email to <span className="text-slate-200">{formData.name.toLowerCase().replace(' ', '.')}@example.com</span>.</p>
          <button onClick={() => navigate('/shop')} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};