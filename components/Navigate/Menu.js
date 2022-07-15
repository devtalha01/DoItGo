import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Productsscren from "../Productsscreen";
import {
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
} from "@expo/vector-icons";
import DrawerItems from "./DrawerItems";
import Loginscreen from "../Login/Loginscreen";
import Cartscreen from "../Cartscreen";
import Complaintscreen from "../Complaintscreen";
import Itemscreen from "../Itemscreen";
import Commentsscreen from "../Commentsscreen";

const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerType="front"
                useLegacyImplementation={true}
                initialRouteName="Login"
                screenOptions={{
                    activeTintColor: "#e91e63",
                    itemStyle: { marginVertical: 10 },
                }}
            >
                <Drawer.Screen
                    name="Detail"
                    component={Itemscreen}
                    options={{
                        drawerItemStyle: { height: 0 },
                    }}
                />
                {DrawerItems.map((drawer) => (
                    <Drawer.Screen
                        key={drawer.name}
                        name={drawer.name}
                        options={{
                            drawerIcon: ({ focused }) =>
                                drawer.iconType === "Material" ? (
                                    <MaterialCommunityIcons
                                        name={drawer.iconName}
                                        size={24}
                                        color={focused ? "#e91e63" : "black"}
                                    />
                                ) : drawer.iconType === "Feather" ? (
                                    <Feather
                                        name={drawer.iconName}
                                        size={24}
                                        color={focused ? "#e91e63" : "black"}
                                    />
                                ) : (
                                    <FontAwesome5
                                        name={drawer.iconName}
                                        size={24}
                                        color={focused ? "#e91e63" : "black"}
                                    />
                                ),
                        }}
                        component={
                            drawer.name === "Complaint"
                                ? Complaintscreen
                                : drawer.name === "Cart"
                                ? Cartscreen
                                : drawer.name === "Products"
                                ? Productsscren
                                : drawer.name === "FeedBack"
                                ? Commentsscreen
                                : drawer.name === "Login"
                                ? Loginscreen
                                : Loginscreen
                        }
                    />
                ))}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
