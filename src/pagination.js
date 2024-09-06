import React, { useEffect, useState } from "react";
import "./xpagination.css";

export default function EmployeeDataTable() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        setError(error.message);
        alert("Failed to fetch data"); // Alert message on fetch failure
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = employeeData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(employeeData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <p>{error}</p>; // Display error message if there is any
  }

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(employeeData.length / rowsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
