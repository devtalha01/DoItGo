import React, { useEffect } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { View, StyleSheet, ImageBackground, Text } from "react-native";

const Commentsscreen = ({ navigation }) => {
    const styleShared = require("./../style");
    const images = [
        require("../assets/pictures/get-more-authentic-reviews.png"),
        require("../assets/pictures/positive-review-examples-hero.jpg"),
        require("../assets/pictures/review-management-made-simpler.png"),
        require("../assets/pictures/Understanding-online-review-management.png"),
    ];
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./../assets/gradient-back.jpeg")}
                style={{ width: "100%", height: "100%" }}
            >
                <SliderBox
                    sliderBoxHeight={210}
                    images={images}
                    dotColor="black"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    activeOpacity={0.5}
                    onCurrentImagePressed={(index) =>
                        console.log(`image ${index} pressed`)
                    }
                    autoplay={true}
                    dotStyle={{
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                        marginHorizontal: 10,
                        padding: 0,
                        margin: 0,
                    }}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                    }}
                    ImageComponentStyle={{
                        borderRadius: 15,
                        width: "97%",
                        marginTop: 5,
                    }}
                    imageLoadingColor="#2196F3"
                />

                <Text
                    style={[
                        styleShared.buttonAltTextInfo,
                        { color: "black", fontFamily: "serif" },
                    ]}
                >
                    Happy employees, happy customers. At least, that's what they
                    say. When it comes to providing stellar customer service,
                    it's important to first examine your employees' experience
                    😎.
                </Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Commentsscreen;
