import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Coordenadas aproximadas de Sincelejo, Sucre, Colombia
const SINCELEJO_CENTER = {
    lat: 9.3047,
    lng: -75.3977
};

// Generar marcadores aleatorios alrededor del centro de Sincelejo
const generateRandomMarkers = (count: number) => {
    const markers = [];
    const motelNames = [
        'Motel Paraíso', 'Motel Luna', 'Motel Estrella', 'Motel Sol',
        'Motel Horizonte', 'Motel Oasis', 'Motel Refugio', 'Motel Descanso',
        'Motel Tranquilidad', 'Motel Serenidad', 'Motel Calma', 'Motel Paz'
    ];

    for (let i = 0; i < count; i++) {
        // Generar coordenadas aleatorias dentro de un radio de aproximadamente 2km
        const lat = SINCELEJO_CENTER.lat + (Math.random() - 0.5) * 0.05;
        const lng = SINCELEJO_CENTER.lng + (Math.random() - 0.5) * 0.05;

        markers.push({
            id: i,
            position: { lat, lng },
            name: motelNames[Math.floor(Math.random() * motelNames.length)],
            price: Math.floor(Math.random() * 100000) + 50000, // Precios entre 50,000 y 150,000 COP
            rating: (Math.random() * 2 + 3).toFixed(1), // Calificación entre 3.0 y 5.0
            image: `https://source.unsplash.com/random/300x200/?hotel,room&sig=${i}` // Imágenes aleatorias
        });
    }

    return markers;
};

// Estilos personalizados para el mapa
const mapStyles = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

export const MotelsInMap = () => {
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const [markers] = useState(() => generateRandomMarkers(15));

    // Cargar la API de Google Maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'
    });

    const mapContainerStyle = {
        width: '100%',
        height: '600px'
    };

    const options = {
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    };

    const onLoad = useCallback((map: any) => {
        // Ajustar el mapa para mostrar todos los marcadores
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => {
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
    }, [markers]);

    const onUnmount = useCallback(() => {
        // Limpieza si es necesario
    }, []);

    // Formatear precio en COP
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-[600px] bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={SINCELEJO_CENTER}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        onClick={() => setSelectedMarker(marker)}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            scaledSize: new window.google.maps.Size(40, 40)
                        }}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.position}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div className="p-2 max-w-xs">
                            <div className="relative w-full h-32 mb-2 rounded overflow-hidden">
                                <img
                                    src={selectedMarker.image}
                                    alt={selectedMarker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">{selectedMarker.name}</h3>
                            <div className="flex items-center mt-1">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(parseFloat(selectedMarker.rating)) ? 'fill-current' : 'fill-gray-300'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-1 text-sm text-gray-600">{selectedMarker.rating}</span>
                            </div>
                            <p className="text-red-600 font-semibold mt-1">{formatPrice(selectedMarker.price)}</p>
                            <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Reservar ahora
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};
