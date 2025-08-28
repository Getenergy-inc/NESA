"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeftCircle, FiShoppingCart, FiHeart, FiX, FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import { ShoppingCart, Heart, Star, Filter, Search, Truck, Shield, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from '@/lib/context/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  agcPrice: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

const BuyMerchandise: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'agc' | 'card' | 'bank'>('agc');
  const [agcBalance] = useState(1250);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: ''
  });

  const categories = [
    'All Products',
    'T-Shirts',
    'Hoodies',
    'Caps & Hats',
    'Mugs',
    'Bags',
    'Accessories',
    'Digital Items'
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'NESA Award Branded T-Shirt',
      price: 30,
      agcPrice: 150,
      category: 'T-Shirts',
      image: '/images/homeshirts/shirt1.jpg',
      images: ['/images/homeshirts/shirt1.jpg', '/images/homeshirts/shirt2.jpg'],
      description: 'Premium quality cotton t-shirt featuring the official NESA 2025 logo. Comfortable fit and durable print.',
      features: ['100% Cotton', 'Machine Washable', 'Available in Multiple Sizes', 'Official NESA Design'],
      inStock: true,
      stockCount: 45,
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'NESA Excellence Hoodie',
      price: 55,
      agcPrice: 275,
      category: 'Hoodies',
      image: '/images/homeshirts/shirt2.jpg',
      images: ['/images/homeshirts/shirt2.jpg'],
      description: 'Warm and comfortable hoodie perfect for showing your support for African education excellence.',
      features: ['Cotton-Polyester Blend', 'Kangaroo Pocket', 'Adjustable Hood', 'Embroidered Logo'],
      inStock: true,
      stockCount: 28,
      rating: 4.9,
      reviews: 89,
      isFeatured: true
    },
    {
      id: '3',
      name: 'NESA Champion Cap',
      price: 25,
      agcPrice: 125,
      category: 'Caps & Hats',
      image: '/images/homeshirts/shirt3.jpg',
      images: ['/images/homeshirts/shirt3.jpg'],
      description: 'Stylish cap with embroidered NESA logo. Perfect for casual wear and showing your support.',
      features: ['Adjustable Strap', 'Embroidered Design', 'UV Protection', 'One Size Fits All'],
      inStock: true,
      stockCount: 67,
      rating: 4.6,
      reviews: 156,
      isNew: true
    },
    {
      id: '4',
      name: 'NESA Coffee Mug',
      price: 15,
      agcPrice: 75,
      category: 'Mugs',
      image: '/images/homeshirts/shirt4.jpg',
      images: ['/images/homeshirts/shirt4.jpg'],
      description: 'Start your day with inspiration! High-quality ceramic mug with motivational education quotes.',
      features: ['Ceramic Material', 'Dishwasher Safe', '11oz Capacity', 'Heat Resistant'],
      inStock: true,
      stockCount: 89,
      rating: 4.7,
      reviews: 203
    },
    {
      id: '5',
      name: 'NESA Tote Bag',
      price: 20,
      agcPrice: 100,
      category: 'Bags',
      image: '/images/homeshirts/shirt1.jpg',
      images: ['/images/homeshirts/shirt1.jpg'],
      description: 'Eco-friendly canvas tote bag perfect for books, groceries, or daily essentials.',
      features: ['Canvas Material', 'Eco-Friendly', 'Large Capacity', 'Reinforced Handles'],
      inStock: true,
      stockCount: 34,
      rating: 4.5,
      reviews: 78
    },
    {
      id: '6',
      name: 'NESA Digital Certificate NFT',
      price: 50,
      agcPrice: 250,
      category: 'Digital Items',
      image: '/images/certificate1.png',
      images: ['/images/certificate1.png'],
      description: 'Exclusive digital certificate NFT commemorating NESA 2025. Blockchain verified authenticity.',
      features: ['Blockchain Verified', 'Unique Design', 'Digital Ownership', 'Collectible Item'],
      inStock: true,
      stockCount: 100,
      rating: 4.9,
      reviews: 45,
      isNew: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = paymentMethod === 'agc' ? item.agcPrice : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowCheckout(false);
      setOrderSuccess(true);
      setCart([]);
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-4">
            <FiArrowLeftCircle className="text-2xl mr-2" />
            <span>Back</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">NESA Merchandise Store</h1>
              <p className="text-gray-600">Support African education while getting amazing products</p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="mt-4 md:mt-0 relative bg-primaryGold hover:bg-deepGold text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({getCartItemsCount()})
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Search Products</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.toLowerCase() || (selectedCategory === 'all' && category === 'All Products')
                        ? 'bg-primaryGold text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Payment Options</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image src="/svgs/africoin.svg" alt="AGC" width={24} height={24} />
                  <span className="text-sm text-gray-600">AfriGold Coin (AGC)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Credit/Debit Cards</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-primaryGold to-deepGold rounded-xl p-8 text-white mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Support Education in Africa</h2>
                  <p className="text-white/90">Every purchase helps fund scholarships and educational programs</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Truck className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/homeshirts/shirt1.jpg';
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="bg-primaryGold text-white text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </button>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-primaryGold hover:bg-deepGold text-white p-2 rounded-full shadow-lg transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-gray-800">${product.price}</span>
                          <span className="text-sm text-gray-500">or</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Image src="/svgs/africoin.svg" alt="AGC" width={16} height={16} />
                          <span className="font-medium text-primaryGold">{product.agcPrice} AGC</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">In Stock</p>
                        <p className="text-sm font-medium text-green-600">{product.stockCount} left</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full bg-primaryGold hover:bg-deepGold text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-primaryGold hover:text-deepGold font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, x: 300 }}
              animate={{ scale: 1, x: 0 }}
              exit={{ scale: 0.95, x: 300 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-96">
                {cart.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/homeshirts/shirt1.jpg';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">${item.price}</span>
                            <span className="text-xs text-gray-400">or</span>
                            <div className="flex items-center gap-1">
                              <Image src="/svgs/africoin.svg" alt="AGC" width={12} height={12} />
                              <span className="text-sm text-primaryGold">{item.agcPrice} AGC</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">${getTotalPrice()}</div>
                      <div className="flex items-center gap-1 text-primaryGold">
                        <Image src="/svgs/africoin.svg" alt="AGC" width={16} height={16} />
                        <span className="font-medium">{cart.reduce((total, item) => total + (item.agcPrice * item.quantity), 0)} AGC</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={shippingInfo.fullName}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                          rows={3}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'agc' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setPaymentMethod('agc')}
                        >
                          <Image src="/svgs/africoin.svg" alt="AGC" width={24} height={24} className="mr-3" />
                          <div className="flex-1">
                            <span className="font-medium">AfriGold Coin (AGC)</span>
                            <p className="text-sm text-gray-500">Balance: {agcBalance.toLocaleString()} AGC</p>
                          </div>
                          {paymentMethod === 'agc' && <FiCheck className="text-primaryGold" />}
                        </div>
                        
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                          <span className="font-medium">Credit/Debit Card</span>
                          {paymentMethod === 'card' && <FiCheck className="text-primaryGold ml-auto" />}
                        </div>
                        
                        <div
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'bank' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setPaymentMethod('bank')}
                        >
                          <Shield className="w-6 h-6 text-gray-400 mr-3" />
                          <span className="font-medium">Bank Transfer</span>
                          {paymentMethod === 'bank' && <FiCheck className="text-primaryGold ml-auto" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {paymentMethod === 'agc' ? (
                                  <span className="flex items-center gap-1">
                                    <Image src="/svgs/africoin.svg" alt="AGC" width={16} height={16} />
                                    {(item.agcPrice * item.quantity).toLocaleString()}
                                  </span>
                                ) : (
                                  `$${(item.price * item.quantity).toFixed(2)}`
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-xl font-bold text-primaryGold">
                            {paymentMethod === 'agc' ? (
                              <span className="flex items-center gap-1">
                                <Image src="/svgs/africoin.svg" alt="AGC" width={20} height={20} />
                                {cart.reduce((total, item) => total + (item.agcPrice * item.quantity), 0).toLocaleString()}
                              </span>
                            ) : (
                              `$${getTotalPrice().toFixed(2)}`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full mt-6 bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing Order...
                        </div>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase! Your order has been confirmed and will be processed shortly.
                </p>
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyMerchandise;