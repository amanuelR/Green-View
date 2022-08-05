import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens

// Modals
import MapModal from "../modals/MapModal";
//import OrganizationModal from "../modals/OrganizationModal";
import MapScreen from "../screens/MapScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileStack from "./ProfileStack";
import EventStack from "./EventStack";
const Stack = createStackNavigator();

export default function MapStack(navigation) {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name="MapScreen"
                    component={MapScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Group>
                 <Stack.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }} />
            </Stack.Group>
            <Stack.Group>
                 <Stack.Screen name="EventStack" component={EventStack} options={{ headerShown: false }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
