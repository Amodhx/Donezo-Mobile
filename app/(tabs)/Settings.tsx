import React, { useState } from "react";
import {Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {removeToken} from "../../services/TokenService";
import {useRouter} from "expo-router";
import RNRestart from 'react-native-restart';
import Api_call from "../../services/ApiCall";
import UserModel from "../../model/UserModel";
import {useSelector} from "react-redux";

export default function Tab() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isModalOpen,setModalOpen] = useState<boolean>(false)
    const router = useRouter();
    const user : UserModel[] = useSelector((state:any)=>state.user);

    const toggleModal = ()=>{
        setModalOpen(!isModalOpen)
    }
    const onSave = async (currentPassword: string, newPassword: string) => {
        console.log("currentPassword : " + currentPassword + "NEW PASSWORD : ")
        const response: any = await Api_call.postApiCallWithToken('/auth/forgotPassword',new UserModel(
            user[0].user_id,
            user[0].full_name,
            user[0].email,
            newPassword
            ))
        if (response.status === 201){
            Alert.alert("Password Changed!")
            toggleModal()
        }else {
            Alert.alert("Cant change password")
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={async ()=>{
                await removeToken();
                router.replace('http://localhost:8081/')

            }} >
                <Text style={styles.closeButtonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal} >
                <Text style={styles.closeButtonText}>Change Password</Text>
            </TouchableOpacity>

            <Modal

                animationType="slide" transparent={true} visible={isModalOpen}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Change Password</Text>

                        {/* Current Password */}
                        <Text style={styles.label}>Current Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter current password"
                            secureTextEntry={true}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        {/* New Password */}
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() =>{
                                toggleModal()
                            }}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => onSave(currentPassword, newPassword)}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>

    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width : 200,
        marginTop: 15,
        backgroundColor: "#0061F3",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign : 'center',
    },
});
