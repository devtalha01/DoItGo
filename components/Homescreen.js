// Homescreen.js
import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import Axiosscreen from "./Axiosscreen";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function Homescreen({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button
                title="Show products"
                onPress={() => navigation.navigate("Products")}
            />

            <QueryClientProvider client={queryClient}>
                <Axiosscreen />
            </QueryClientProvider>
        </View>
    );
}

export default Homescreen;

//Cherche à savoir pourquoi le code fonctionne en Web, mais pas sur mobile quand je passe par un Graphql API local!
/*
<ApolloProvider client={client}>
<CustoomDatascreen />
</ApolloProvider>
*/
