import React from 'react';
import { X, MapPin } from 'lucide-react';

const LOCATIONS = [
  {
    name: "Garden City Mall",
    address: "Parking Lot, Opposite Java, Thika Road",
    lat: -1.231850,
    lng: 36.878823,
    hours: "24/7"
  }
];

const LocationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">ParcelPoint Locations</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          {/* Map Section */}
          <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-gray-800">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${36.878823 - 0.01},${-1.231850 - 0.01},${36.878823 + 0.01},${-1.231850 + 0.01}&layer=mapnik&marker=${-1.231850},${36.878823}`}
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Locations List */}
          <div className="mt-4 space-y-4">
            {LOCATIONS.map((location, index) => (
              <div key={index} className="bg-black p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-white shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">{location.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{location.address}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Hours: {location.hours}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-white hover:text-gray-300 underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;