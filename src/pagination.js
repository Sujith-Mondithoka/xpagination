import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./xpagination.css";

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?page=${currentPage}&limit=${itemsPerPage}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => alert('failed to fetch data'));
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Employee Data Table
      </h1>
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pageButton">
        <button onClick={handlePrevious}>Previous</button>
        <span className="pageNumber"> {currentPage} </span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PaginationComponent;
