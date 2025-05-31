import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRange } from "@ionic/react"
import './styles.scss';
import storage from "../../redux/store";
import { useEffect, useState } from "react";
import { useGetTransactionsQuery } from "../../services/backend";

const CurrentExpenditure = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [currentExpenditure, setCurrentExpenditure] = useState(0)
  function calculateTotalAmount(budgets: any) {
    let total = 0;
    budgets.forEach((item: { total_amount: number; }) => total += item.total_amount);
    return total;
  }
  const getTotalBudgets = async () => {
    const budgetsStored = await storage.get('budgets')
    setTotalAmount(calculateTotalAmount(budgetsStored))
  }

  const getCurrentExpense = async () => {
    const transactions = await storage.get('transactions')
    let totalExpenditure = 0
    for (const [index, item] of transactions.entries()) {
        if(item.expense){
          totalExpenditure += item.expense.amount
          
        }
    }

    setCurrentExpenditure(totalExpenditure)
  }



  useEffect(() => {
    getTotalBudgets()
    getCurrentExpense()
  }, [])
  return (
    <IonCard className="expenditure-card">
      <IonCardHeader>
        <IonCardSubtitle><span>Current Expenditure</span></IonCardSubtitle>
        <IonCardTitle><span>N$ {currentExpenditure}</span></IonCardTitle>
      </IonCardHeader>
      <IonRange
        max={totalAmount}
        value={currentExpenditure}
      >
      </IonRange>

      <IonCardContent>You still have N$ {totalAmount - currentExpenditure} left for the month</IonCardContent>
    </IonCard>
  )
}

export default CurrentExpenditure