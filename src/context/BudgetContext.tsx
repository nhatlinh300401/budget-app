import React, { createContext, useState, useContext, useEffect } from "react";
import { Transaction } from "../types/Transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BudgetContextType = {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (updated: Transaction) => void;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 🔹 Load data when app starts
  useEffect(() => {
    loadTransactions();
  }, []);

  // 🔹 Save whenever transactions change
  useEffect(() => {
    saveTransactions();
  }, [transactions]);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem("transactions");
      if (data) {
        setTransactions(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error loading transactions", error);
    }
  };

  const saveTransactions = async () => {
    try {
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.log("Error saving transactions", error);
    }
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <BudgetContext.Provider value={{ transactions, addTransaction, deleteTransaction, updateTransaction }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used inside BudgetProvider");
  }
  return context;
};