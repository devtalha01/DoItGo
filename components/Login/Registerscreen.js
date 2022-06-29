import react, { useContext, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
} from "react-native";
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
    const { userInfos, loading } = useContext(AuthContext);
    const [copiedText, setCopiedText] = useState("");

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
                data={userInfos}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={[
                                styles.container,
                                { marginLeft: 10, marginTop: 10 },
                            ]}
                        >
                            <Text>Email : {item.email}</Text>
                            <Text>Password : {item.password}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={itemSeparator}
                //ListEmptyComponent={emptyList}
                ListHeaderComponent={() => (
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            marginTop: 20,
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                            fontFamily: "serif",
                        }}
                    >
                        List of accounts
                    </Text>
                )}
                ListFooterComponent={() => (
                    <Text
                        style={{
                            fontSize: 15,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: "serif",
                        }}
                    >
                        Thank You 🥰!
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
