import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './xpagination.css';

const Xpagination = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        setUserData(response.data);
      } catch (error) {
        alert('Failed to fetch data');
        console.log(error);
      }
    };
    fetchEmpData();
  }, []);

  const handleNextPage = () => {
    if (currentPage * usersPerPage < userData.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="table-container">
        <h1 style={{textAlign:'center'}}>Employee Data Table</h1>
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
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px',background:'rgb(0, 156, 34)',padding:'15px',borderRadius:'5px' ,color:'white' }}>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage * usersPerPage >= userData.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Xpagination;
