import React, { useState } from "react";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    age: "", sex: "", cp: "", trestbps: "", chol: "", fbs: "",
    restecg: "", thalach: "", exang: "", oldpeak: "", slope: "", ca: "", thal: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep sex as string for select, others as numbers
    setFormData({
      ...formData,
      [name]: name === "sex" ? value : value === "" ? "" : parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://heart-risk-backend.onrender.com/predict", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">🩺 Heart Disease Risk Prediction</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              {key === "sex" ? (
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Sex (0 - Female, 1 - Male)
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select</option>
                    <option value="0">0 - Female</option>
                    <option value="1">1 - Male</option>
                  </select>
                </div>
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-600 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </>
              )}
            </div>
          ))}
          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Predict
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className="mt-6 text-center text-lg font-semibold">
            Result:{" "}
            {prediction === 1 ? (
              <span className="text-red-600">High Risk of Heart Disease</span>
            ) : (
              <span className="text-green-600">Low Risk</span>
            )}
          </div>
        )}
      </div>
    </div>
      );
}

export default App;