// src/components/FormInput.js
import { useController, useFormContext } from "react-hook-form";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";

export const FormInput = (props) => {
    const { name, rules, defaultValue = "", ...inputProps } = props;

    const formContext = useFormContext();
    const { control, errors } = formContext;

    const { field } = useController({ name, control, rules, defaultValue });

    return <Text {...inputProps} error={errors[name]?.message} value={""} />;
};
