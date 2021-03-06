import { View, Text } from "react-native";
import React, { FC, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import OnboardingScreen from "../screens/OnboardingScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import DynamicPage from "../components/DynamicPage";

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const items = ["Mateo", "Marcos", "Lucas", "Juan"];

const Custom: FC<any> = ({ route }: any) => {
  useEffect(() => {
    console.log(route);
  }, []);
  return <Text>{route.name || "There is not title"}</Text>;
};

const MainStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen name="Main" component={OnboardingScreen} />

      {items.map((title, index) => (
        <Drawer.Screen key={index} name={title} component={DynamicPage} />
      ))}
    </Drawer.Navigator>
  );
};

export default MainStack;
