import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/dashboard")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        alert("Unauthorized! Please login again");
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p>Welcome: {user.email}</p>

          <button
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              marginTop: "20px",
            }}
            onClick={() => alert("Item Purchased ✅")}
          >
            Buy Item
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
