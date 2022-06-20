// Aboutscreen.js
import React, { Component } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";

function Itemscreen({ route, navigation }) {
    // Get the dynamic item from the params.
    const { item } = route.params;
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
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems:'center',
        justifyContent: "center",
    },
    imageContainer: {
        //textAlign:'center',
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
});

export default Itemscreen;
