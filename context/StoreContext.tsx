import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Product, CartItem, UserRole, Order } from '../types';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_ORDERS } from '../services/mockData';
import { MOCK_DELAY } from '../constants';

interface StoreContextType {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (shippingDetails: any) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize
  useEffect(() => {
    const init = async () => {
      // Simulate API fetch
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      setProducts(MOCK_PRODUCTS);
      
      // Check local storage for persistent session
      const storedUser = localStorage.getItem('lumina_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        // If user is admin, load all orders, else just theirs (mock logic)
        const u = JSON.parse(storedUser);
        if(u.role === UserRole.ADMIN) {
            setOrders(MOCK_ORDERS);
        }
      }
      
      const storedCart = localStorage.getItem('lumina_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      setIsLoading(false);
    };
    init();
  }, []);

  // Cart Persistence
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('lumina_user', JSON.stringify(foundUser));
      if(foundUser.role === UserRole.ADMIN) setOrders(MOCK_ORDERS);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
    setOrders([]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const createOrder = async (shippingDetails: any): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Payment processing simulation
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]); // In a real app, this goes to DB
    clearCart();
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      user, products, cart, orders, isLoading,
      login, logout, addToCart, removeFromCart, updateQuantity, clearCart, createOrder, updateOrderStatus, cartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};