import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader';
import ExepenseSidebar from '../Components/ExepenseSidebar';
import { FaEdit, FaEye, FaSave } from 'react-icons/fa';

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/Expenses/getAllExpens');
        setExpenses(response.data);
        setLoading(false);
        toast.success('Expenses loaded successfully');
      } catch (error) {
        setIsLoading(true)
        setError('Failed to load expenses');
        toast.error('Failed to load expenses');
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  


  return (

<div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
  <ExepenseSidebar />

  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-white">All Expenses</h2>
    <div className="overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md ">
          <thead>
            <tr className="text-white bg-blue-900">
              <th className="py-4 px-8 text-left">Name</th>
              <th className="py-4 px-8 text-left">Category</th>
              <th className="py-4 px-8 text-left">Amount</th>
              <th className="py-4 px-8 text-left">Date</th>
              <th className="py-4 px-8 text-left">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={expense._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'
                } hover:bg-gray-500 transition-all duration-300`}
              >
                <td className="py-4 px-8 text-white">{expense.name}</td>
                <td className="py-4 px-8 text-white">{expense.category}</td>
                <td className="py-4 px-8 text-white">{expense.amount}</td>
                <td className="py-4 px-8 text-white">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-8 text-white flex space-x-4">
                  
                  <button
                    onClick={() => handleEdit(expense)} 
                    className="text-yellow-500 hover:text-yellow-300"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleUpdate(expense)} 
                    className="text-green-500 hover:text-green-300"
                  >
                    <FaSave size={20} />
                  </button>
                  <button
                    onClick={() => handleView(expense)} 
                    className="text-blue-500 hover:text-blue-300"
                  ></button>
                  <FaEye size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>




  );
};

export default ExpensesTable;
