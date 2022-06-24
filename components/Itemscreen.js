// Aboutscreen.js
import React, { Component, useContext, useState } from "react";
import {
    Button,
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../store/context";

function Itemscreen({ route, navigation }) {
    // Get the dynamic item from the params.
    const styleShared = require("./../style");
    const { item } = route.params;
    let { cart, setCart } = useContext(AppContext);
    let alreadyInCart = cart?.find((product) => product.id == item.node.id);
    let [quantity, setQuantity] = useState(
        alreadyInCart ? alreadyInCart.quantity : 1
    );
    return (
        <ImageBackground source={require("./../assets/gradient-back.jpeg")}>
            <View>
                {/*<Text> Item ID: {item.node.id} </Text>*/}
                <Text
                    style={[
                        styleShared.buttonAltText,
                        {
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "center",
                        },
                    ]}
                >
                    Product detail :
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.node.thumbnail.url }}
                        style={styles.image}
                    />
                    <Text style={styles.text}>{item.node.name}</Text>
                    <Text style={styles.text}>Price : $5</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <Text style={[styles.text, { marginLeft: 80 }]}>
                        Quantity
                    </Text>
                    <View style={[styles.quantity, { paddingRight: 90 }]}>
                        <TouchableOpacity
                            onPress={() =>
                                quantity > 1 ? setQuantity(quantity - 1) : null
                            }
                        >
                            <Text style={styles.text}>-</Text>
                            <Text style={styles.text}>{quantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setQuantity(quantity + 1);
                            }}
                        >
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styleShared.button, { marginLeft: 50 }]}
                    onPress={() => {
                        alreadyInCart
                            ? setCart(
                                  cart.map((pd) =>
                                      pd.id === item.node.id
                                          ? {
                                                ...pd,
                                                quantity: quantity,
                                            }
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
                >
                    <Text style={styleShared.buttonAltText}>
                        {alreadyInCart ? "Update cart" : "Add to cart"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styleShared.button, { marginLeft: 50 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styleShared.buttonAltText}>Go back</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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
        marginLeft: 5,
        justifyContent: "space-between",
    },
    quantityContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    buttonContainer: {
        width: "100%",
        padding: 10,
    },
    quantity: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Itemscreen;
