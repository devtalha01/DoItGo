import React from "react";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
const endpoint = "https://api.spacex.land/graphql/";
const PRODUCTS_QUERY = `
{
    missions {
        id
        name
      }
}
`;

function Axiosscreen() {
    const { data, isLoading, error } = useQuery("missions", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: PRODUCTS_QUERY,
            },
        }).then((response) => response.data.data);
    });
    return (
        <FlatList
            data={data.missions}
            ListHeaderComponent={() => (
                <Text style={styles.title}>Request to an API using Axios</Text>
            )}
            renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                    <Text>{item.id}</Text>
                    <Text>{"\u2022"}</Text>
                    <Text style={{ flex: 1, paddingLeft: 5 }}>
                        Name = {item.name}
                    </Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    data: {
        backgroundColor: "grey",
    },
    title: {
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 15,
        padding: 5,
        backgroundColor: "yellow",
    },
});
export default Axiosscreen;
