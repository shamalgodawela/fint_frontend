import React, { useState } from 'react';
import ExepenseSidebar from '../Components/ExepenseSidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AAddExps = () => {


  const [formdata, setFormdata] = useState({
    name: '',
    description: '',
    category: '', 
    amount: '',
    date: '',
    responsiblePerson: '',
    notes: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/Expenses/createExpenses`, formdata);
      console.log(response.data);
      toast.success('Expenses added successfully');
      setFormdata({
        name: '',
        description: '',
        category: '', 
        amount: '',
        date: '',
        responsiblePerson: '',
        notes: '',
        phone: '', 
      });
    } catch (error) {
      console.error('Error adding Expenses:', error);
      if (error.response && error.response.status === 400) {
        toast.error('Failed to add expenses');
      } else {
        toast.error('Failed to add expenses');
      }
    }
  };




    return (
        <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
            <ExepenseSidebar />
          
       
  <div className="form_wrapper bg-black bg-opacity-40 w-full max-w-md p-6 mx-auto my-8 shadow-md rounded-lg">
    <div className="title_container text-center mb-6">
      <h2 className="text-xl font-extrabold text-white">Add Expenses</h2>
    </div>
    <div className="row">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Pay To"
            
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            value={formdata.description}
            onChange={handleChange}
            name="description"
            placeholder="description"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="category"
            value={formdata.category}
            onChange={handleChange}
            placeholder="category"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="number"
            name="amount"
            value={formdata.amount}
            onChange={handleChange}
            placeholder="amount"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={handleChange}
            placeholder="date"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="responsiblePerson"
            value={formdata.responsiblePerson}
            onChange={handleChange}
            placeholder="responsiblePerson"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="notes"
            value={formdata.notes}
            onChange={handleChange}
            placeholder="notes"
            
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="phone"
            value={formdata.phone}
            onChange={handleChange}
            placeholder="Contact Number"
            
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          
          <input
            type="submit"
            value="Add Expenses"
            className="w-full p-2 bg-blue-900 text-white font-semibold rounded-md cursor-pointer hover:bg-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </form>
      </div>
    </div>
  </div>
  <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar
        closeButton={false}
        toastClassName="custom-toast"  
      />
    </div>
 


      
       
    );
};

export default AAddExps;