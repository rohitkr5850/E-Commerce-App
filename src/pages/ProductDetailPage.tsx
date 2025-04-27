import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Heart, Share2, Star, Check, Truck, RefreshCw, 
  Shield, ChevronRight, AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { ProductGrid } from '../components/products/ProductGrid';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      if (!id) {
        navigate('/products');
        return;
      }
      
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.thumbnail);
        
        // Find related products in the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate('/not-found');
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Optionally show a success message or modal
    }
  };
  
  // Change quantity with validation
  const changeQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-neutral-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate discounted price
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
  
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex items-center text-sm">
          <Link to="/" className="text-neutral-500 hover:text-primary-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
          <Link to="/products" className="text-neutral-500 hover:text-primary-600">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
          <Link 
            to={`/products?category=${encodeURIComponent(product.category)}`} 
            className="text-neutral-500 hover:text-primary-600"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
          <span className="text-neutral-800 font-medium truncate">
            {product.title}
          </span>
        </nav>
      </div>
      
      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden bg-neutral-100">
              <img 
                src={selectedImage} 
                alt={product.title} 
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-md overflow-hidden border-2 ${
                    selectedImage === image 
                      ? 'border-primary-500' 
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - View ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <div className="text-sm text-neutral-600 mb-1">
                {product.category} / {product.brand}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-neutral-600">{product.rating} rating</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-neutral-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  
                  {product.discountPercentage && (
                    <>
                      <span className="text-lg text-neutral-500 line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm font-medium text-error-600">
                        Save {Math.round(product.discountPercentage)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center text-success-600">
                    <Check className="h-5 w-5 mr-1" />
                    <span>In Stock</span>
                    <span className="text-neutral-500 ml-2">
                      ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="text-error-600">Out of Stock</div>
                )}
              </div>
              
              {/* Vendor */}
              <div className="mb-6">
                <div className="text-sm text-neutral-500 mb-1">Sold by</div>
                <Link to={`/products?vendor=${encodeURIComponent(product.vendorName)}`} className="font-medium text-primary-600 hover:text-primary-800">
                  {product.vendorName}
                </Link>
              </div>
              
              {/* Quantity & Add to Cart */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-2">
                  Quantity
                </label>
                <div className="flex space-x-3">
                  <div className="flex border border-neutral-300 rounded-md">
                    <button
                      className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border-r border-neutral-300 rounded-l-md"
                      onClick={() => changeQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => changeQuantity(parseInt(e.target.value) || 1)}
                      className="w-16 text-center border-0 focus:ring-0"
                    />
                    <button
                      className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border-l border-neutral-300 rounded-r-md"
                      onClick={() => changeQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary flex-grow"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-4 mb-6">
                <button className="flex items-center text-neutral-700 hover:text-primary-600">
                  <Heart className="h-5 w-5 mr-1" />
                  <span>Save</span>
                </button>
                <button className="flex items-center text-neutral-700 hover:text-primary-600">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Shipping & Returns */}
              <div className="border-t border-neutral-200 pt-6 space-y-4">
                <div className="flex">
                  <Truck className="h-5 w-5 text-neutral-500 mr-3" />
                  <div>
                    <div className="font-medium text-neutral-800">Free Shipping</div>
                    <div className="text-sm text-neutral-600">For orders over $100</div>
                  </div>
                </div>
                <div className="flex">
                  <RefreshCw className="h-5 w-5 text-neutral-500 mr-3" />
                  <div>
                    <div className="font-medium text-neutral-800">Easy Returns</div>
                    <div className="text-sm text-neutral-600">30 days return policy</div>
                  </div>
                </div>
                <div className="flex">
                  <Shield className="h-5 w-5 text-neutral-500 mr-3" />
                  <div>
                    <div className="font-medium text-neutral-800">Secure Checkout</div>
                    <div className="text-sm text-neutral-600">SSL encrypted payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="bg-white rounded-lg shadow-soft mb-8">
        <div className="border-b border-neutral-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'description'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel malesuada 
                  tincidunt, velit velit aliquam magna, eget aliquam nisl nisl vitae nisl. Sed euismod, velit vel 
                  malesuada tincidunt, velit velit aliquam magna, eget aliquam nisl nisl vitae nisl.
                </p>
                <h4 className="text-base font-semibold mb-2">Features:</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Premium quality materials</li>
                  <li>Durable construction</li>
                  <li>Elegant design</li>
                  <li>Easy to use</li>
                </ul>
                <p>
                  Nulla facilisi. Duis vitae libero ac nisl feugiat placerat. Proin vel nunc sit amet est 
                  efficitur facilisis ac at est. Integer facilisis consequat sollicitudin.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <tbody className="divide-y divide-neutral-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50 w-1/3">Brand</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">{product.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Category</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Rating</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">{product.rating} out of 5</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Weight</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">0.5 kg</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Dimensions</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">10 × 10 × 10 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Material</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">Aluminum, Plastic</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900 bg-neutral-50">Warranty</td>
                      <td className="py-3 px-4 text-sm text-neutral-700">1 Year Limited Warranty</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <button className="btn btn-primary btn-sm">Write a Review</button>
              </div>
              
              <div className="grid gap-6">
                {/* Sample reviews */}
                {[
                  {
                    name: 'Alex Johnson',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    rating: 5,
                    date: '2 weeks ago',
                    title: 'Exceeded my expectations!',
                    comment: 'This product is amazing! The quality is outstanding and it works exactly as described. I would definitely recommend it to anyone looking for a reliable solution.',
                  },
                  {
                    name: 'Sarah Williams',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    rating: 4,
                    date: '1 month ago',
                    title: 'Great product with minor issues',
                    comment: 'Overall a very good purchase. The product works well and the delivery was fast. My only complaint is that the instructions could be clearer, but once I figured it out, everything was fine.',
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-neutral-500 text-sm">•</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-neutral-500 text-sm">•</span>
                          <span className="text-neutral-500 text-sm">{review.date}</span>
                        </div>
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-neutral-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Related Products</h2>
            <Link 
              to={`/products?category=${encodeURIComponent(product.category)}`} 
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              View All
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};