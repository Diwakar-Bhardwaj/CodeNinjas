import React, { createContext, useContext, useState, useEffect } from "react";

// Create Transactions Context
const CartContext = createContext();

// Transactions Provider Component
export const CartProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    }
  }, []);

  // Save transactions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (product, type) => {
    // type: 'lend' or 'borrow'
    const transaction = {
      ...product,
      transactionType: type,
      transactionId: Date.now() + Math.random(),
      addedAt: new Date().toISOString(),
    };
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (transactionId) => {
    setTransactions(transactions.filter((t) => t.transactionId !== transactionId));
  };

  const updateTransaction = (transactionId, updates) => {
    setTransactions(
      transactions.map((t) =>
        t.transactionId === transactionId ? { ...t, ...updates } : t
      )
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const getLendCount = () => {
    return transactions.filter((t) => t.transactionType === "lend").length;
  };

  const getBorrowCount = () => {
    return transactions.filter((t) => t.transactionType === "borrow").length;
  };

  const getTotalCount = () => transactions.length;

  return (
    <CartContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        updateTransaction,
        clearTransactions,
        getLendCount,
        getBorrowCount,
        getTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Transactions Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
