import * as React from "react";
import { Animated, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./components/Homescreen";
import Itemscreen from "./components/Itemscreen";
import Productsscren from "./components/Productsscreen";
import Cartscreen from "./components/Cartscreen";
import { AppContextProvider } from "./store/context";
import { QueryClient, QueryClientProvider } from "react-query";
import Loginscreen from "./components/Login/Loginscreen";
import Registerscreen from "./components/Login/Registerscreen";
import { AuthContext, AuthProvider } from "./components/Login/context";
import UserInfoscreen from "./components/Login/UserInfoscreen";
const forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

const Stack = createStackNavigator();
const queryClient = new QueryClient();

function MyStack() {
    const Navigation = () => {
        const { userInfo } = useContext(AuthContext);
    };
    return (
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <AuthProvider>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Home"
                            component={Homescreen}
                            options={{ headerShown: false }}
                            screenOptions={{
                                headerTintColor: "white",
                                headerStyle: { backgroundColor: "tomato" },
                            }}
                        />
                        <Stack.Screen name="Detail" component={Itemscreen} />
                        <Stack.Screen
                            name="Products"
                            component={Productsscren}
                        />
                        <Stack.Screen name="Cart" component={Cartscreen} />
                        <Stack.Screen
                            name="Login"
                            options={{ headerShown: false }}
                            component={Loginscreen}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Registerscreen}
                        />
                        <Stack.Screen
                            name="UserInfo"
                            initialParams={{ otherParam: "App" }}
                            component={UserInfoscreen}
                        />
                    </Stack.Navigator>
                </AuthProvider>
            </AppContextProvider>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
