import React from 'react';
import SideBar from '../Components/SideBar';



const Welcome = () => {
  return (
    <div className='bg-gradient-to-r from-[#434570] to-[#232439] h-screen w-full'>
      <SideBar/>

      <h1 className="text-center text-[25px] text-white font-extrabold" style={{ fontFamily: 'Times New Roman' }}>Welcome To <span className="text-[25px] text-black" style={{ fontFamily: 'Times New Roman' }}> FinTech </span> Dashboard</h1>


      
    
      
      
    </div>
  );
};

export default Welcome;
