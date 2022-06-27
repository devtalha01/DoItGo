import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../store/context";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
    SafeAreaView,
    ActivityIndicator,
    ImageBackground,
    TextInput,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import UserInfoscreen from "../components/Login/UserInfoscreen";
import { AuthContext, AuthProvider } from "../components/Login/context";
import ShowNotification from "./../hooks/ShowNotification";
import { GET_PRODUCTS, URL_PRODUCTS } from "../store/constants ";

const handleEmpty = () => {
    return <Text>No data present!</Text>;
};
const Divider = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "blue",
            }}
        />
    );
};

const Item = ({ item, title, onPress, navigation }) => (
    <View
        style={{
            flex: 1,
            justifyContent: "flex-end",
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
            marginHorizontal: 5,
            marginBottom: 10,
        }}
    >
        <TouchableOpacity
            key={item.node.id}
            onPress={() => navigation.navigate("Detail", { item })}
        >
            <Image
                source={{ uri: item.node.thumbnail.url }}
                style={{ height: 100, width: 130 }}
            />
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                }}
            >
                {item.node.name}
            </Text>
        </TouchableOpacity>
        <Text>
            {item.node.pricing.priceRange.start.gross.amount +
                ` ${item.node.pricing.priceRange.start.gross.currency}`}
        </Text>
        <Button title={title} onPress={onPress} color="black"></Button>
    </View>
);

const Productsscren = ({ navigation }) => {
    const { products, setProducts, loading, cart, setCart } =
        useContext(AppContext);
    const { userInfo } = useContext(AuthContext);
    const [ref, setRef] = useState(null);
    const goTo = () => navigation.navigate("Detail");
    let [quantity, setQuantity] = useState(1);
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState("");
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch(URL_PRODUCTS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_PRODUCTS }),
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Error fetching data");
                } else {
                    return response.json();
                }
            })
            .then((response) => {
                setProducts(response.data.products.edges);
                setMasterDataSource(response.data.products.edges);
            })
            .catch((err) => console.log(err));
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            const newData = masterDataSource?.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.node.name.trim().toLowerCase();
                const textData = text.trim().toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setProducts(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setProducts(masterDataSource);
            setSearch(text);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                title={
                    item.node.id === selectedId &&
                    cart?.find((element) => element.id === selectedId)
                        ? "Added to cart"
                        : "Add to cart "
                }
                onPress={() => {
                    setSelectedId(item.node.id);
                    cart.find((element) => element.id === item.node.id)
                        ? () => null
                        : setCart([
                              ...cart,
                              {
                                  id: item.node.id,
                                  name: item.node.name,
                                  quantity: 1,
                                  price: item.node.pricing.priceRange.start
                                      .gross.amount,
                                  currency:
                                      item.node.pricing.priceRange.start.gross
                                          .currency,
                              },
                          ]);
                }}
                navigation={navigation}
            />
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./../assets/gradient-back.jpeg")}
                style={styles.image}
            >
                <UserInfoscreen navigation={navigation} />
                {loading ? (
                    <ActivityIndicator
                        style={{ height: 80 }}
                        color="grey"
                        size="large"
                    />
                ) : (
                    <SafeAreaView>
                        <ShowNotification />
                        <Button
                            title={"See my cart (" + cart.length + ")"}
                            onPress={() => navigation.navigate("Cart")}
                            color="black"
                        ></Button>
                        <SafeAreaView
                            style={{
                                backgroundColor: "#fff",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        ></SafeAreaView>
                        {/*<Button
                            title="Scroll to middle"
                            onPress={() => {
                                ref.scrollToIndex({
                                    animated: true,
                                    index: 5,
                                    viewPosition: 0,
                                });
                            }}
                            color="black"
                        />*/}
                        <TextInput
                            style={{ backgroundColor: "white", color: "red" }}
                            placeholder="Search here by product name..."
                            autoCapitalize="none"
                            onChangeText={(text) => searchFilterFunction(text)}
                            underlineColorAndroid="transparent"
                            value={search}
                        />

                        <FlatList
                            data={products}
                            ref={(ref) => {
                                setRef(ref);
                            }}
                            ListEmptyComponent={handleEmpty}
                            ListHeaderComponent={() => (
                                <Text style={styles.title}>
                                    Hi {userInfo?.firstName} 😊!
                                </Text>
                            )}
                            stickyHeaderIndices={[0]}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            //ItemSeparatorComponent={Divider}
                            contentContainerStyle={{ paddingBottom: 260 }}
                            keyExtractor={(item) => item.node.id} // Extract keys for each item in the array
                        />
                    </SafeAreaView>
                )}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontfamily: "lucida grande",
    },
    title: {
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 15,
        padding: 5,
        backgroundColor: "yellow",
    },
    product: {
        alignItems: "center",
        justifyContent: "center",
    },
    quantity: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "yellow",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
});
export default Productsscren;
