import {Stack} from 'expo-router/stack';
import SignUpForm from "./SignUp";
import {Provider} from "react-redux";
import {store} from "../store/Store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="signUp" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </Provider>
    );
}
