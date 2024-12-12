import React from 'react';
import './Marketplace.css';
import ProductCard from './ProductCard';

const Marketplace = () => {
  const items = [
    {
      image: 'assets/product1.jpg',
      title: 'Dark Ceramic Jugs',
      price: '$50',
      location: 'Flushing, NY',
      miles: null,
      availability: true,
    },
    {
      image: '/assets/product2.jpg',
      title: 'Gold Necklace Chain',
      price: '$103,000',
      location: 'Guangdong, China',
      miles: null,
      availability: true,
    },
    {
        image: '/assets/product3.jpg',
        title: 'Comfy Stool',
        price: '$10,103',
        location: 'Flushing, NY',
        miles: null,
        availability: true,
    },
    {
        image: '/assets/product4.jpg',
        title: 'Polaroid I-Type Camera',
        price: '$550',
        location: 'San Diego, CA',
        miles: null,
        availability: false,
    },
    {
        image: '/assets/product5.jpg',
        title: 'Rayband Glasses',
        price: '$200',
        location: 'Manhattan, NY',
        miles: null,
        availability: true,
    },
    {
        image: '/assets/product6.jpg',
        title: 'Nike Air Max Pegasus',
        price: '$103',
        location: 'Novato, CA',
        miles: null,
        availability: true,
    },
    {
        image: '/assets/product7.jpg',
        title: 'Vinta Backpack',
        price: '$50',
        location: 'Las Vegas, Nevada',
        miles: null,
        availability: true,
    },
    {
        image: '/assets/product8.jpg',
        title: 'Sony Wired Headphones',
        price: '$600',
        location: 'Chicago, Illinois',
        miles: null,
        availability: true,
    },
    {
        image: '/assets/product9.jpg',
        title: 'Nintendo Gameboy',
        price: '$25',
        location: 'Mississauga, Ontario',
        miles: null,
        availability: true,
    },
  ];

  return (
    <div>
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <p>Buy and sell products within your community!</p>
      </header>

      <div className="marketplace-container">
        <div className="marketplace-grid">
          {items.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              location={item.location}
              miles={item.miles}
              availability={item.availability} // Pass availability
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
