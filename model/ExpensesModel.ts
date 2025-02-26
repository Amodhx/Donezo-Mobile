class ExpensesModel{
    expense_id:string
    name : string
    amount : string
    date : string
    icon : string
    type : string
    user_id:string

    constructor(expense_id: string, name: string, amount: string, date: string, icon: string, type: string,user_id:string) {
        this.expense_id = expense_id;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.icon = icon;
        this.type = type;
        this.user_id = user_id;
    }
}
export default ExpensesModel