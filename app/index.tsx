import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {useRouter} from "expo-router";
import UserModel from "../model/UserModel";
import Api_call from "../services/ApiCall";
import {AppDispatch} from "../store/Store";
import {useDispatch} from "react-redux";
import {addUser} from "../slices/UserSlices";
import {saveToken} from "../services/TokenService";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        const model = new UserModel('','',email,password)
        const response:any = await Api_call.postApiCallWithOutToken('/auth/signIn',model);
        if (response.status == 201){
            await saveToken(response.data);
            dispatch(addUser(model))
            router.replace("/(tabs)");
        }else {
            Alert.alert("INVALID CREDENTIALS!!! ")
        }

    };

    const handleSignUp = ()=>{
        router.replace("/SignUp");
    }
    return (
        <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
            <View style={styles.form}>
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/logo.png")} style={styles.image} />
                </View>

                <Text style={styles.title}>Welcome Back</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Login
                </Button>

                <TouchableOpacity>
                    <Text style={styles.signupText}>
                        Don't have an account? <Text onPress={handleSignUp} style={styles.signupLink}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    imageContainer: {
        marginBottom: 10,
        alignItems: "center"
    },
    image: {
        width: 100, // Set width
        height: 100, // Set height
        resizeMode: "contain", // Keep aspect ratio
    },
    form: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        marginBottom: 15,
    },
    forgotPassword: {
        textAlign: "right",
        color: "#6a11cb",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#6a11cb",
        paddingVertical: 5,
    },
    signupText: {
        textAlign: "center",
        marginTop: 15,
    },
    signupLink: {
        color: "#2575fc",
        fontWeight: "bold",
    },
});

export default LoginForm;
