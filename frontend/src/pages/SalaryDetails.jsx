import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SalaryDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [otHours, setOtHours] = useState(0);
    const [doubleOtHours, setDoubleOtHours] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees", {
                    headers: {
                      Authorization: `Bearer ${token}`, // Replace with actual token
                    },
                    withCredentials: true, // If using cookies
                  });
                  


                setEmployees(response.data.user);
                
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOtHours(0);
        setDoubleOtHours(0);
        setSelectedEmployee(null);
    };

    const handleGenerateSalary = async () => {
        if (!selectedEmployee) return;

        try {
            await axios.post("http://localhost:5000/api/salary", {
                employeeId: selectedEmployee.id,
                otHours,
                doubleOtHours,
            });
            alert("Salary generated successfully!");
            handleCloseModal();
        } catch (error) {
            console.error("Error generating salary:", error);
            alert("Failed to generate salary.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Salary Details</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-2">Employee ID</th>
                            <th className="p-2">First Name</th>
                            <th className="p-2">Last Name</th>
                            <th className="p-2">Basic Salary</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id} className="border-b text-center">
                                <td className="p-2">{emp.id}</td>
                                <td className="p-2">{emp.firstName}</td>
                                <td className="p-2">{emp.lastName}</td>
                                <td className="p-2">LKR {emp.salary}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleOpenModal(emp)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Generate Salary
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
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
            )}
        </div>
    );
};

export default SalaryDetails;
