import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect, useState} from "react";

// @ts-ignore
const ExpenseItem = ({expense}) => (
    <View style={styles.expenseItem}>
        <View style={styles.iconContainer}>
            {/* Render icon from data */}
            {expense.icon ? ( // Check if icon exists in data
                <Image source={expense.icon} style={styles.icon}/>
            ) : (
                <View style={styles.placeholderIcon}/> // Placeholder if no icon
            )}
        </View>
        <Text style={styles.expenseName}>{expense.name}</Text>
        <Text style={styles.expenseAmount}>{expense.amount}</Text>
    </View>
);
export default function Tab() {
    const [balance, setBalance] = useState(0); // Example balance (can be from props or state)
    const [locations, setLocations] = useState([0, 0.7]); // Initial locations
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const myExpenses = [
        {name: 'Salary', amount: 25000, type: 'Salary'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
        {name: 'Food', amount: -500, type: 'Food'},
    ];

    useEffect(() => {
        let newLocations = [0];

        if (balance > 0) {
            let blueEnd = 0.9
            newLocations.push(blueEnd);
        } else if (balance < 0) {
            let redStart = 0.5
            redStart = Math.max(redStart, 0);
            newLocations.push(redStart);
        } else {
            let blueEnd = 0.7
            newLocations.push(blueEnd);
        }

        setLocations(newLocations);

    }, [balance]);
    return (
        <ScrollView style={styles.scrollView}> {/* Wrap expenses in ScrollView */}
            <View style={styles.container}>
                <LinearGradient
                    colors={['#438EFF', '#FD5454']}
                    locations={locations as [number, number]}
                    style={[styles.balanceCard]}
                    start={[0, 0]} end={[1, 0]}
                >
                    <View style={styles.incomeExpense}>
                        <View style={[styles.income, styles.incomeExpenseSide]}>
                            <Text style={styles.incomeExpenseLabel}>Income</Text>
                            <Text style={styles.amount}>0.00</Text>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.expense, styles.incomeExpenseSide]}>
                            <Text style={styles.incomeExpenseLabel}>Expenses</Text>
                            <Text style={styles.amount}>0.00</Text>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.balance}>
                        <Text style={styles.balanceLabel}>Balance</Text>
                        <Text style={styles.amount}>0</Text>
                    </View>
                </LinearGradient>

                <View style={styles.header}>
                    <Text style={styles.dateText}>02/21 Fri</Text>
                    <View style={styles.totalsContainer}>
                        <Text style={styles.incomeText}>⬆ {totalIncome.toFixed(2)}</Text>
                        <Text style={styles.expenseText}>⬇ {totalExpenses.toFixed(2)}</Text>
                    </View>
                </View>
                {myExpenses.map((expense, index) => (
                    <ExpenseItem key={index} expense={expense}/>
                ))}
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginVertical : 15,
        marginHorizontal : 5
    },
    dateText: {
        fontSize: 16,
        color: 'black',
    },
    totalsContainer: {
        flexDirection: 'row',
    },
    incomeText: {
        color: 'green',
        marginRight: 10,
        fontSize: 16,
    },
    expenseText: {
        color: 'red',
        fontSize: 16,
    },

    plusButton: {
        position: 'absolute',  // Fixed position
        bottom: 20,          // Adjust from bottom
        right: 20,           // Adjust from right
        borderRadius: 30,    // Make it round
        width: 60,           // Adjust size
        height: 60,          // Adjust size
        backgroundColor: 'yellow', // Or use an image background
        elevation: 5,        // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 30,         // Adjust icon size
        height: 30,        // Adjust icon size
        resizeMode: 'contain', // Or 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: '#E9F2FF',
        paddingHorizontal: 20,
        paddingTop: 20,
        overflow: "scroll"
    },
    scrollView: {
        flex: 1,
    },
    incomeExpenseSide: {
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 0,
        flex: 1,
    },
    detailsButton: {
        backgroundColor: '#CDE1FF',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 8,
    },
    detailsButtonText: {
        color: 'gray',
        fontSize: 14,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        overflow: 'hidden',
        marginLeft: 5// To ensure the image fits within the circle
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Or 'cover' depending on your needs
    },
    placeholderIcon: {  // Style for the placeholder
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ddd'
    },
    balance: {
        alignItems: 'center',
    },
    expensesContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    balanceContainer: {
        flexDirection: 'row',
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 15
    },
    expenseName: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    expenseAmount: {
        fontSize: 16,
        color: '#333',
        marginRight: 10
    },
    balanceLabel: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    balanceCard: {
        backgroundColor: 'light blue',
        borderRadius: 8,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'column',
    },
    incomeExpense: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    income: {
        flex: 1,
        alignItems: 'center'
    },
    expense: {
        flex: 1,
        alignItems: 'center'
    },
    incomeExpenseLabel: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
