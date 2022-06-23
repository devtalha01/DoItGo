import react, { useContext, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { AuthContext, AuthProvider } from "./context";
const emptyList = () => {
    return (
        <View stye={{ alignItem: "center" }}>
            <Text style={styles.item}>No data found!</Text>
        </View>
    );
};

const itemSeparator = () => {
    return (
        <View
            style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }}
        />
    );
};

function Registerscreen({ navigation }) {
    const { login, userInfo, loading, logout, userInfos, exampleUsers } =
        useContext(AuthContext);
    const [copiedText, setCopiedText] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={userInfos}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text> Email : {item.email} </Text>
                            <Text> Password : {item.password} </Text>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={itemSeparator}
                ListEmptyComponent={emptyList}
                ListHeaderComponent={() => (
                    <Text
                        style={{
                            fontSize: 30,
                            textAlign: "center",
                            marginTop: 20,
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        List of accounts
                    </Text>
                )}
                ListFooterComponent={() => (
                    <Text
                        style={{
                            fontSize: 30,
                            textAlign: "center",
                            marginBottom: 20,
                            fontWeight: "bold",
                        }}
                    >
                        Thank You ;)
                    </Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        fontSize: 30,
    },
    item: {
        padding: 20,
        marginTop: 5,
        fontSize: 15,
    },
});

export default Registerscreen;
