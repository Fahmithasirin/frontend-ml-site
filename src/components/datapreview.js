import React, { useState, useEffect } from "react";
import axios from "axios";

function DataPreview({ filename, onCleanData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://127.0.0.1:5000/preview/${filename}`)
      .then((response) => {
        let fetchedData = typeof response.data === "string" ? JSON.parse(response.data.replace(/NaN/g, "null")) : response.data;
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          setError("Data format is incorrect.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [filename]);

  if (loading) return <p>Loading data preview...</p>;
  if (error) return <p>{error}</p>;
  if (data.length === 0) return <p>No data available for preview.</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={onCleanData} style={{ marginTop: "20px" }}>
        Clean Data
      </button>
    </div>
  );
}

export default DataPreview;
