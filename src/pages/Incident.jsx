import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../AppContext';

const IncidentManagement = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const {state, setState} = useContext(AppContext)

  const handleSelectIncident = (incident) => {
    setSelectedIncident(incident);
    setStatusUpdate(incident.status); // Initialize with current status
  };

  const handleUpdateStatus = () => {
    // Update the status in the data (for demo purposes, this won't persist)
    const updatedIncidents = state?.crimes.map((incident) =>
      incident.id === selectedIncident.id
        ? { ...incident, status: statusUpdate }
        : incident
    );
    console.log('Updated Incidents:', updatedIncidents);
    setSelectedIncident(null); // Close modal
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <header className="bg-white shadow p-4 mb-6">
          <h1 className="text-xl font-semibold text-center">Incident Management</h1>
        </header>

        {/* Main Section */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incident List */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Reported Incidents</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state?.crimes?.map((incident) => incident &&  (
                  <tr key={incident.id} className="border-t">
                    <td className="p-2">{incident.id}</td>
                    <td className="p-2">{incident.tag}</td>
                    <td className="p-2">{incident.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleSelectIncident(incident)}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow rounded-lg p-4 -z-10">
            <h2 className="text-lg font-semibold mb-4">Incident Map</h2>
            <MapContainer center={[state?.crimes[0]?.location._lat, state?.crimes[0]?.location._long]} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {state?.crimes?.map((incident) => (
                <Marker key={incident.id}  position={[incident.location._lat, incident.location._long]}>
                  <Popup>
                    <div>
                      <strong>{incident?.tag}</strong><br />
                      Status: {incident?.status}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </main>
      </div>

      {/* Modal for Updating Status */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Update Incident Status</h2>
            <p className="mb-4">Incident: {selectedIncident.type}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="Reported">Reported</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedIncident(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentManagement;
