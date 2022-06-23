// Homescreen.js
import React, { useContext, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { AuthContext, AuthProvider } from "../components/Login/context";
const queryClient = new QueryClient();

function Homescreen({ navigation }) {
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "grey",
            }}
        >
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />

            {/*<QueryClientProvider client={queryClient}>
                <Axiosscreen />
            </QueryClientProvider> */}
        </View>
    );
}

const styles = StyleSheet.create({
    welcome: { fontSize: 18, marginBottom: 8 },
});
export default Homescreen;

//Cherche à savoir pourquoi le code fonctionne en Web, mais pas sur mobile quand je passe par un Graphql API local!
/*
<ApolloProvider client={client}>
<CustoomDatascreen />
</ApolloProvider>
*/
