import react, { useContext, useState } from "react";
import {
    Button,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";

const Loginscreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;
    const [show, setShow] = useState(hideLogin);
    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="grey"
                    size="large"
                />
            )}

            {!show && (
                <View>
                    <Text style={styles.welcome}>
                        Welcome {userInfo?.firstName}{" "}
                    </Text>
                    <Button
                        title="Logout"
                        onPress={() => {
                            logout();
                            setShow(true);
                        }}
                        color="red"
                    />
                </View>
            )}
            {show && (
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <Button
                        title="Login"
                        onPress={() => {
                            login(email, password);
                            navigation.navigate("Home");
                        }}
                    />

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text> Don't have an account ?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                exampleUsers();
                                navigation.navigate("Register");
                            }}
                        >
                            <Text style={styles.link}>
                                Try with an account!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        width: "80%",
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: "blue",
    },
    welcome: { fontSize: 18, marginBottom: 8 },
});

export default Loginscreen;
