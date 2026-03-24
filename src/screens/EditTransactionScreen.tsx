import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useBudget } from "../context/BudgetContext";

export default function EditTransactionScreen({ route, navigation }: any) {
  const { transaction } = route.params;
  const { updateTransaction } = useBudget();

  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [type, setType] = useState(transaction.type);

  const handleSave = () => {
    updateTransaction({
      ...transaction,
      amount: Number(amount),
      category,
      type,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Edit Transaction</Text>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Button title="Expense" onPress={() => setType("expense")} />
      <Button title="Income" onPress={() => setType("income")} />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});