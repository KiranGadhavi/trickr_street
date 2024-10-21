'use client'

import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

// This is the map container styling
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
  margin: '0 auto'
}

const center = { lat: 52.48267771366152, lng: -1.8924990491205056 }

// Night mode style
const nightModeStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]

const initialMarkers = [
  { id: 1, name:"👻👻👻👻", position: { lat: 52.48267771366152, lng: -1.8924990491205056 }, image: '/markers/happy.svg', title: 'Happy House 1' },
  { id: 2, name:"👻👻", position: { lat: 52.47267771366152, lng: -1.8824990491205056 }, image: '/markers/happy.svg', title: 'Happy House 2' },
  { id: 3, name:"👻", position: { lat: 52.49267771366152, lng: -1.9024990491205056 }, image: '/markers/sad.svg', title: 'Sad House 1' },
  { id: 4, name:"👻👻👻", position: { lat: 52.482760, lng: -1.892835 }, image: '/markers/sad.svg', title: 'Sad House 2' },
  { id: 5, name:"👻👻👻👻👻", position: { lat: 52.482910, lng: -1.892730 }, image: '/markers/happy.svg', title: 'Happy House 3' },
  { id: 6, name:"👻👻👻", position: { lat: 52.483050, lng: -1.892620 }, image: '/markers/happy.svg', title: 'Happy House 4' },
]

// This is the map app
export default function MapApp() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState(initialMarkers)
  const [selectedMarker, setSelectedMarker] = useState(null) // State to handle selected marker

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps</div>
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ styles: nightModeStyle, streetViewControl: false, zoomControl: false }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={{
              url: marker.image,
              scaledSize: new window.google.maps.Size(40, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(16, 32),
            }}
            onClick={() => setSelectedMarker(marker)} // Set the selected marker on click
          />
        ))}

        {/* Show InfoWindow when a marker is clicked */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)} // Close the InfoWindow
          >
            <div>
              <h1 >{}</h1>
              <h2>{selectedMarker.title}</h2>
              <p>Review: {selectedMarker.name}Lat: {selectedMarker.position.lat}, Lng: {selectedMarker.position.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
