import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for detected incidents
const detectedIncidents = [
  { id: 1, type: 'Assault', location: { lat: -3.745, lng: -38.523 }, timestamp: '2024-10-08 12:45:30' },
  { id: 2, type: 'Burglary', location: { lat: -3.746, lng: -38.530 }, timestamp: '2024-10-08 13:15:42' },
  { id: 3, type: 'Theft', location: { lat: -3.747, lng: -38.520 }, timestamp: '2024-10-08 13:45:15' },
  { id: 4, type: 'Vandalism', location: { lat: -3.748, lng: -38.540 }, timestamp: '2024-10-08 14:05:27' },
];

const LiveCrimeDetection = () => {
  const [liveFeed, setLiveFeed] = useState(null);

  // Dummy effect for setting up the live feed (can be replaced with actual video source)
  useEffect(() => {
    // Here you can fetch or connect to the live feed from your backend or video stream
    setLiveFeed('https://www.w3schools.com/html/mov_bbb.mp4'); // Dummy live feed (replace with real feed URL)
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <header className="bg-white shadow p-4 mb-6">
          <h1 className="text-xl font-semibold">Live Crime Detection</h1>
        </header>

        {/* Main Section */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Video Feed */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Live Video Feed</h2>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              {liveFeed ? (
                <video src={liveFeed} controls autoPlay muted className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  No live feed available
                </div>
              )}
            </div>
          </div>

          {/* Detected Incidents Table */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Detected Incidents</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {detectedIncidents.map((incident) => (
                  <tr key={incident.id} className="border-t">
                    <td className="p-2">{incident.id}</td>
                    <td className="p-2">{incident.type}</td>
                    <td className="p-2">{incident.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Incident Map</h2>
            <MapContainer center={detectedIncidents[0].location} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {detectedIncidents.map((incident) => (
                <Marker key={incident.id} position={incident.location}>
                  <Popup>
                    <div>
                      <strong>{incident.type}</strong><br />
                      Detected at: {incident.timestamp}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveCrimeDetection;
