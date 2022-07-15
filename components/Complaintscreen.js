import react, { useContext, useState, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import PhoneInput from "react-native-phone-number-input";

const Complaintscreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailValidError, setEmailValidError] = useState("");
    const styleShared = require("./../style");

    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmailValidError("Email address is not correct!");
            setEmail(text);
            setValidEmail(false);
            return false;
        } else {
            setEmailValidError("Email address is correct!");
            setValidEmail(true);
            setEmail(text);
        }
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            phoneInput: "",
        },
    });
    const onSubmit = (data) => {
        console.log(data);
    };

    const onChange = (arg) => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    const checkTextInput = () => {
        if (!firstName.trim()) {
            alert("Please Enter first name");
            return;
        }

        if (!email.trim()) {
            alert("Please Enter email");
            return;
        }
        if (!comment.trim()) {
            alert("Please Enter comment");
            return;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styleShared.buttonAltTextInfo, { color: "black" }]}>
                First name
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setFirstName(value)}
                value={firstName}
            />

            <Text style={[styleShared.buttonAltTextInfo, { color: "black" }]}>
                Phone number
            </Text>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="DM"
                    layout="first"
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    withDarkTheme
                    withShadow
                    autoFocus
                />
                <TouchableOpacity
                    style={[styleShared.button, { width: 60 }]}
                    onPress={() => {
                        const checkValid =
                            phoneInput.current?.isValidNumber(value);
                        setShowMessage(true);
                        setValid(checkValid ? checkValid : false);
                    }}
                >
                    <Text style={[styleShared.buttonAltText]}>Check</Text>
                </TouchableOpacity>
            </View>
            {showMessage && (
                <View style={styles.message}>
                    <Text
                        style={{
                            color: valid ? "green" : "red",
                            fontFamily: "serif",
                        }}
                    >
                        {valid
                            ? "The phone number is valid."
                            : "The phone number is not valid. Please try again."}
                    </Text>
                </View>
            )}
            <Text style={[styleShared.buttonAltTextInfo, { color: "black" }]}>
                Email
            </Text>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: valid ? "#20232a" : "red" },
                ]}
                placeholder="Type your email..."
                onChangeText={(text) => {
                    setEmailValidError("");
                    setEmail(text);
                    validate(text);
                }}
                value={email}
            />

            <View>
                <Text
                    style={{
                        color: validEmail ? "green" : "red",
                        fontFamily: "serif",
                    }}
                >
                    {!emailValidError.trim() ? "" : emailValidError}
                </Text>
            </View>

            <Text style={[styleShared.buttonAltTextInfo, { color: "black" }]}>
                Comment
            </Text>
            <TextInput
                style={{ textAlignVertical: "top" }}
                placeholder="Type your comment..."
                numberOfLines={5}
                multiline
                onChangeText={(text) => {
                    setComment(text);
                }}
                value={comment}
            />
            <View>
                <TouchableOpacity
                    style={[styleShared.button, { marginLeft: 50 }]}
                    onPress={checkTextInput}
                >
                    <Text style={styleShared.buttonAltText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: "white",
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: "white",
        height: 40,
        backgroundColor: "#ec5990",
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        //backgroundColor: "#0e101c",
    },
    input: {
        backgroundColor: "white",
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});

export default Complaintscreen;
