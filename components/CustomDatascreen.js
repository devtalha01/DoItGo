import react from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const GET_ALL_MProducts = gql`
    query getMProducts {
        products {
            id
            name
            vendor
        }
    }
`;

export const CustoomDatascreen = () => {
    const { loading, error, data } = useQuery(GET_ALL_MProducts);
    if (loading) return "Loading ...";
    if (error) return `Error! ${error.message}`;
    return (
        <View>
            <FlatList
                data={data.products}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.id}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.vendor}</Text>
                    </View>
                )}
            />
        </View>
    );
};
