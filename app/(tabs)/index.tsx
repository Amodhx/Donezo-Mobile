import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';

export default function Tab() {
    return (
        <View style={styles.container}>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <View style={styles.incomeExpense}>
                    <View style={styles.income}>
                        <Text style={styles.incomeExpenseLabel}>Income</Text>
                        <Text style={styles.amount}>0</Text>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.expense}>
                        <Text style={styles.incomeExpenseLabel}>Expenses</Text>
                        <Text style={styles.amount}>0</Text>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.balance}>
                    <Text style={styles.balanceLabel}>Balance</Text>
                    <Text style={styles.amount}>0</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Light gray background
        padding: 20,
    },
    detailsButton: {
        backgroundColor: '#e0e0e0', // Light gray button background
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5, // Space above the button
    },
    detailsButtonText: {
        color: 'gray',
        fontSize: 14,
    },
    balance: {
        alignItems: 'center', // Center the balance text
    },
    balanceLabel: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    balanceCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'column', // Align items vertically
    },
    incomeExpense: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Space between Income/Expense and Balance
    },
    income: {
        flex: 1, // Equal width for Income and Expense
        alignItems: 'center',
    },
    expense: {
        flex: 1, // Equal width for Income and Expense
        alignItems: 'center',
    },
    incomeExpenseLabel: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
