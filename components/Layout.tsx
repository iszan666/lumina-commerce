import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { APP_NAME, CURRENCY_SYMBOL } from '../constants';
import { UserRole } from '../types';

export const Layout = () => {
  const { user, cart, logout, cartTotal } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path 
    ? "text-violet-400 font-semibold drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" 
    : "text-slate-300 hover:text-white transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans">
      {/* Navbar */}
      <nav aria-label="Main Navigation" className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" aria-label={`${APP_NAME} Home`} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-violet-200 transition-colors">{APP_NAME}</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
              <Link to="/shop" className={isActive('/shop')} aria-current={location.pathname === '/shop' ? 'page' : undefined}>Shop</Link>
              {user?.role === UserRole.ADMIN && (
                <Link to="/admin" className={isActive('/admin')} aria-current={location.pathname === '/admin' ? 'page' : undefined}>Dashboard</Link>
              )}
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-6">
               {user ? (
                 <div className="flex items-center space-x-4">
                   <span className="text-sm text-slate-400">Hi, <span className="text-slate-200 font-medium">{user.name.split(' ')[0]}</span></span>
                   <button onClick={handleLogout} aria-label="Sign out" className="text-slate-400 hover:text-red-400 transition-colors">
                     <LogOut size={20} aria-hidden="true" />
                   </button>
                 </div>
               ) : (
                 <Link to="/login" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
               )}

               <Link to="/cart" aria-label={`Shopping cart, ${cartItemCount} items`} className="relative group">
                 <ShoppingCart size={24} aria-hidden="true" className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                 {cartItemCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-slate-950">
                     {cartItemCount}
                   </span>
                 )}
               </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Link to="/cart" aria-label={`Shopping cart, ${cartItemCount} items`} className="relative mr-4">
                 <ShoppingCart size={24} aria-hidden="true" className="text-slate-400" />
                 {cartItemCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                     {cartItemCount}
                   </span>
                 )}
               </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-slate-900 border-b border-slate-800 animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/' ? 'page' : undefined} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/shop' ? 'page' : undefined} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Shop</Link>
              {user?.role === UserRole.ADMIN && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} aria-current={location.pathname === '/admin' ? 'page' : undefined} className="block px-3 py-2 rounded-md text-base font-medium text-violet-400 bg-violet-900/10 border border-violet-900/20">Admin Dashboard</Link>
              )}
              <div className="border-t border-slate-800 pt-4 mt-2">
                {user ? (
                   <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-red-400 font-medium hover:bg-slate-800 rounded-md">Sign Out</button>
                ) : (
                   <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-violet-400 font-medium hover:bg-slate-800 rounded-md">Sign In</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-400">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 tracking-tight">{APP_NAME}</h3>
            <p className="text-sm leading-relaxed text-slate-400">Redefining the shopping experience with AI-driven insights and premium products.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-violet-400 transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-violet-400 transition-colors">Electronics</Link></li>
              <li><Link to="/shop" className="hover:text-violet-400 transition-colors">Wearables</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-semibold mb-4">Support</h4>
             <ul className="space-y-2 text-sm">
               <li className="hover:text-violet-400 cursor-pointer transition-colors">Contact Us</li>
               <li className="hover:text-violet-400 cursor-pointer transition-colors">Shipping Policy</li>
               <li className="hover:text-violet-400 cursor-pointer transition-colors">Returns</li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-semibold mb-4">Newsletter</h4>
             <form className="flex" onSubmit={(e) => e.preventDefault()}>
               <label htmlFor="newsletter-email" className="sr-only">Email address</label>
               <input id="newsletter-email" type="email" placeholder="Your email" className="bg-slate-900 border border-slate-800 text-slate-300 rounded-l-md px-4 py-2 w-full focus:ring-1 focus:ring-violet-500 focus:outline-none text-sm placeholder-slate-500" />
               <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded-r-md hover:bg-violet-500 transition-colors font-medium">Subscribe</button>
             </form>
          </div>
        </div>
      </footer>
    </div>
  );
};