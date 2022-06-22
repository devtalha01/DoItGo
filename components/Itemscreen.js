// Aboutscreen.js
import React, { Component, useContext, useState } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../store/context";

function Itemscreen({ route, navigation }) {
    // Get the dynamic item from the params.
    const { item } = route.params;
    let { cart, setCart } = useContext(AppContext);
    let alreadyInCart = cart?.find((product) => product.id == item.node.id);
    let [quantity, setQuantity] = useState(
        alreadyInCart ? alreadyInCart.quantity : 1
    );
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text> Item ID: {item.node.id} </Text>
            <Image
                source={{ uri: item.node.thumbnail.url }}
                style={styles.image}
            />

            <Text style={styles.text}>{item.node.name}</Text>
            <Text style={styles.text}>$5</Text>
            <Text style={styles.text}>{item.node.description}</Text>
            <View style={styles.text}>
                <Text> Quantity</Text>
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={() =>
                            quantity > 1 ? setQuantity(quantity - 1) : null
                        }
                    >
                        <Text>-</Text>
                        <Text style={styles.text}>{quantity}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setQuantity(quantity + 1);
                        }}
                    >
                        <Text style={styles.quantity}>+</Text>
                    </TouchableOpacity>

                    <Button
                        onPress={() => {
                            alreadyInCart
                                ? setCart(
                                      cart.map((pd) =>
                                          pd.id === item.node.id
                                              ? { ...pd, quantity: quantity }
                                              : pd
                                      )
                                  )
                                : setCart([
                                      ...cart,
                                      {
                                          id: item.node.id,
                                          name: item.node.name,
                                          quantity: quantity,
                                      },
                                  ]);
                            navigation.navigate("Cart");
                        }}
                        title={alreadyInCart ? "Update cart" : "Add to cart"}
                    />
                </View>
            </View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    imageContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#000",
        padding: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    quantityContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
});

export default Itemscreen;
