import React, { useState, useContext } from "react";
import { AppContext } from "../store/context";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import UserInfoscreen from "../components/Login/UserInfoscreen";

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

const handleEmpty = () => {
    return <Text>No data present!</Text>;
};

const Item = ({ item, title, onPress, navigation }) => (
    <View
        style={{
            flex: 1,
            justifyContent: "flex-end",
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 2,
        }}
    >
        <TouchableOpacity
            key={item.node.id}
            onPress={() => navigation.navigate("Detail", { item })}
        >
            <Image
                source={{ uri: item.node.thumbnail.url }}
                style={{ height: 100, width: 130 }}
            />
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                }}
            >
                {item.node.name}
            </Text>
        </TouchableOpacity>
        <Text>$10</Text>
        <Button title={title} onPress={onPress}></Button>
    </View>
);

const Productsscren = ({ navigation }) => {
    const { products, loading, cart, setCart } = useContext(AppContext);
    const goTo = () => navigation.navigate("Detail");
    let [quantity, setQuantity] = useState(1);
    let alreadyInCart = false;
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                title={
                    item.node.id === selectedId &&
                    cart?.find((element) => element.id === selectedId)
                        ? "Added to cart"
                        : "Add to cart "
                }
                onPress={() => {
                    setSelectedId(item.node.id);
                    cart.find((element) => element.id === item.node.id)
                        ? () => null
                        : setCart([
                              ...cart,
                              {
                                  id: item.node.id,
                                  name: item.node.name,
                                  quantity: 1,
                              },
                          ]);
                }}
                navigation={navigation}
            />
        );
    };

    return (
        <View style={styles.container}>
            <UserInfoscreen navigation={navigation} />
            {loading ? (
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="grey"
                    size="large"
                />
            ) : (
                <SafeAreaView>
                    <Button
                        title="See my cart"
                        onPress={() => navigation.navigate("Cart")}
                    ></Button>
                    <FlatList
                        data={products.products.edges}
                        ListEmptyComponent={handleEmpty}
                        ListHeaderComponent={() => (
                            <Text style={styles.title}>Products</Text>
                        )}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item) => item.node.id} // Extract keys for each item in the array
                    />
                </SafeAreaView>
            )}
        </View>
    );
};

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
    quantity: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "yellow",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
});
export default Productsscren;
