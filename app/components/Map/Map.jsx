"use client";

import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClusterer,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 51.5074, // London coordinates
  lng: -0.1278,
};

const libraries = ["places"];

const reviews = [
  { id: 1, text: "Great spot for pumpkins!", rating: 5 },
  { id: 2, text: "Loved the ambiance here.", rating: 4 },
  { id: 3, text: "Not the best pumpkins but nice place.", rating: 3 },
];

const GoogleMapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      name: "Pumpkin Spot 1",
      position: { lat: 52.48267771366152, lng: -1.8924990491205056 },
      image: "/happy.svg",
    },
    {
      id: 2,
      name: "Pumpkin Spot 2",
      position: { lat: 52.47267771366152, lng: -1.8824990491205056 },
      image: "/happy.svg",
    },
    {
      id: 3,
      name: "Pumpkin Spot 3",
      position: { lat: 52.49267771366152, lng: -1.9024990491205056 },
      image: "/happy.svg",
    },
    {
      id: 4,
      name: "Pumpkin Spot 4",
      position: { lat: 52.48276, lng: -1.892835 },
      image: "/happy.svg",
    },
    {
      id: 5,
      name: "Pumpkin Spot 5",
      position: { lat: 52.4834, lng: -1.89237 },
      image: "/happy.svg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const options = useMemo(
    () => ({
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
      disableDefaultUI: false,
      clickableIcons: false,
      streetViewControl: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#212121" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ color: "#757575" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#212121" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#181818" }],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{ color: "#383838" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#000000" }],
        },
      ],
    }),
    []
  );

  const filteredMarkers = markers.filter((marker) =>
    marker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (mapRef.current) {
      mapRef.current.panTo(marker.position);
      mapRef.current.setZoom(15);
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleLegendItemClick = (marker) => {
    handleMarkerClick(marker);
  };

  const zoomIn = () => {
    if (mapRef.current) {
      const newZoom = zoomLevel + 1;
      setZoomLevel(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const zoomOut = () => {
    if (mapRef.current && zoomLevel > 1) {
      const newZoom = zoomLevel - 1;
      setZoomLevel(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  // Function to calculate average rating for a marker
  const getAverageRating = (markerId) => {
    const relevantReviews = reviews.filter((review) => review.id === markerId);
    const averageRating =
      relevantReviews.length > 0
        ? (
            relevantReviews.reduce((acc, review) => acc + review.rating, 0) /
            relevantReviews.length
          ).toFixed(1)
        : 0;
    return averageRating;
  };

  if (loadError) {
    return (
      <div className="text-red-500 text-center py-4">Error loading maps</div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="text-gray-500 text-center py-4">Loading maps...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative dark:bg-gray-900 bg-white min-h-screen"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('/backgrounds/dark.avif')",
          backgroundPosition: "centre bottom",
          filter: "blur(2px)", // Adjust blur value as needed
          zIndex: -1, // Send it behind other elements
          opacity: 0.8, // Adjust opacity as needed
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
        }}
      ></div>
      <div className="flex space-x-2 m-3 ">
        <button
          onClick={zoomIn}
          className="p-2  rounded bg-orange-400 text-white hover:bg-orange-600 transition"
        >
          Zoom In
        </button>
        <button
          onClick={zoomOut}
          className="p-2  rounded bg-orange-400 text-white hover:bg-orange-600 transition"
        >
          Zoom Out
        </button>
      </div>
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomLevel}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          <MarkerClusterer>
            {(clusterer) =>
              filteredMarkers.map((marker) => (
                <MarkerF
                  key={marker.id}
                  position={marker.position}
                  onClick={() => handleMarkerClick(marker)}
                  clusterer={clusterer}
                  icon={{
                    url: marker.image,
                    scaledSize: new window.google.maps.Size(40, 50),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(16, 32),
                  }}
                />
              ))
            }
          </MarkerClusterer>

          {selectedMarker && (
            <InfoWindowF
              position={selectedMarker.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="text-gray-600">
                <h3 className="font-bold text-lg">{selectedMarker.name}</h3>
                {selectedMarker.image && (
                  <Image
                    src={selectedMarker.image}
                    alt={selectedMarker.name}
                    height={100}
                    width={100}
                    className="mb-2"
                  />
                )}
                <p className="text-sm">
                  Latitude: {selectedMarker.position.lat.toFixed(4)}
                </p>
                <p className="text-sm">
                  Longitude: {selectedMarker.position.lng.toFixed(4)}
                </p>
                <h4 className="font-bold mt-2">Reviews:</h4>
                <ul className="text-sm">
                  {reviews.map((review) => (
                    <li key={review.id}>
                      {review.text} (Rating: {review.rating}⭐)
                    </li>
                  ))}
                </ul>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
      <div className="absolute bottom-4 left-4 bg-white text-gray-600 bg-opacity-90 p-4 rounded-lg shadow-md">
        <h2 className="font-bold text-lg mb-2">Pumpkin Legend</h2>
        <ul className="space-y-2">
          {markers.map((marker) => (
            <li
              key={marker.id}
              className="flex items-center cursor-pointer hover:text-orange-500 transition-colors duration-200"
              onClick={() => handleLegendItemClick(marker)}
            >
              <FaMapMarkerAlt className="text-orange-500 mr-2" />
              <span>
                {marker.name} (Avg. Rating: {getAverageRating(marker.id)}⭐)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default GoogleMapComponent;
