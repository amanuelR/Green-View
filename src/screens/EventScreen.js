import React, { useState, useEffect, onSnapshot } from 'react'
import { View, Text } from 'react-native'
import PopUp from '../components/PopUp'
export default function EventScreen({ route, navigation }) {
    console.log("Park Event", route)
    return (
    <View>
        <PopUp
            name={"Helllo"}
            description="Trash Clean Up"
            imageUrl={require("/Users/amanuelreda/Desktop/GreenView/GreenView/assets/ChillaLogo.png")}
        />
        <PopUp
            name={"Helllo"}
            description="Trash Clean Up"
            imageUrl={require("/Users/amanuelreda/Desktop/GreenView/GreenView/assets/ChillaLogo.png")}
        />
        <PopUp
            name={"Helllo"}
            description="Trash Clean Up"
            imageUrl={require("/Users/amanuelreda/Desktop/GreenView/GreenView/assets/ChillaLogo.png")}
        />
        <PopUp
            name={"Helllo"}
            description="Trash Clean Up"
            imageUrl={require("/Users/amanuelreda/Desktop/GreenView/GreenView/assets/ChillaLogo.png")}
        />
    </View>
  )
}