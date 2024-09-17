import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ location }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([-1.3667, 36.8333], 13); // Default to Emara Ole Sereni in Nairobi

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);
    }

    if (location) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
          if (data[0]) {
            const { lat, lon } = data[0];
            mapInstance.current.setView([lat, lon], 15);
            L.marker([lat, lon]).addTo(mapInstance.current);
          }
        })
        .catch(error => console.error('Error geocoding location:', error));
    }
  }, [location]);

  return (
    <div 
      ref={mapContainer} 
      className="w-[70%] h-48 md:h-60 lg:h-80 mx-auto mb-4" // Adjust height for different screen sizes
    ></div>
  );
};

export default Map;