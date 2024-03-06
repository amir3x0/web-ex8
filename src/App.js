import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
        const data = await response.json();
        setImages(data);
        setSelectedImage(data[0]); // Set the first image as the selected one by default
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Navbar of small images */}
      <div className="navbar">
        {images.map((image, index) => (
          <img
            key={index}
            className="thumbnail"
            src={image.download_url}
            alt={`Image by ${image.author}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      
      {/* Large selected image */}
      <div className="selected-image-container">
        {selectedImage && (
          <img
            className="selected-image"
            src={selectedImage.download_url}
            alt={`Image by ${selectedImage.author}`}
          />
        )}
      </div>
    </div>
  );
};

export default App;
