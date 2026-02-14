import React, { useState } from "react";
import axios from "axios";

const UploadItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Item uploaded successfully!");
      setTitle("");
      setPrice("");
      setImage(null);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Item</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          placeholder="Item Name"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          className="w-full"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Upload Item
        </button>

      </form>
    </div>
  );
};

export default UploadItem;
