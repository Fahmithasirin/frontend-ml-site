import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./datacleaning.css";

function DataCleaning() {
  const { filename } = useParams();
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [cleanedData, setCleanedData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/preview/${filename}`)
      .then((response) => {
        let fetchedData =
          typeof response.data === "string"
            ? JSON.parse(response.data.replace(/NaN/g, "null"))
            : response.data;
        if (Array.isArray(fetchedData)) {
          setColumns(Object.keys(fetchedData[0]));
          setCleanedData(fetchedData);
          setHistory([fetchedData]);
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
        if (Array.isArray(response.data)) {
          setCleanedData(response.data);
          setHistory((prevHistory) => [...prevHistory, response.data]);
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
      newHistory.pop();
      setCleanedData(newHistory[newHistory.length - 1] || []);
      return newHistory;
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="data-cleaning-container">
      <div className="operations-container">
        <button onClick={() => handleCleanData("remove_nulls")}>Remove Nulls</button>
        <button onClick={() => handleCleanData("replace_nulls")}>Replace Nulls</button>
        <button onClick={() => handleCleanData("remove_duplicates")}>Remove Duplicates</button>
        <button onClick={() => handleCleanData("detect_nulls")}>Detect Nulls</button>
        <button onClick={() => handleCleanData("detect_duplicates")}>Detect Duplicates</button>
        <button onClick={handleUndo} disabled={history.length <= 1}>
          Undo
        </button>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="data-view-container">
        <div className="columns-container">
          <h3>Columns</h3>
          {columns.map((column) => (
            <div className="column-item" key={column}>
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

        <div className="data-preview-container">
          <h3>Cleaned Data Preview</h3>
          {cleanedData.length > 0 ? (
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
          ) : (
          <p>No data available for the selected operation.</p>
          )}
          </div>  
      </div>
    </div>
  );
}

export default DataCleaning;
