import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { AppContext } from "../store/context";

const emptyList = () => {
    return (
        <View stye={{ alignItem: "center" }}>
            <Text style={styles.text}>Cart is empty!</Text>
        </View>
    );
};
function Cartscreen({ navigation }) {
    const { cart, removeItem, loading, totalAmount } = useContext(AppContext);
    const styleShared = require("./../style");
    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="grey"
                    size="large"
                />
            )}
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={emptyList}
                renderItem={({ item }) => {
                    return (
                        <View key={item.id} style={styles.cart}>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                                {item.name}
                            </Text>
                            <Text style={styles.text}>
                                Quantity : {item.quantity}
                            </Text>
                            <Text>
                                Price : {item.price} {item.currency}
                            </Text>
                            <Button
                                title="Remove"
                                onPress={() => removeItem(item.id)}
                            />
                        </View>
                    );
                }}
            />

            <Text style={{ fontSize: 20, fontFamily: "serif" }}>
                Total amount : {totalAmount()}{" "}
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    text: {
        fontSize: 15,
        color: "#000",
    },
    cart: {
        padding: 10,
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 20,
        margin: 10,
    },
});

export default Cartscreen;
