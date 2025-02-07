"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/fetchFreeToGame");
      const result = await response.json();
      console.log("Fetched & Stored Data:", result);
      setData(result.data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load data.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Stored API Data
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-700">Loading data...</p>
        ) : data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item: { _id: string; title: string; body: string }) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
      </div>
    </div>
  );
}
