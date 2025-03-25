import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import ExpensesDash from "./pages/ExpensesDash";
import AAddExps from "./pages/AAddExps";
import ExpensesTable from "./pages/ExpensesTable.jsx";





export default function App() {
  return (
    <BrowserRouter>
   
      <Routes>


        <Route path="/" element={<Home/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Dashboard" element={<Welcome/>}></Route>
        <Route path="/Dashboard-Expenses" element={<ExpensesDash/>}></Route>
        <Route path="/Add-Expenses" element={<AAddExps/>}></Route>
        <Route path="/Get-all-Expens" element={<ExpensesTable/>}></Route>
       
  
        
      </Routes>
 
    </BrowserRouter>
  );
}
