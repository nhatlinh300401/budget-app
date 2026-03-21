import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useBudget } from "../context/BudgetContext";

export default function AddTransactionScreen({ navigation }: any) {
  const { addTransaction } = useBudget();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSave = () => {
    if (!amount || !category) return;

    addTransaction({
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
      type,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TextInput
        placeholder="Category (e.g. Food)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <View style={styles.row}>
        <Button title="Expense" onPress={() => setType("expense")} />
        <Button title="Income" onPress={() => setType("income")} />
      </View>

      <Button title="Save Transaction" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});