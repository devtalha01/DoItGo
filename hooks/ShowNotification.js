import React, { useRef, useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Button,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AppContext } from "../store/context";

const ShowNotification = () => {
    const windowHeight = Dimensions.get("window").height;
    const [status, setStatus] = useState(null);
    const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
    const { cart } = useContext(AppContext);
    const successColor = "#6dcf81";
    const successHeader = "Success!";
    const successMessage = `You have ${cart.length} product(s) 😉!`;
    const failColor = "black"; //"#bf6060";
    const failHeader = "Notification";
    const failMessage = `You have ${cart.length} product(s) 🙄!`;

    const popIn = () => {
        Animated.timing(popAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(popOut());
    };

    const popOut = () => {
        setTimeout(() => {
            Animated.timing(popAnim, {
                toValue: windowHeight * -1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }, 2000);
    };

    const instantPopOut = () => {
        Animated.timing(popAnim, {
            toValue: windowHeight * -1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        setStatus("success");
        popIn();
        if (cart.length == 0) setStatus("fail");
    });

    return (
        <View>
            <Animated.View
                style={[
                    styles.messageNotifContainer,
                    { transform: [{ translateY: popAnim }] },
                ]}
            >
                <View style={styles.messageNotifRow}>
                    <AntDesign
                        name={
                            status === "success"
                                ? "checkcircleo"
                                : "exclamationcircle"
                        }
                        size={24}
                        color={status === "success" ? successColor : failColor}
                    />
                    <View style={styles.messageNotifText}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                            {status === "success" ? successHeader : failHeader}
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {status === "success"
                                ? successMessage
                                : failMessage}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={instantPopOut}>
                        <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageNotifContainer: {
        height: 60,
        width: 350,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    messageNotifRow: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    messageNotifText: {
        width: "70%",
        padding: 2,
    },
});

export default ShowNotification;
