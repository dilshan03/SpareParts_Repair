import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching finance transactions...");
    axios.get('http://localhost:5000/api/finance/')
      .then(res => {
        console.log("API Response:", res.data);
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch transactions");
        setLoading(false);
      });
  }, []);

  // Group transactions by date and sum amounts
  const aggregateTransactionsByDate = (transactions) => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, totalAmount: 0 };
      }
      acc[date].totalAmount += transaction.amount;
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  // Calculate total revenue and expenses
  const calculateTotals = (transactions) => {
    let totalRevenue = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalRevenue += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      }
    });

    return { totalRevenue, totalExpenses };
  };

  const aggregatedData = aggregateTransactionsByDate(transactions);
  const { totalRevenue, totalExpenses } = calculateTotals(transactions);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading transactions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Existing Bar Chart - Daily Transaction Sum */}
          <Card className='p-4 mb-4' style={{ minHeight: '400px' }}>
            <h2 className='text-lg font-semibold'>Financial Overview</h2>
            {aggregatedData.length === 0 ? (
              <p className="text-gray-500">No transactions available.</p>
            ) : (
              <ResponsiveContainer width='100%' height={350}>
                <BarChart data={aggregatedData} margin={{ bottom: 40 }}>
                  <XAxis 
                    dataKey='date' 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                    interval={0} 
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='totalAmount' fill='#4F46E5' name="Total Transactions" />
                </BarChart>
                
              </ResponsiveContainer>
            )}
          </Card>

          

          {/* Total Revenue & Expense Boxes */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col items-center bg-green-100 border border-green-400 text-green-800 rounded-lg p-4 w-1/2 shadow-md">
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-2xl font-bold">LKR {totalRevenue.toFixed(2)}</p>
            </div>
<br></br>
            <div className="flex flex-col items-center bg-red-100 border border-red-400 text-red-800 rounded-lg p-4 w-1/2 shadow-md">
              <h3 className="text-lg font-semibold">Total Expenses</h3>
              <p className="text-2xl font-bold">LKR {totalExpenses.toFixed(2)}</p>
            </div>
          </div>


          {/* Debugging - Show raw aggregated data */}
          {/*<pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(aggregatedData, null, 2)}</pre>*/}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;