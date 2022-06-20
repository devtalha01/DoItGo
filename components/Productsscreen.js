import React from "react";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
    query getProducts {
        products(first: 20, channel: "default-channel") {
            edges {
                node {
                    id
                    name
                    description
                    thumbnail {
                        url
                    }
                }
            }
        }
    }
`;
function Productsscren({ navigation }) {
    const { loading, data } = useQuery(GET_PRODUCTS);
    const goTo = () => navigation.navigate("Detail");
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading</Text>
            ) : (
                <FlatList
                    data={data.products.edges}
                    ListHeaderComponent={() => (
                        <Text style={styles.title}>Products</Text>
                    )}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                justifyContent: "space-between",
                                padding: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Detail", { item })
                                }
                            >
                                <Image
                                    source={{ uri: item.node.thumbnail.url }}
                                    style={{ height: 100, width: 100 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        width: "60%",
                                    }}
                                >
                                    {item.node.name}
                                </Text>
                            </TouchableOpacity>
                            <Text>$10</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item) => item.node.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontfamily: "lucida grande",
    },
    title: {
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 15,
        padding: 5,
        backgroundColor: "yellow",
    },
    product: {
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Productsscren;
