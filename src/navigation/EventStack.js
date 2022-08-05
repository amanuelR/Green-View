import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import EventScreen from "../screens/EventScreen";
const Stack = createStackNavigator();

export default function EventStack({navigattion}) {
return (
    <Stack.Navigator>
    <Stack.Screen
      name="Events"
      component={EventScreen}
    />
  </Stack.Navigator>
  );
}