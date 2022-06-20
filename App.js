import * as React from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Homescreen from "./components/Homescreen";
import Itemscreen from "./components/Itemscreen";
import Productsscren from "./components/Productsscreen";
import { CustoomDatascreen } from "./components/CustomDatascreen";
import Axiosscreen from "./components/Axiosscreen";

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
const client = new ApolloClient({
    uri: "https://demo.saleor.io/graphql/",
    cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

function MyStack() {
    return (
        <ApolloProvider client={client}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Homescreen}
                    screenOptions={{
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: "tomato" },
                    }}
                />
                <Stack.Screen name="Detail" component={Itemscreen} />
                <Stack.Screen name="Products" component={Productsscren} />
            </Stack.Navigator>
        </ApolloProvider>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
