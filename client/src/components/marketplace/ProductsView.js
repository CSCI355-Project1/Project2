import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "rc-slider";
import ProductCard from "./ProductCard";
import "rc-slider/assets/index.css";
import "../../styles/ProductsView.css";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [maxProductPrice, setMaxProductPrice] = useState(300);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    status: "",
    minPrice: 0,
    maxPrice: 300,
  });

  const handlePriceChange = (values) => {
    setPriceRange(values);
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };
  const fetchMaxPrice = async () => {
    try {
      const baseURL = "http://localhost:3005";
      const response = await axios.get(`${baseURL}/api/products`);
      const highest = Math.max(
        ...response.data.map((product) => parseFloat(product.price))
      );
      setMaxProductPrice(highest);
      setPriceRange([0, highest]);
      setFilters((prev) => ({
        ...prev,
        maxPrice: highest,
      }));
    } catch (error) {
      console.error("Error fetching max price:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const baseURL = "http://localhost:3005";
      let headers = {};

      if (filters.status) headers.status = filters.status;
      if (filters.minPrice !== 0) headers["min-price"] = filters.minPrice;
      if (filters.maxPrice !== maxProductPrice)
        headers["max-price"] = filters.maxPrice;

      const response = await axios.get(`${baseURL}/api/products`, { headers });
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error loading products");
    }
  };

  useEffect(() => {
    fetchMaxPrice();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    fetchProducts();
  };

  const handleSort = (field) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  const getSortedProducts = () => {
    if (!sortField) return products;

    return [...products].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField.includes("_at")) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === "price") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (typeof aValue === "string") {
        if (aValue == null) aValue = "";
        if (bValue == null) bValue = "";
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div>
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <p>Buy and sell products within your community!</p>
      </header>

      <div className="filters-container">
        <div className="filter-group">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Availability</option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="pre_order">Pre-order</option>
          </select>

          <div className="price-range-container">
            <div className="price-range-header">
              <span>PRICE</span>
              <span>
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              range
              min={0}
              max={maxProductPrice}
              value={priceRange}
              onChange={handlePriceChange}
              className="price-slider"
            />
          </div>

          <button onClick={handleApplyFilters} className="apply-button">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="marketplace-container">
        {error ? (
          <div className="message error">{error}</div>
        ) : products.length === 0 ? (
          <div className="message">No products found</div>
        ) : (
          <div className="marketplace-grid">
            {getSortedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;
