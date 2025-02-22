import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Modal, TextInput} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect, useState} from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {AntDesign} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import ExpensesModel from "../../model/ExpensesModel";
import {addExpense, updateExpense} from "../../slices/ExpensesSlices";

export default function Tab() {
    const myExpenses: ExpensesModel[] = useSelector((state: any) => state.expenses);
    const dispatch = useDispatch();
    const [balance, setBalance] = useState(0);
    const [locations, setLocations] = useState([0, 0.7]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<"expenses" | "income">("expenses");
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const [isKeyBoardOpen, setKeyBoardOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [isUpdateModalVisible,setUpdateModalVisible] = useState<boolean>(false);
    const [selectedExpense,setSelectedExpense] = useState<ExpensesModel | null>(null)

    const [editableAmount, setEditableAmount] = useState(selectedExpense?.amount.toString);
    const [isEditing, setIsEditing] = useState(false);

    function setTotals() {
        let totalIncomeValue = 0;
        let totalExpensesValue = 0;
        myExpenses.map((expense: ExpensesModel) => {
            if (expense.type === 'income') {
                totalIncomeValue += Number(expense.amount);
            } else {
                totalExpensesValue += Number(expense.amount);
            }
        })
        setTotalIncome(totalIncomeValue);
        setTotalExpenses(totalExpensesValue);
        setBalance(totalIncomeValue - totalExpensesValue);
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const categories = {
        expenses: [
            {name: "Food", icon: "rest"},
            {name: "Bills", icon: "creditcard"},
            {name: "Transportation", icon: "car"},
            {name: "Home", icon: "home"},
            {name: "Car", icon: "car"},
            {name: "Entertainment", icon: "videocamera"},
            {name: "Shopping", icon: "shoppingcart"},
            {name: "Clothing", icon: "tago"},
            {name: "Insurance", icon: "Safety"},
            {name: "Tax", icon: "filetext1"},
            {name: "Telephone", icon: "phone"},
            {name: "Cigarette", icon: "smileo"},
            {name: "Health", icon: "hearto"},
            {name: "Sport", icon: "Trophy"},
            {name: "Baby", icon: "smileo"},
            {name: "Pet", icon: "github"},
            {name: "Beauty", icon: "skin"},
            {name: "Electronics", icon: "tablet1"},
            {name: "Hamburger", icon: "rest"},
            {name: "Wine", icon: "gift"},
            {name: "Vegetables", icon: "shoppingcart"},
            {name: "Snacks", icon: "gift"},
            {name: "Gift", icon: "gift"},
            {name: "Social", icon: "team"},
        ],
        income: [
            {name: "Salary", icon: "wallet"},
            {name: "Awards", icon: "Trophy"},
            {name: "Grants", icon: "book"},
            {name: "Sale", icon: "tag"},
            {name: "Rental", icon: "home"},
            {name: "Refunds", icon: "retweet"},
            {name: "Coupons", icon: "gift"},
            {name: "Lottery", icon: "gift"},
            {name: "Dividends", icon: "linechart"},
            {name: "Investments", icon: "bank"},
            {name: "Others", icon: "appstore-o"},
        ],
    };
    const handlePress = (value: string) => {
        if (value === "del") {
            setAmount((prev) => prev.slice(0, -1));
        } else {
            setAmount((prev) => prev + value);
        }
    };
    const openUpdateModal = (expense : ExpensesModel)=>{
        setSelectedExpense(expense);
        setEditableAmount(expense.amount.toString())
        setUpdateModalVisible(true)
    }

    useEffect(() => {
        // @ts-ignore
        // dispatch(addExpense(expenses[0]))
        let newLocations = [0];
        setTotals()

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

    }, [myExpenses]);
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
                            <Text style={styles.amount}>{totalIncome}</Text>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.expense, styles.incomeExpenseSide]}>
                            <Text style={styles.incomeExpenseLabel}>Expenses</Text>
                            <Text style={styles.amount}>{totalExpenses}</Text>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.balance}>
                        <Text style={styles.balanceLabel}>Balance</Text>
                        <Text style={styles.amount}>{balance}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.header}>
                    <Text style={styles.dateText}>02/21 Fri</Text>
                    <View style={styles.totalsContainer}>
                        <Text style={styles.incomeText}>⬆ {totalIncome.toFixed(2).toString()}</Text>
                        <Text style={styles.expenseText}>⬇ {totalExpenses.toFixed(2).toString()}</Text>
                    </View>
                </View>
                {myExpenses.map((expense: ExpensesModel, index: number) => (
                    <TouchableOpacity
                        key={index}
                        onPress={()=>{
                            openUpdateModal(expense)
                        }}
                    >
                        <View  style={styles.expenseItem}>
                            <View style={styles.iconContainer}>
                                {expense.icon ? (
                                    <AntDesign name={expense.icon as any} size={28}
                                               color={expense.type == 'expenses' ? 'red' : 'blue'}/>
                                ) : (
                                    <View style={styles.placeholderIcon}/>
                                )}
                            </View>
                            <Text style={styles.expenseName}>{expense.name}</Text>
                            <Text style={styles.expenseAmount}>{expense.amount}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesome name="plus" size={30} color="white"/>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                style={styles.modalView}
                animationType={"slide"}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Add</Text>

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

                        <FlatList
                            data={categories[selectedTab]}
                            keyExtractor={(item) => item.name}
                            numColumns={3}
                            contentContainerStyle={styles.gridContainer}
                            renderItem={({item}) => {
                                const isSelected = selectedCategory === item.name;
                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.categoryItem,
                                            {backgroundColor: isSelected ? "lightblue" : "white"},
                                        ]}
                                        onPress={() => {
                                            setSelectedCategory(item);
                                            setKeyBoardOpen(true)
                                            toggleModal()
                                        }}
                                    >
                                        <AntDesign name={item.icon as any} size={28}
                                                   color={isSelected ? "blue" : "gray"}/>
                                        <Text style={[styles.categoryText, {color: isSelected ? "blue" : "black"}]}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>

            <Modal visible={isKeyBoardOpen} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer1}>

                        {selectedCategory &&
                            <View style={styles.header1}>
                                <TouchableOpacity style={styles.categoryContainer}>
                                    <AntDesign name={selectedCategory.icon} size={24} color="white"/>
                                </TouchableOpacity>
                                <Text style={styles.memoText}>{selectedCategory.name}</Text>
                                <Text style={styles.amountText}>{amount || "0"}</Text>
                            </View>
                        }

                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText1}>Today</Text>
                            <Text style={styles.dateSubText}>{format(new Date(), "M/d")}</Text>
                        </View>

                        <View style={styles.keyboard}>
                            {[
                                "7", "8", "9",
                                "4", "5", "6",
                                "1", "2", "3",
                                ".", "0", "del"
                            ].map((key) => (
                                <TouchableOpacity key={key} style={styles.key} onPress={() => handlePress(key)}>
                                    <Text style={styles.keyText}>{key === "del" ? "⌫" : key}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.actionKey} onPress={async () => {
                                setKeyBoardOpen(false)
                                const model = new ExpensesModel("1", selectedCategory.name, amount, new Date().toString(), selectedCategory.icon, selectedTab);
                                dispatch(addExpense(model));
                            }}>
                                <Text style={styles.actionText}>✔</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isUpdateModalVisible}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer2}>
                        {/* Delete Icon */}
                        <TouchableOpacity style={styles.deleteIcon}>
                            <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>

                        {/* Expense Details */}
                        {selectedExpense &&
                            <View style={styles.detailsContainer}>
                                {/* Icon & Name */}
                                <View style={styles.header2}>
                                    <View style={styles.iconWrapper}>
                                        {selectedExpense.icon ? (
                                            <AntDesign name={selectedExpense.icon as any} size={28}
                                                       color={selectedExpense.type == 'expenses' ? 'red' : 'blue'}/>
                                        ) : (
                                            <View style={styles.placeholderIcon}/>
                                        )}
                                    </View>
                                    <Text style={styles.expenseTitle}>{selectedExpense.name}</Text>
                                </View>

                                {/* Details */}
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Category</Text>
                                    <Text style={styles.value}>{selectedExpense.type}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Money</Text>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.expenseTitleInput}
                                            value={editableAmount}
                                            onChangeText={setEditableAmount}
                                            autoFocus={true}
                                            onBlur={() => setIsEditing(false)}
                                        />
                                    ) : (
                                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                                            <Text style={styles.expenseTitle}>{editableAmount}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Date</Text>
                                    <Text style={styles.value}>{format(selectedExpense.date, "Y/M/d")}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Memo</Text>
                                    <Text style={styles.value}>{selectedExpense.name}</Text>
                                </View>
                            </View>
                        }


                        {/* Update Button */}
                        <TouchableOpacity style={styles.updateButton} onPress={()=>{
                            // @ts-ignore
                            const model = new ExpensesModel(selectedExpense?.expense_id,selectedExpense?.name,editableAmount,selectedExpense?.date,selectedExpense?.icon,selectedExpense?.type);
                            dispatch(updateExpense(model));
                            setUpdateModalVisible(false)
                        }}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>


    )
        ;
}

