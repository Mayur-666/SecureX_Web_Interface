import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

const ReportingAndAnalytics = () => {
  const [reportType, setReportType] = useState("summary");

  // Dummy data for the statistics
  const crimeStats = {
    totalIncidents: 6,
    resolvedCases: 1,
    activeCases: 5,
  };

  // Dummy data for charts
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Crime Reports Over Time",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const barData = {
    labels: ["Assault", "Shooting", "Accident", "Fighting", "Bullying"],
    datasets: [
      {
        label: "Reported Crimes by Type",
        data: [2, 1, 1, 1, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-xl font-semibold">Reporting & Analytics</h1>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crime Statistics Overview */}
        <div className="lg:col-span-1 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Crime Statistics</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <p className="text-xl font-semibold">
                {crimeStats.totalIncidents}
              </p>
              <p>Total Incidents</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="text-xl font-semibold">
                {crimeStats.resolvedCases}
              </p>
              <p>Resolved Cases</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
              <p className="text-xl font-semibold">{crimeStats.activeCases}</p>
              <p>Active Cases</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Crime Trends</h2>
          <div className="mb-6">
            <Line data={lineData} />
          </div>
          <div className="mb-6">
            <Bar data={barData} />
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Generate Reports</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={handleReportTypeChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>
        <button
          onClick={() => alert(`Generating ${reportType} report...`)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ReportingAndAnalytics;
