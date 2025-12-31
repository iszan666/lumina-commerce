import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { MOCK_PRODUCTS } from './services/mockData';
import { CURRENCY_SYMBOL } from './constants';

// Pages
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';

// Home Component Inline for brevity
const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-950 overflow-hidden border-b border-slate-900">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Technology for a</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 xl:inline">better tomorrow</span>
                </h1>
                <p className="mt-3 text-base text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light">
                  Experience the next generation of e-commerce. AI-curated products, seamless checkout, and premium support.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-md shadow-lg shadow-violet-500/20">
                    <button onClick={() => navigate('/shop')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 md:py-4 md:text-lg md:px-10">
                      Get started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <button onClick={() => navigate('/shop')} className="w-full flex items-center justify-center px-8 py-3 border border-slate-700 text-base font-medium rounded-lg text-slate-300 bg-slate-900/50 hover:bg-slate-800 hover:text-white backdrop-blur-sm transition-all duration-300 md:py-4 md:text-lg md:px-10">
                      View Catalog
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Abstract shapes or Image overlay */}
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 opacity-60 mix-blend-lighten pointer-events-none">
          <img 
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" 
            alt="Futuristic Tech" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-950/20 to-slate-950"></div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="bg-slate-950 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-violet-400 tracking-wide uppercase">Collection</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Featured Products
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto font-light">
              Check out our latest arrivals and top-selling items handpicked for quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative bg-slate-900 rounded-2xl shadow-xl shadow-black/30 hover:shadow-violet-500/10 transition-all duration-500 overflow-hidden border border-slate-800 flex flex-col hover:-translate-y-1">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-slate-800 h-64 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-slate-200">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 relative">
                  <h3 className="text-lg font-bold text-white mb-2">
                    <button onClick={() => navigate(`/product/${product.id}`)}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-bold text-white">{CURRENCY_SYMBOL}{product.price.toFixed(2)}</p>
                    <p className="text-sm font-medium text-violet-400 group-hover:translate-x-1 transition-transform flex items-center">
                      View Details <span className="ml-1">&rarr;</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center px-8 py-3 border border-slate-700 text-base font-medium rounded-lg shadow-lg text-white bg-slate-900 hover:bg-slate-800 hover:border-violet-500/50 transition-all duration-300"
            >
              Explore All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
}