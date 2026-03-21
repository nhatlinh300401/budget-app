import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddTransactionScreen from "./src/screens/AddTransactionScreen";

import { BudgetProvider } from "./src/context/BudgetContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BudgetProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransactionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BudgetProvider>
  );
}