import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadItem = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For redirecting after upload

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !category || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Item uploaded successfully!");
      
      // Clear form
      setTitle("");
      setCategory("");
      setImage(null);

      // Redirect to home page to show new item
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Item</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          placeholder="Item Name"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold transition ${
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
