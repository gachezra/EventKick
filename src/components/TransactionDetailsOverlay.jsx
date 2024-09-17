import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTransactionRoute } from '../utils/APIRoutes';
import { CSVLink } from "react-csv";

const TransactionDetailsOverlay = ({ userId, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${getTransactionRoute}/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions. Please try again later.");
      }
    };

    fetchTransactions();
  }, [userId]);

  const transactionColumns = [
    { label: "Event Name", key: "name" },
    { label: "Transaction ID", key: "id" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
    { label: "Status", key: "paymentStatus" },
    { label: "Time", key: "createdAt" },
  ];

  const transactionData = transactions.map(transaction => ({
    name: transaction.name,
    id: transaction.checkoutRequestId,
    phoneNumber: transaction.phoneNumber,
    amount: transaction.amount,
    date: transaction.date,
    paymentStatus: transaction.paymentStatus,
    createdAt: transaction.createdAt,
  }));

  return (
    <div className="fixed top-0 left-0 w-full h-full p-6 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="p-6 bg-[#131324] rounded-lg shadow-md md:w-[70%] h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
        {error ? (
          <>
            <div className="text-red-500 text-center my-4">{error}</div>
            <button
              className='my-3 px-4 py-1 bg-transparent border-2 border-indigo-600 rounded-full text-indigo-600 hover:bg-opacity-10 hover:bg-gray-300'
              onClick={() => {
                onClose()
              }}
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {transactionColumns.map(column => (
                      <th key={column.key} className="px-4 py-2 text-left">{column.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map(transaction => (
                    <tr key={transaction.id}>
                      {transactionColumns.map(column => (
                        <td key={column.key} className="px-4 py-2">{transaction[column.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex mt-4 justify-between">
            <button
                className='my-3 px-4 py-1 bg-transparent border-2 border-indigo-600 rounded-full text-indigo-600 hover:bg-opacity-10 hover:bg-gray-300'
                onClick={() => {
                onClose()
                }}
            >
                Close
            </button>
            <CSVLink data={transactionData} filename="transactions.csv" className="text-indigo-600 hover:text-indigo-500">
                Download as CSV
            </CSVLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsOverlay;