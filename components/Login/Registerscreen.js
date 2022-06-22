import react, { useContext, useState } from "react";
import {
    Button,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { AuthContext, AuthProvider } from "./context";

function Registerscreen({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    return (
        <View style={styles.container}>
            {userInfos.length > 0 ? (
                userInfos.map((item) => {
                    return (
                        <View key={item.id}>
                            <Text style={styles.text}>
                                {item.id} + {item.firstName}+ {item.lastName} +
                                {item.email} + {item.password}
                            </Text>
                        </View>
                    );
                })
            ) : (
                <Text style={styles.text}>No user found!</Text>
            )}
        </View>
    );
}

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
});
export default Registerscreen;
