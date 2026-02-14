import React, { useState } from 'react';
import './Stock.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';




const Stock = () => {
const navigate = useNavigate();

    
  // Sample spices data - you can replace this with API data
  const [spices] = useState([
    {
      id: 1,
      name: "Premium Cardamom",
      price: 12.99,
      originalPrice: 15.99,
      category: "Aromatics",
      rating: 4.8,
      reviews: 156,
      image: "images/cardamom.jpg",
      inStock: true,
      discount: 20,
      description: "Green cardamom pods from Kerala"
    },
    {
      id: 2,
      name: "Kashmir Saffron",
      price: 89.99,
      originalPrice: 99.99,
      category: "Premium",
      rating: 4.9,
      reviews: 89,
      image: "images/saffron.jpg",
      inStock: true,
      discount: 10,
      description: "Authentic Kashmiri saffron threads"
    },
    {
      id: 3,
      name: "Organic Turmeric",
      price: 8.49,
      originalPrice: 10.99,
      category: "Basics",
      rating: 4.7,
      reviews: 234,
      image: "images/turmeric.jpg",
      inStock: true,
      discount: 23,
      description: "Organic turmeric powder from India"
    },
    {
      id: 4,
      name: "Ceylon Cinnamon",
      price: 15.99,
      originalPrice: 19.99,
      category: "Sweet Spices",
      rating: 4.8,
      reviews: 167,
      image: "images/cinnamon.jpg",
      inStock: true,
      discount: 20,
      description: "True Ceylon cinnamon sticks"
    },
    {
      id: 5,
      name: "Black Peppercorns",
      price: 11.49,
      originalPrice: 13.99,
      category: "Hot Spices",
      rating: 4.6,
      reviews: 198,
      image: "images/black-pepper.jpg",
      inStock: true,
      discount: 18,
      description: "Whole black peppercorns from Malabar"
    },
    {
      id: 6,
      name: "Star Anise",
      price: 9.99,
      originalPrice: 12.99,
      category: "Aromatics",
      rating: 4.5,
      reviews: 87,
      image: "images/star-anise.jpg",
      inStock: false,
      discount: 23,
      description: "Whole star anise pods"
    },
    {
      id: 7,
      name: "Garam Masala Blend",
      price: 14.99,
      originalPrice: 17.99,
      category: "Blends",
      rating: 4.7,
      reviews: 143,
      image: "images/garam-masala.jpg",
      inStock: true,
      discount: 17,
      description: "Traditional garam masala blend"
    },
    {
      id: 8,
      name: "Cumin Seeds",
      price: 6.99,
      originalPrice: 8.99,
      category: "Basics",
      rating: 4.4,
      reviews: 76,
      image: "images/cumin.png",
      inStock: true,
      discount: 22,
      description: "Whole cumin seeds"
    },
    {
      id: 9,
      name: "Cloves",
      price: 13.49,
      originalPrice: 16.99,
      category: "Aromatics",
      rating: 4.6,
      reviews: 112,
      image: "images/cloves.jpg",
      inStock: true,
      discount: 21,
      description: "Whole clove buds"
    },
    {
      id: 10,
      name: "Paprika",
      price: 7.99,
      originalPrice: 9.99,
      category: "Hot Spices",
      rating: 4.3,
      reviews: 154,
      image: "images/paprika.jpg",
      inStock: true,
      discount: 20,
      description: "Sweet Hungarian paprika"
    },
    {
      id: 11,
      name: "Nutmeg",
      price: 18.99,
      originalPrice: 22.99,
      category: "Sweet Spices",
      rating: 4.8,
      reviews: 67,
      image: "images/nutmeg.jpg",
      inStock: true,
      discount: 17,
      description: "Whole nutmeg nuts"
    },
    {
      id: 12,
      name: "Dried Bay Leaves",
      price: 5.99,
      originalPrice: 7.99,
      category: "Herbs",
      rating: 4.2,
      reviews: 89,
      image: "images/bay-leaves.jpg",
      inStock: false,
      discount: 25,
      description: "Dried Mediterranean bay leaves"
    }
  ]);

  const [filteredSpices, setFilteredSpices] = useState(spices);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = ['All', ...new Set(spices.map(spice => spice.category))];

  // Filter and search functionality
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterSpices(category, searchTerm, sortBy);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterSpices(selectedCategory, term, sortBy);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    filterSpices(selectedCategory, searchTerm, sortOption);
  };

  const filterSpices = (category, search, sort) => {
    let filtered = spices;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(spice => spice.category === category);
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(spice => 
        spice.name.toLowerCase().includes(search.toLowerCase()) ||
        spice.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    filtered = filtered.sort((a, b) => {
      switch(sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredSpices(filtered);
  };

  // Add to cart function
 const addToCart = (spice) => {
  const existingCart = JSON.parse(localStorage.getItem('spiceCart')) || [];

  const existingItemIndex = existingCart.findIndex(item => item.id === spice.id);

  if (existingItemIndex >= 0) {
    existingCart[existingItemIndex].quantity += 1;
  } else {
    existingCart.push({
      ...spice,
      quantity: 1,
      addedAt: new Date().toISOString()
    });
  }

  localStorage.setItem('spiceCart', JSON.stringify(existingCart));

  // Redirect to cart page after adding
  navigate('/cart');

    
    // Save updated cart to localStorage
    localStorage.setItem('spiceCart', JSON.stringify(existingCart));
    
    // Show success message (you can replace with toast notification)
    //alert(`${spice.name} added to cart!`);
    
    // Optional: Navigate to cart page
    // window.location.href = '/cart'; // Uncomment if you want immediate redirect
  };

  return (
    <div className="stock-container">
      {/* Header Section */}
      <Navbar/>
      <div className="stock-header">
        <h1> Spices </h1>
        <p>Discover our premium collection of authentic spices from around the world</p>
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search spices..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>Showing {filteredSpices.length} of {spices.length} spices</span>
      </div>

      {/* Spices Grid */}
      <div className="spices-grid">
        {filteredSpices.map(spice => (
          <div key={spice.id} className={`spice-card ${!spice.inStock ? 'out-of-stock' : ''}`}>
            {spice.discount > 0 && (
              <div className="discount-badge">{spice.discount}% OFF</div>
            )}
            
            <div className="spice-image-container">
              <img src={spice.image} alt={spice.name} className="spice-image" />
              {!spice.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>

            <div className="spice-info">
              <div className="spice-category">{spice.category}</div>
              <h3 className="spice-name">{spice.name}</h3>
              <p className="spice-description">{spice.description}</p>
              
              <div className="rating-container">
                <div className="stars">
                  {'★'.repeat(Math.floor(spice.rating))}{'☆'.repeat(5 - Math.floor(spice.rating))}
                </div>
                <span className="rating-text">{spice.rating} ({spice.reviews} reviews)</span>
              </div>

              <div className="price-container">
                {spice.originalPrice > spice.price && (
                  <span className="original-price">${spice.originalPrice}</span>
                )}
                <span className="current-price">${spice.price}</span>
              </div>

              <button
                className={`buy-btn ${!spice.inStock ? 'disabled' : ''}`}
                onClick={() => spice.inStock && addToCart(spice)}
                disabled={!spice.inStock}
              >
                {spice.inStock ? (
                  <>
                    🛒 Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSpices.length === 0 && (
        <div className="no-results">
          <h3>No spices found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Stock;