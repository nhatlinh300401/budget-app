import { View, Text, Button, FlatList, StyleSheet, Dimensions, Alert } from "react-native";
import { useBudget } from "../context/BudgetContext";
import { TouchableOpacity } from "react-native";

import { PieChart } from "react-native-chart-kit";

export default function HomeScreen({ navigation }: any) {
  const { transactions, deleteTransaction } = useBudget();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  const categoryTotals: { [key: string]: number } = {};

  expenseTransactions.forEach((t) => {
    if (categoryTotals[t.category]) {
        categoryTotals[t.category] += t.amount;
    } else {
        categoryTotals[t.category] = t.amount;
    }
  });

  const chartData = Object.keys(categoryTotals).map((key, index) => ({
    name: key,
    amount: categoryTotals[key],
    color: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"][index % 4],
    legendFontColor: "#000",
    legendFontSize: 12,
  }));

  const screenWidth = Dimensions.get("window").width;

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <View style={styles.summary}>
        <Text style={styles.income}>Income: ${income}</Text>
        <Text style={styles.expense}>Expense: ${expense}</Text>
        <Text style={styles.balance}>Balance: ${balance}</Text>
      </View>

      <FlatList
        data={[...transactions].reverse()}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No transactions yet</Text>}
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.item}
            >
                <Text style={styles.category}>{item.category}</Text>
                <Text
                style={[
                    styles.amount,
                    { color: item.type === "expense" ? "red" : "green" },
                ]}
                >
                {item.type === "expense" ? "-" : "+"}${item.amount}
                </Text>
            </TouchableOpacity>
        )}
      />

      {chartData.length > 0 && (
        <PieChart
            data={chartData.map((item) => ({
            name: item.name,
            population: item.amount,
            color: item.color,
            legendFontColor: item.legendFontColor,
            legendFontSize: item.legendFontSize,
            }))}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: () => "#000",
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
        />
        )}

      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("AddTransaction")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  income: {
    color: "green",
    fontSize: 16,
    marginBottom: 5,
  },
  expense: {
    color: "red",
    fontSize: 16,
    marginBottom: 5,
  },
  balance: {
    fontSize: 18,
    fontWeight: "bold",
  },
});