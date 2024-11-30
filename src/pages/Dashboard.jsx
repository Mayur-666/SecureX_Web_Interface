import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-modal';
import { FaUserShield, FaExclamationTriangle, FaTachometerAlt, FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AppContext } from '../AppContext';

const Dashboard = () => {
  const [crimes, setCrimes] = useState([]);
  const [selectedCrime, setSelectedCrime] = useState(null);
  const {state , setState} = useContext(AppContext)

  useEffect(() => {
    const fetchCrimes = async () => {
      const querySnapshot = await getDocs(collection(db, "crimes"));
      const crimesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrimes(crimesData);
      setState({
        ...state, 
        crimes: crimesData,
      })
      console.log(crimesData);
    };

    fetchCrimes();
  }, []);

  const openCrimeDetail = (crime) => {
    setSelectedCrime(crime);
  };

  const closeModal = () => {
    setSelectedCrime(null);
  };

  const groupedCrimes = {
    High: crimes.filter((crime) => crime.priority === 'High'),
    Medium: crimes.filter((crime) => crime.priority === 'Medium'),
    Low: crimes.filter((crime) => crime.priority === 'Low'),
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col space-y-6 py-6 px-4">
        <div className="flex items-center space-x-2 px-4">
          <FaUserShield className="text-3xl" />
          <span className="text-xl font-semibold">Police HQ</span>
        </div>
        <nav className="space-y-4">
          <Link to={"/dashboard"} className="flex items-center space-x-2 hover:bg-blue-700 py-2 px-4 rounded">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          <Link to={"/incident"} className="flex items-center space-x-2 hover:bg-blue-700 py-2 px-4 rounded">
            <FaExclamationTriangle />
            <span>Incident Management</span>
          </Link>
          <Link to={"/report"} className="flex items-center space-x-2 hover:bg-blue-700 py-2 px-4 rounded">
            <HiOutlineDocumentReport />
            <span>Reports</span>
          </Link>
          <Link to={"/setting"} className="flex items-center space-x-2 hover:bg-blue-700 py-2 px-4 rounded">
            <FaCog />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-6">
        <header className="bg-white shadow p-6 mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.keys(groupedCrimes).map((priority) => (
            <div key={priority} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {priority} Priority Crimes
              </h2>
              <ul className="space-y-4">
                {groupedCrimes[priority].length>0 ?  groupedCrimes[priority].map((crime) => (
                  <li
                    key={crime.id}
                    className="p-4 bg-blue-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-blue-200"
                    onClick={() => openCrimeDetail(crime)}
                  >
                    <span className="font-semibold">{crime.tag}</span>
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </li>
                )) : <div className="p-4 bg-blue-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-blue-200">No crimes reported yet.</div>}
              </ul>
            </div>
          ))}
        </div>

        {/* Crime Details Modal */}
        <Modal
          isOpen={!!selectedCrime}
          onRequestClose={closeModal}
          contentLabel="Crime Details"
          className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
          {selectedCrime && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedCrime.tag}</h2>
              <p className="mb-4">{selectedCrime.description}</p>

              {/* Map for Crime Location */}
              <MapContainer
                center={[selectedCrime.location._lat, selectedCrime.location._long]}
                zoom={13}
                className="h-64 w-full rounded-lg shadow"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[selectedCrime.location._lat, selectedCrime.location._long]}>
                  <Popup>{selectedCrime.tag}</Popup>
                </Marker>
              </MapContainer>

              <button
                onClick={closeModal}
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;