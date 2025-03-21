import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SalaryDetails() {
    
    const [employees, setEmployees] = useState([]);
    const [employeeLoad,setEmployeesLoad] = useState(false);
    const navigate = useNavigate();
        
    useEffect(() => {
            
        if(!employeeLoad){
            
    
          const token = localStorage.getItem("token");
    
          axios.get( "http://Localhost:5000/api/salary", { headers: { Authorization: "Bearer " + token } })
    
            .then((res) => {
              console.log(res.data);
              setEmployees(res.data);
              setEmployeesLoad(true);
            })
            .catch((er) => {
              console.log(er);
            });
        }  
    
    },[employeeLoad]);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Salary Details</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-2">Employee ID</th>
                            <th className="p-2">Basic Salary</th>
                            <th className="p-2">Double OT Hours</th>
                            <th className="p-2">OT Hours</th>
                            <th className="p-2">OT Amount</th>
                            <th className="p-2">EPF 8%</th>
                            <th className="p-2">EPF 12%</th>
                            <th className="p-2">ETF 3%</th>
                            <th className="p-2">Net Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.employeeId} className="border-b text-center">
                                <td className="p-2">{emp.employeeId}</td>
                                <td className="p-2">{emp.basicSalary}</td>
                                <td className="p-2">{emp.doubleOtHours}</td>
                                <td className="p-2">{emp.otHours}</td>
                                <td className="p-2">{emp.otPay}</td>
                                <td className="p-2">{emp.epfEmployee}</td>
                                <td className="p-2">{emp.epfEmployer}</td>
                                <td className="p-2">{emp.etfEmployer}</td>
                                <td className="p-2">LKR {emp.netSalary}</td>
                                <td className="p-2">
                                    {/*<button
                                        onClick={() => handleOpenModal(emp)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Generate Salary
                                    </button>*/}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal 
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Generate Salary</h2>
                        <p>Employee: {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
                        <p>Basic Salary: LKR {selectedEmployee.salary}</p>
                        <label className="block mt-2">OT Hours:</label>
                        <input
                            type="number"
                            value={otHours}
                            onChange={(e) => setOtHours(Number(e.target.value))}
                            className="w-full border rounded p-2"
                        />
                        <label className="block mt-2">Double OT Hours:</label>
                        <input
                            type="number"
                            value={doubleOtHours}
                            onChange={(e) => setDoubleOtHours(Number(e.target.value))}
                            className="w-full border rounded p-2"
                        />
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleCloseModal} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                            <button onClick={handleGenerateSalary} className="px-4 py-2 bg-blue-500 text-white rounded">Generate</button>
                        </div>
                    </div>
                </div>
            )}*/}

            <button
                className="bg-green-500 text-white px-4 py-1 rounded m-2"
                onClick={() => navigate(`/admin/employees/salary/new`)}
            >Genarate Salary</button>
                    
                  
        </div>
    );
};


