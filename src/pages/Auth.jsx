import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

// Set the marker icons
const setMarkerIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconRetinaUrl,
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
  });
};

// Call this function when the component mounts
setMarkerIcons();

const center = {
  lat: 22.719,
  lng: 75.857,
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    location: center, // Initial location
  });

  const { state, login, register } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuth) {
      navigate("/dashboard");
    }
  }, [state.isAuth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLocationChange = (latlng) => {
    setFormData((prevData) => ({
      ...prevData,
      location: latlng,
    }));
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleLocationChange(e.latlng); // Update the location when map is clicked
      },
    });

    return <Marker position={formData.location} />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLogin ? await login(formData) : await register(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 " style={{minHeight: "80vh"}}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col  justify-center">
        <h2 className="text-3xl font-semibold mb-4 p-2 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              autoComplete="on"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Serving Area:
                </label>
                <input
                  type="text"
                  name="address" // Ensure the name matches the state key
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location:
                </label>
                <MapContainer
                  center={center}
                  zoom={10}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker />
                </MapContainer>
                <div className="mt-2 text-sm text-gray-600">
                  Selected Location: {formData.location.lat.toFixed(5)},{" "}
                  {formData.location.lng.toFixed(5)}
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {isLogin
              ? "Need an account? Register here"
              : "Already have an account? Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;