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
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg border border-emerald-100">
        {/* Header */}
        <div className="p-4 border-b border-emerald-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">ParcelPoint Locations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-emerald-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Map Section */}
          <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-emerald-50 border border-emerald-100">
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
              <div 
                key={index} 
                className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900">{location.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{location.address}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Hours: {location.hours}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-emerald-600 hover:text-emerald-700 underline"
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