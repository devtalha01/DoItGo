import reac, { useContext, useState } from "react";
import {
    Button,
    View,
    Animated,
    Text,
    Image,
    StyleSheet,
    ColorPropType,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";

const UserInfoscreen = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    const hideLogin =
        typeof !userInfo?.firstName !== "undefined" && !userInfo?.firstName
            ? true
            : false;

    return (
        <View style={styles.container}>
            {!hideLogin && (
                <View style={{ backgroundColor: "#bbb" }}>
                    <Image
                        source={require("../../assets/user-icon.png")}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                        }}
                    />
                    <Text>Welcome {userInfo?.firstName}</Text>
                    <Button
                        title="Logout"
                        onPress={() => {
                            logout();
                            navigation.navigate("Login");
                        }}
                        color="red"
                    />
                    <Animated.View>
                        <Button
                            title="Show products"
                            onPress={() => {
                                navigation.navigate("Products");
                                setShow(!show);
                            }}
                        />
                    </Animated.View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        fontfamily: "lucida grande",
    },
});
export default UserInfoscreen;
