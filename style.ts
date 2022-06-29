"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    buttonAlt: {
        width: "80%",
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonAltText: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
    },
    button: {
        width: "80%",
        backgroundColor: "black",
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    buttonLogout: {
        backgroundColor: "black",
        width: "40%",
        height: 40,
        borderRadius: 50,
        alignItems: "center",
    },
    buttonInfo: {
        backgroundColor: "black",
        width: "130%",
        height: 40,
        borderRadius: 50,
        alignItems: "center",
    },
    buttonAltTextInfo: {
        color: "white",
        alignItems: "center",
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
    },
});
