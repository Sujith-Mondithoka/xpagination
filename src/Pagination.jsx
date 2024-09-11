import React, { useEffect, useState } from "react";
import "./Pagination.css";

const EmployeeDataTable = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setMembers(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

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

  const getVisibleMembers = () => {
    const startIndex = (currentPage + 1) * 10;
    const endIndex = Math.min(startIndex + 10, members.length);
    return members.slice(startIndex, endIndex);
  };

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
          {getVisibleMembers().map((employee) => (
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
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          Previous
        </button>
        <span> {currentPage} </span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
export default EmployeeDataTable;
