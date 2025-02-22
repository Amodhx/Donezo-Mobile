class ExpensesModel{
    expense_id:string
    name : string
    amount : string
    date : string
    icon : string
    type : string

    constructor(expense_id: string, name: string, amount: string, date: string, icon: string, type: string) {
        this.expense_id = expense_id;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.icon = icon;
        this.type = type;
    }
}
export default ExpensesModel