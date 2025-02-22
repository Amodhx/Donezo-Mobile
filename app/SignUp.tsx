import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {LinearGradient} from "expo-linear-gradient";
import {Stack, useRouter} from "expo-router";

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        console.log("Signing up with:", name, email, password, confirmPassword);
        router.replace("/(tabs)");
    };

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/logo.png")} style={styles.image}/>
                    </View>

                    <Text style={styles.title}>Create an Account</Text>

                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                    />

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

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                    />

                    <Button mode="contained" onPress={handleSignUp} style={styles.button}>
                        Sign Up
                    </Button>

                    <TouchableOpacity>
                        <Text style={styles.signupText}>
                            Already have an account? <Text onPress={() => router.replace("/")}
                                                           style={styles.signupLink}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </>
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
        width: 100,
        height: 100,
        resizeMode: "contain",
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

export default SignUpForm;
