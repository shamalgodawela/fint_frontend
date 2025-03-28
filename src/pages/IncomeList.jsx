import React, { useEffect, useState, useRef } from "react";
import { FaTrash, FaSave, FaEdit, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";
import IncomeSidebar from "../Components/IncomeSidebar";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [editedIncome, setEditedIncome] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = () => {
    fetch(`${API_URL}/incomes`)
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data);
        setEditedIncome(
          data.reduce((acc, income) => {
            acc[income._id] = { ...income };
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income entry?")) {
      try {
        await fetch(`${API_URL}/incomes/${id}`, { method: "DELETE" });
        setIncomes((prev) => prev.filter((income) => income._id !== id));
      } catch (err) {
        console.error("Error deleting income:", err.message);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  const handleEditChange = (id, field, value) => {
    // Check if the amount is a valid number greater than 0
    if (field === "amount") {
      if (value <= 0) {
        alert("Amount must be greater than 0");
        return;
      }
    }

    // Validate date: can't be a future date
    if (field === "date") {
      const today = new Date().toISOString().split("T")[0];
      if (value > today) {
        alert("You cannot select a future date.");
        return;
      }
    }

    setEditedIncome((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = async (id) => {
    const { _id, date, ...payload } = editedIncome[id];
    try {
      const response = await fetch(`${API_URL}/incomes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to update income");
      const updatedIncome = await response.json();
      setIncomes((prev) =>
        prev.map((income) => (income._id === id ? updatedIncome : income))
      );
      setEditingRow(null);
      alert("Income updated successfully.");
    } catch (err) {
      console.error("Error updating income:", err.message);
      alert("Error updating income.");
    }
  };

  // Function to download PDF of income list table only
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Define table columns and rows
    const columns = ['Income Source', 'Category', 'Type', 'Amount', 'Description', 'Date'];
    const rows = incomes.map((income) => [
      income.incomeSource,
      income.incomeCategory,
      income.incomeType,
      `$${income.amount}`,
      income.description,
      new Date(income.date).toLocaleDateString(),
    ]);

    // Add table to the document using autoTable
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the document
    doc.save('income-report.pdf');
  };

  // Filter incomes based on search term
  const filteredIncomes = incomes.filter((income) =>
    Object.keys(income).some((key) => {
      if (typeof income[key] === "string" || typeof income[key] === "number") {
        return income[key].toString().toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  // Prepare data for Pie chart (Total income by income type)
  const incomeTypes = filteredIncomes.reduce((acc, income) => {
    acc[income.incomeType] = (acc[income.incomeType] || 0) + income.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(incomeTypes),
    datasets: [
      {
        data: Object.values(incomeTypes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Prepare data for Bar chart (Income by category)
  const incomeCategories = filteredIncomes.reduce((acc, income) => {
    acc[income.incomeCategory] = (acc[income.incomeCategory] || 0) + income.amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        label: 'Income by Category',
        data: Object.values(incomeCategories),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  // Calculate total income from filtered incomes
  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-[#434570] to-[#232439]">
      {/* Sidebar remains open on the left */}
      <IncomeSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Income Entries</h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search incomes ...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Total Income Card */}
        <div className="max-w-md mx-auto shadow-lg rounded-xl p-6 mb-8 ">
          <h3 className="text-2xl font-bold text-center text-green-400">Total Income</h3>
          <p className="text-center text-3xl font-semibold mt-4">${totalIncome.toFixed(2)}</p>
        </div>

        {/* Income List Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full bg-white border border-gray-200">
            <thead className="bg-gray-400 text-slate-950">
              <tr>
                {['Income Source', 'Category', 'Type', 'Amount', 'Description', 'Date', 'Actions'].map((header) => (
                  <th key={header} className="py-3 px-4 border-b text-center">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredIncomes.map((income) => (
                <tr key={income._id} className="text-center border-b hover:bg-gray-50 transition">
                  {editingRow === income._id ? (
                    <>
                      {/* Replace text inputs with select dropdowns for these fields */}
                      <td className="py-2 px-4 border-b">
                        <select
                          value={editedIncome[income._id]?.incomeSource || ''}
                          onChange={(e) => handleEditChange(income._id, 'incomeSource', e.target.value)}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                        >
                          <option value="">Select income source</option>
                          <option value="product_sales">Product Sales</option>
                          <option value="service_revenue">Service Revenue</option>
                          <option value="investments">Investments</option>
                          <option value="rental_income">Rental Income</option>
                          <option value="royalties">Royalties</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          value={editedIncome[income._id]?.incomeCategory || ''}
                          onChange={(e) => handleEditChange(income._id, 'incomeCategory', e.target.value)}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                        >
                          <option value="">Select category</option>
                          <option value="salary">Salary</option>
                          <option value="investment">Investment</option>
                          <option value="business">Business</option>
                          <option value="rental">Rental</option>
                          <option value="royalties">Royalties</option>
                          <option value="others">Others</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          value={editedIncome[income._id]?.incomeType || ''}
                          onChange={(e) => handleEditChange(income._id, 'incomeType', e.target.value)}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                        >
                          <option value="">Select type</option>
                          <option value="one-time">One-time</option>
                          <option value="recurring">Recurring</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="number"
                          value={editedIncome[income._id]?.amount || ''}
                          onChange={(e) => handleEditChange(income._id, 'amount', parseFloat(e.target.value))}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                          min="0"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <textarea
                          value={editedIncome[income._id]?.description || ''}
                          onChange={(e) => handleEditChange(income._id, 'description', e.target.value)}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                          rows="3"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="date"
                          value={editedIncome[income._id]?.date || ''}
                          onChange={(e) => handleEditChange(income._id, 'date', e.target.value)}
                          className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleUpdate(income._id)}
                          className="bg-green-500 text-white p-2 rounded-md mx-2"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingRow(null)}
                          className="bg-red-500 text-white p-2 rounded-md mx-2"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b">{income.incomeSource}</td>
                      <td className="py-2 px-4 border-b">{income.incomeCategory}</td>
                      <td className="py-2 px-4 border-b">{income.incomeType}</td>
                      <td className="py-2 px-4 border-b">${income.amount}</td>
                      <td className="py-2 px-4 border-b">{income.description}</td>
                      <td className="py-2 px-4 border-b">{new Date(income.date).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEditClick(income._id)}
                          className="bg-blue-500 text-white p-2 rounded-md mx-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(income._id)}
                          className="bg-red-500 text-white p-2 rounded-md mx-2"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        

        
      </div>
    </div>
  );
};

export default IncomeList;
