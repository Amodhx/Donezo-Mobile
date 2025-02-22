import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList,Modal} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect, useState} from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
const ExpenseItem = ({expense}) => (
    <View style={styles.expenseItem}>
        <View style={styles.iconContainer}>
            {expense.icon ? (
                <Image source={expense.icon} style={styles.icon}/>
            ) : (
                <View style={styles.placeholderIcon}/>
            )}
        </View>
        <Text style={styles.expenseName}>{expense.name}</Text>
        <Text style={styles.expenseAmount}>{0}</Text>
    </View>
);
export default function Tab() {
    const [balance, setBalance] = useState(0);
    const [locations, setLocations] = useState([0, 0.7]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<"expenses" | "income">("expenses");

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
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
    const categories = {
        expenses: [
            { name: "Food", icon: "rest" },
            { name: "Bills", icon: "creditcard" },
            { name: "Transportation", icon: "car" },
            { name: "Home", icon: "home" },
            { name: "Car", icon: "car" },
            { name: "Entertainment", icon: "videocamera" },
            { name: "Shopping", icon: "shoppingcart" },
            { name: "Clothing", icon: "tago" },
            { name: "Insurance", icon: "Safety" },
            { name: "Tax", icon: "filetext1" },
            { name: "Telephone", icon: "phone" },
            { name: "Cigarette", icon: "smileo" },
            { name: "Health", icon: "hearto" },
            { name: "Sport", icon: "Trophy" },
            { name: "Baby", icon: "smileo" },
            { name: "Pet", icon: "github" },
            { name: "Beauty", icon: "skin" },
            { name: "Electronics", icon: "tablet1" },
            { name: "Hamburger", icon: "rest" },
            { name: "Wine", icon: "gift" },
            { name: "Vegetables", icon: "shoppingcart" },
            { name: "Snacks", icon: "gift" },
            { name: "Gift", icon: "gift" },
            { name: "Social", icon: "team" },
        ],
        income: [
            { name: "Salary", icon: "wallet" },
            { name: "Awards", icon: "Trophy" },
            { name: "Grants", icon: "book" },
            { name: "Sale", icon: "tag" },
            { name: "Rental", icon: "home" },
            { name: "Refunds", icon: "retweet" },
            { name: "Coupons", icon: "gift" },
            { name: "Lottery", icon: "gift" },
            { name: "Dividends", icon: "linechart" },
            { name: "Investments", icon: "bank" },
            { name: "Others", icon: "appstore-o" },
        ],
    };

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
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
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
                        <Text style={styles.incomeText}>⬆ {totalIncome.toFixed(2).toString()}</Text>
                        <Text style={styles.expenseText}>⬇ {totalExpenses.toFixed(2).toString()}</Text>
                    </View>
                </View>
                {myExpenses.map((expense, index) => (
                    <ExpenseItem key={index} expense={expense}/>
                ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.plusButton}
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(true)}
                >
                    <FontAwesome name="plus" size={30} color="white" />
                </TouchableOpacity>

                <Modal
                    visible={isModalVisible}
                    style={styles.modalView}
                    animationType={"slide"}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {/* Header */}
                            <Text style={styles.title}>Add</Text>

                            {/* Tabs */}
                            <View style={styles.tabContainer}>
                                <TouchableOpacity
                                    style={[styles.tab, selectedTab === "expenses" && styles.activeTab]}
                                    onPress={() => setSelectedTab("expenses")}
                                >
                                    <Text style={[styles.tabText, selectedTab === "expenses" && styles.activeTabText]}>
                                        Expenses
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.tab, selectedTab === "income" && styles.activeTab]}
                                    onPress={() => setSelectedTab("income")}
                                >
                                    <Text style={[styles.tabText, selectedTab === "income" && styles.activeTabText]}>
                                        Income
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Categories Grid */}
                            <FlatList
                                data={categories[selectedTab]}
                                keyExtractor={(item) => item.name}
                                numColumns={4}
                                contentContainerStyle={styles.gridContainer}
                                renderItem={({ item }) => (
                                    <View style={styles.categoryItem}>
                                        <AntDesign name={item.icon as any} size={28} color="gray" />
                                        <Text style={styles.categoryText}>{item.name}</Text>
                                    </View>
                                )}
                            />

                            {/* Close Button */}
                            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>


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
        position: 'absolute',
        bottom: '8%',
        right : '46%',
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: 'yellow',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
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
        marginLeft: 5
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    placeholderIcon: {
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
        elevation: 3,
        shadowColor: '#000',
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
    modalView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        position : 'relative',
        bottom : -25
    },
    modalContent: {
        width: "100%",
        height : '95%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#E5E5E5",
        borderRadius: 20,
        padding: 4,
        marginBottom: 15,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#ff6666",
    },
    tabText: {
        fontSize: 16,
        color: "gray",
    },
    activeTabText: {
        color: "white",
        fontWeight: "bold",
    },
    gridContainer: {
        paddingVertical: 10,
    },
    categoryItem: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
    },
    categoryText: {
        marginTop: 5,
        fontSize: 12,
        textAlign: "center",
        color: "gray",
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: "#ff6666",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
