import React from "react";

export default function Login() {
  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] font-roboto width-full h-screen ">
      <h1 className="text-3xl font-bold text-white text-center py-8">Welcome to AI Fintech Finance Application</h1>
      <p className="text-1xl text-white text-center font-times">Please Login to The System</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mt-20 bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <i className="fa fa-key text-6xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"></i>
          </div>
          <div className="text-center text-white text-2xl font-bold my-4">
            User Login
          </div>

          <div>
            <form>
              <div className="mb-10">
                <label className="block text-xs font-bold text-gray-400 mb-2">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-900 border-b-2 border-blue-500 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-10">
                <label className="block text-xs font-bold text-gray-400 mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full p-2 bg-gray-900 border-b-2 border-blue-500 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500"> {/* Error Message */} </div>
                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition duration-300 align-items-center"
                  ><a href="/Dashboard">LOGIN</a>
                    
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
