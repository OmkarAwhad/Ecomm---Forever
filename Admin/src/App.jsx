/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
	return (
		<div className="w-full h-full bg-gray-50 min-h-screen" >
			<Navbar />
      <div className="w-full flex">
        <Sidebar/>
        <div className=" w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="orders" element={<Orders/>} />
          </Routes>
        </div>
      </div>
		</div>
	);
}

export default App;
