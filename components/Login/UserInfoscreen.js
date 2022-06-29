import { useContext, useState } from "react";
import {
    Button,
    View,
    Animated,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";

const UserInfoscreen = ({ navigation }) => {
    const styleShared = require("./../../style");
    const [show, setShow] = useState(false);
    const { userInfo, logout } = useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;

    return (
        <View style={styles.container}>
            {!hideLogin && (
                <View>
                    <Image
                        source={require("../../assets/user-icon.png")}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                        }}
                    />
                    <Text>Hi {userInfo?.firstName} 😃 !</Text>
                    <View style={[styles.container, { marginVertical: 15 }]}>
                        <TouchableOpacity
                            style={styleShared.buttonLogout}
                            onPress={() => {
                                logout();
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styleShared.buttonAltTextInfo}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                        <Animated.View>
                            <TouchableOpacity
                                style={styleShared.buttonInfo}
                                onPress={() => {
                                    navigation.navigate("Products");
                                    setShow(!show);
                                }}
                            >
                                <Text style={styleShared.buttonAltTextInfo}>
                                    Show products
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        fontfamily: "lucida grande",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
export default UserInfoscreen;
