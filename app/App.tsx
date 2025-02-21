import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {useRouter} from "expo-router";
// import useRouter from 'expo-router';


export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
  };

  return (
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
        <View style={styles.form}>
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
              Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
