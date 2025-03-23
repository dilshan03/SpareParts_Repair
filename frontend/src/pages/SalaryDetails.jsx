import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.jpg'; 

export default function SalaryDetails() {
    
    const [employees, setEmployees] = useState([]);
    const [employeeLoad, setEmployeesLoad] = useState(false);
    const navigate = useNavigate();
        
    useEffect(() => {
        if (!employeeLoad) {
            const token = localStorage.getItem("token");

            axios.get("http://localhost:5000/api/salary", { headers: { Authorization: "Bearer " + token } })
                .then((res) => {
                    console.log(res.data);
                    setEmployees(res.data);
                    setEmployeesLoad(true);
                })
                .catch((er) => {
                    console.log(er);
                });
        }  
    }, [employeeLoad]);

    // Function to generate PDF
    const downloadPDF = () => {

        const doc = new jsPDF();
        const img = new Image();
        img.src = logo;

        img.onload = function () {
            // Add company logo
            doc.addImage(img, 'JPG', 15, 10, 30, 30); // Adjust position & size

            // Add company details
            doc.setFontSize(16);
            doc.text("Cosmo Exports Lanka (PVT) LTD", 60, 20);
            doc.setFontSize(10);
            doc.text("496/1, Naduhena, Meegoda, Sri Lanka", 60, 27);
            doc.text("Phone: +94 77 086 4011  |  +94 11 275 2373", 60, 33);
            doc.text("Email: cosmoexportslanka@gmail.com", 60, 39);

            // Report title
            doc.setFontSize(14);
            doc.text("Salary Details Report", 14, 55);
            doc.setFontSize(12);

            // Table Headers
            const headers = [
                ["Employee ID", "Basic Salary", "Double OT Hours", "OT Hours", "OT Amount", "EPF 8%", "EPF 12%", "ETF 3%", "Net Salary"]
            ];

            // Table Data
            const data = employees.map(emp => [
                emp.employeeId,
                `LKR ${emp.basicSalary}`,
                emp.doubleOtHours,
                emp.otHours,
                `LKR ${emp.otPay}`,
                `LKR ${emp.epfEmployee}`,
                `LKR ${emp.epfEmployer}`,
                `LKR ${emp.etfEmployer}`,
                `LKR ${emp.netSalary}`
            ]);

            // Add Table
            autoTable(doc, {
                head: headers,
                body: data,
                startY: 65,
                theme: "striped",
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] }
            });

            // Footer - Authorized Signature
            doc.text("Authorized Signature:", 150, doc.internal.pageSize.height - 30);
            doc.line(150, doc.internal.pageSize.height - 28, 200, doc.internal.pageSize.height - 28); // Signature line

            // Save PDF
            doc.save("Salary_Details_Report.pdf");
        };

        
    };

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex space-x-4 mt-4">
                <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => navigate(`/admin/employees/salary/new`)}
                >
                    Generate Salary
                </button>

                <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};