const styles = StyleSheet.create({
    expenseTitleInput: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#aaa",
        paddingVertical: 5,
    },
    modalContainer2: {
        width: "100%",
        height: "90%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    deleteIcon: {
        position: "absolute",
        top: 20,
        right: 20,
    },
    detailsContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 40,
    },
    header2: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconWrapper: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
    },
    expenseTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    label: {
        fontSize: 16,
        color: "gray",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
    },
    updateButton: {
        width: "100%",
        backgroundColor: "#FFB100",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 30,
        alignItems: "center",
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer1: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    categoryContainer: {
        backgroundColor: "#FFB100",
        padding: 10,
        borderRadius: 50,
    },
    memoText: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        color: "gray",
    },
    amountText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    dateContainer: {
        alignItems: "flex-end",
        marginBottom: 10,
    },
    dateText1: {
        fontSize: 16,
        fontWeight: "bold",
    },
    dateSubText: {
        color: "gray",
    },
    keyboard: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    key: {
        width: "30%",
        padding: 15,
        alignItems: "center",
    },
    keyText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    actionKey: {
        width: "30%",
        backgroundColor: "#FFB100",
        padding: 10,
        alignItems: "center",
    },
    actionText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginVertical: 15,
        marginHorizontal: 5
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
        right: '46%',
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: 'yellow',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
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
        position: 'relative',
        bottom: -25
    },
    modalContent: {
        width: "100%",
        height: '95%',
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
