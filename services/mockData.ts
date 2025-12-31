import { Product, User, UserRole, Order } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Quantum X Headphones',
    price: 299.99,
    description: 'Experience pure sound with the Quantum X noise-canceling headphones. Featuring 40-hour battery life, adaptive ANC, and plush memory foam earcups for extended listening sessions.',
    category: 'Audio',
    image: 'https://picsum.photos/400/400?random=1',
    rating: 4.8,
    reviews: 124,
    stock: 45,
    features: ['Active Noise Cancellation', '40h Battery', 'Multipoint Connection']
  },
  {
    id: '2',
    name: 'Horizon Smartwatch 5',
    price: 349.50,
    description: 'The Horizon 5 tracks your health metrics with clinical precision. ECG, blood oxygen monitoring, and a rugged titanium case make it the perfect companion for adventure.',
    category: 'Wearables',
    image: 'https://picsum.photos/400/400?random=2',
    rating: 4.9,
    reviews: 89,
    stock: 20,
    features: ['Titanium Case', 'ECG Monitor', 'Water Resistant 50m']
  },
  {
    id: '3',
    name: 'Vision Pro Monitor',
    price: 599.00,
    description: 'A 4K HDR monitor designed for creatives. 99% AdobeRGB coverage and uniform brightness technology ensures your work looks exactly as intended.',
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=3',
    rating: 4.6,
    reviews: 42,
    stock: 12,
    features: ['4K UHD', 'USB-C Hub', 'HDR 600']
  },
  {
    id: '4',
    name: 'ErgoChair Ultimate',
    price: 450.00,
    description: 'Work in comfort with the ErgoChair. Fully adjustable lumbar support, breathable mesh back, and 4D armrests designed to improve posture.',
    category: 'Home',
    image: 'https://picsum.photos/400/400?random=4',
    rating: 4.5,
    reviews: 215,
    stock: 8,
    features: ['Mesh Back', 'Lumbar Support', '5yr Warranty']
  },
  {
    id: '5',
    name: 'Sonic Boom Speaker',
    price: 129.99,
    description: 'Portable, waterproof, and loud. The Sonic Boom delivers 360-degree sound and pairs with other speakers for party mode.',
    category: 'Audio',
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.3,
    reviews: 330,
    stock: 100,
    features: ['IP67 Waterproof', '20h Playtime', 'Stereo Pairing']
  },
  {
    id: '6',
    name: 'PixelLens Camera',
    price: 1200.00,
    description: 'Mirrorless perfection. 24MP full-frame sensor, 4K video at 60fps, and advanced autofocus in a compact body.',
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.9,
    reviews: 15,
    stock: 5,
    features: ['24MP Sensor', '4K 60fps', 'In-body Stabilization']
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Demo User',
    email: 'user@demo.com',
    role: UserRole.USER,
    avatar: 'https://picsum.photos/100/100?random=99'
  },
  {
    id: 'u2',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/100/100?random=98'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_12345',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    total: 299.99,
    status: 'delivered',
    date: '2023-10-15T10:00:00Z'
  },
  {
    id: 'ord_67890',
    userId: 'u1',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 2 }
    ],
    total: 699.00,
    status: 'processing',
    date: '2023-10-25T14:30:00Z'
  }
];