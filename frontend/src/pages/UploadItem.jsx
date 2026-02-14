import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [maxDuration, setMaxDuration] = useState(7);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Auto-detect user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("📍 Location detected:", latitude, longitude);
          
          try {
            // Use Nominatim (OpenStreetMap) for reverse geocoding
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            
            // Extract city/town name from the response
            const addressData = response.data.address;
            const detectedCity = 
              addressData.city || 
              addressData.town || 
              addressData.village || 
              addressData.county ||
              addressData.state || 
              "Unknown";
            
            console.log("🏙️ City detected:", detectedCity);
            setCity(detectedCity);
          } catch (error) {
            console.error("❌ Reverse geocoding error:", error);
            setCity(""); // Leave empty if geocoding fails
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.warn("⚠️ Geolocation error:", error.message);
          setLocationLoading(false);
          // User will need to enter city manually if permission denied
        },
        { timeout: 5000 }
      );
    } else {
      console.warn("Geolocation not supported");
      setLocationLoading(false);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !city || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    if (!token) {
      alert("Please login to upload an item.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("city", city);
    formData.append("maxDuration", maxDuration);
    formData.append("image", image);

    try {
      setLoading(true);
      
      console.log("📤 Uploading item:", { title, category, city });
      console.log("🔑 Token present:", !!token);
      console.log("🔑 Token (first 20 chars):", token ? token.substring(0, 20) + "..." : "No token");
      
      const res = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Upload successful:", res.data);
      alert("Item uploaded successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setCity("");
      setMaxDuration(7);
      setImage(null);
      setImagePreview(null);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("❌ Upload error:", err);
      console.error("Error status:", err.response?.status);
      console.error("Error response:", err.response?.data);
      alert(
        err.response?.data?.msg || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Upload Item for Rent</h2>

      <form onSubmit={submit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Item Title *</label>
          <input
            type="text"
            placeholder="Enter item name"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Description *</label>
          <textarea
            placeholder="Describe the item (condition, features, etc.)"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Category and City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Category *</label>
            <input
              type="text"
              placeholder="e.g., Tools, Electronics"
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              City {locationLoading && "🔍"}
            </label>
            <input
              type="text"
              placeholder={locationLoading ? "Detecting location..." : "Your city (auto-detected)"}
              className={`w-full border-2 p-3 rounded-lg focus:outline-none ${
                locationLoading
                  ? "bg-gray-100 border-gray-300 cursor-wait"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={locationLoading}
              required
            />
            {locationLoading && (
              <p className="text-xs text-gray-500 mt-1">📍 Auto-detecting your location...</p>
            )}
            {!locationLoading && city && (
              <p className="text-xs text-green-600 mt-1">✅ Location detected: {city}</p>
            )}
            {!locationLoading && !city && (
              <p className="text-xs text-orange-600 mt-1">⚠️ Please enter your city manually</p>
            )}
          </div>
        </div>

        {/* Max Duration */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Max Rental Duration (days)</label>
          <input
            type="number"
            min="1"
            max="365"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            value={maxDuration}
            onChange={(e) => setMaxDuration(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Item Photo *</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-bold transition text-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Item"}
        </button>
      </form>
    </div>
  );
};

export default UploadItem;
