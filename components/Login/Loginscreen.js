import react, { useContext, useState, useRef } from "react";
import {
    Button,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";
import UserInfoscreen from "./UserInfoscreen";

const Loginscreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;

    return (
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
                        Please click on the link given below to recover a valid
                        account!
                    </Text>
                </Animated.View>
            )}

            <UserInfoscreen navigation={navigation} />
            {hideLogin && (
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
                            fadeIn();
                        }}
                    />

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text>Don't have an account ? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                exampleUsers();
                                navigation.navigate("Register");
                            }}
                        >
                            <Text style={styles.link}>
                                Use one of these accounts!
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
    error: {
        backgroundColor: "#cc0011",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
});

export default Loginscreen;
