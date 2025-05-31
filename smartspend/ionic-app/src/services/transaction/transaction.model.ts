interface IExpenseIncome {
    id: number;
    name: string;
    amount: number;
    category: string;
    created_on: Date;
    description: string;
    user: string;
    
}

export default interface ITransaction {
    id: number;
    type: string;
    income: IExpenseIncome;
    expense: IExpenseIncome;
    user: string;
    name: string;
}