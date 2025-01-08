import React, { useState, useEffect } from "react";
import axios from "axios";

function DataCleaning({ filename, onBack }) {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [cleanedData, setCleanedData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/preview/${filename}`)
      .then((response) => {
        let fetchedData = typeof response.data === "string" ? JSON.parse(response.data.replace(/NaN/g, "null")) : response.data;
        if (Array.isArray(fetchedData)) {
          setColumns(Object.keys(fetchedData[0]));
          setCleanedData(fetchedData);  // Initialize cleanedData with fetchedData
          setHistory([fetchedData]);    // Initialize history with initial data
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filename]);

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  const handleCleanData = (action) => {
    axios
      .post(`http://127.0.0.1:5000/clean`, { action, filename, columns: selectedColumns })
      .then((response) => {
        console.log("Cleaned data response:", response.data);  // Debugging log
        if (Array.isArray(response.data)) {
          setCleanedData(response.data);
          setHistory((prevHistory) => [...prevHistory, response.data]);  // Save state to history
        } else {
          console.error("Cleaned data is not an array:", response.data);
        }
      })
      .catch((error) => {
        alert("Data cleaning failed.");
        console.error("Error cleaning data:", error);
      });
  };

  const handleUndo = () => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();  // Remove the latest state
      setCleanedData(newHistory[newHistory.length - 1] || []);  // Revert to the previous state
      return newHistory;
    });
  };

  return (
    <div>
      <button onClick={onBack}>Back to Preview</button>
      <h2>Data Cleaning for: {filename}</h2>
      <div>
        {columns.map((column) => (
          <div key={column}>
            <input
              type="checkbox"
              id={column}
              name={column}
              value={column}
              onChange={() => handleCheckboxChange(column)}
            />
            <label htmlFor={column}>{column}</label>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleCleanData('remove_nulls')}>Remove Nulls</button>
        <button onClick={() => handleCleanData('replace_nulls')}>Replace Nulls</button>
        <button onClick={() => handleCleanData('remove_duplicates')}>Remove Duplicates</button>
        <button onClick={handleUndo} disabled={history.length <= 1}>Undo</button>
      </div>

      {Array.isArray(cleanedData) && cleanedData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Cleaned Data Preview</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(cleanedData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cleanedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataCleaning;
