import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Tab() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} >
                <Text style={styles.closeButtonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} >
                <Text style={styles.closeButtonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
