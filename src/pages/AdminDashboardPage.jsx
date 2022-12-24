import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const AdminDashboardPage = () => {
  React.useEffect(() => {
    console.log('it works!')
  })
  return (
    <>
    <div className=" w-full h-screen flex flex-col flex-start text-7xl min-h-full text-white">
      <Navbar />
      <Table />
    </div>
    </>
  );
};

export default AdminDashboardPage;
