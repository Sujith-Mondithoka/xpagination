import React, { useEffect, useState } from "react";
import "./Pagination.css";

const EmployeeDataTable = () => {
  const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async() => {
        try{
            const apiData = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const actualData = await apiData.json();
            // console.log(actualData);
            setData(actualData);
        }catch(err){
            console.log("failed to fetch data", err);
            alert("failed to fetch data");
        }
    }

    const updateFilterData = () => {
        const updateData = data.filter((newData) => {
            if (newData.id > page * 10 && newData.id <= (page + 1) * 10) {
                return newData;
            }
            return false; 
        });
        setFilteredData(updateData);
    }
    
    const decrement = () => {
        if(page >= 1){
            setPage(page - 1);
        }
    }

    const increment = () => {
        if(data[(page+1)*10]){
            setPage(page + 1);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        updateFilterData();
    }, [data, page]);

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
          {filteredData.map((employee) => (
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
        <button onClick={decrement}>
          Previous
        </button>
        <span> {page + 1} </span>
        <button onClick={increment}>
          Next
        </button>
      </div>
    </div>
  );
};
export default EmployeeDataTable;
