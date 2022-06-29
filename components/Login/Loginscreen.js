import react, { useContext, useState, useRef } from "react";
import reactDom from "react-dom";
import {
    Button,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    ImageBackground,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";
import UserInfoscreen from "./UserInfoscreen";

const Loginscreen = ({ navigation }) => {
    const styleShared = require("./../../style");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, userInfo, loading, exampleUsers, accountRegister } =
        useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;

    return (
        <ImageBackground
            source={require("./../../assets/gradient-back.jpeg")}
            style={styles.image}
        >
            <View style={styles.container}>
                {loading && (
                    <ActivityIndicator
                        style={{ height: 80 }}
                        color="grey"
                        size="large"
                    />
                )}
                {userInfo.length === 0 && (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                        }}
                    >
                        <Text style={styles.error}>
                            Please click on the link given below to recover a
                            valid account!
                        </Text>
                    </Animated.View>
                )}

                <UserInfoscreen navigation={navigation} />
                {hideLogin && (
                    <View style={styles.wrapper}>
                        <Text style={styles.heading}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            style={styleShared.button}
                            onPress={() => {
                                login(email, password);
                                fadeIn();
                            }}
                        >
                            <Text style={styleShared.buttonAltText}>
                                Log In
                            </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <Text>Don't have an account ? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    exampleUsers();
                                    navigation.navigate("Register");
                                }}
                            >
                                <Text style={styles.link}>
                                    Use proposed accounts!
                                </Text>
                            </TouchableOpacity>
                            {/*  <TouchableOpacity
                                onPress={() => {
                                    accountRegister(email, password);
                                }}
                            >
                                <Text style={styles.link}>
                                    Register without email confirmation!
                                </Text>
                            </TouchableOpacity>
                            */}
                        </View>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        width: "80%",
        marginTop: "40%",
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: "30%",
        paddingLeft: 5,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "30%",
        color: "black",
    },
    wrapper: {
        width: "80%",
    },
    input: {
        width: "80%",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    link: {
        color: "blue",
    },
    error: {
        color: "red",
        fontWeight: "bold",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    image: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
});

export default Loginscreen;
