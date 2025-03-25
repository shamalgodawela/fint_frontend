import React from 'react';
import ExepenseSidebar from '../Components/ExepenseSidebar';



// Apply the Times New Roman font style using Tailwind CSS
const AAddExps = () => {
    return (
        <div className="bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full">
            <ExepenseSidebar />
          
       
  <div className="form_wrapper bg-white w-full max-w-md p-6 mx-auto my-8 shadow-md rounded-lg">
    <div className="title_container text-center mb-6">
      <h2 className="text-xl font-semibold">Add Expenses</h2>
    </div>
    <div className="row">
      <div>
        <form >
          <input
            type="text"
            name="name"
            placeholder="Name"
            
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="code"
            placeholder="Code"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
           
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          
          <input
            type="submit"
            value="Register"
            className="w-full p-2 bg-black text-white font-semibold rounded-md cursor-pointer hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </form>
      </div>
    </div>
  </div>
 


        </div>
       
    );
};

export default AAddExps;