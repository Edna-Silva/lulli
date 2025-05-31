import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import { apertureOutline, arrowDownOutline, arrowUpOutline, bagHandle, bagHandleOutline, carSportOutline, cashOutline, closeCircle, fastFoodOutline, giftOutline, videocamOutline } from "ionicons/icons";
import "./styles.scss";

import storage from "../../redux/store";
import { useGetTransactionsQuery } from "../../services/backend";

import { isEqual } from "lodash";
import moment from "moment";
import ITransaction from "../../services/transaction/transaction.model";

const RecentTransactions: React.FC = () => {
  const { data: transactions = [], isLoading } = useGetTransactionsQuery()
  const [recentTransactions, setRecentTransactions] = useState<ITransaction[]>([])
  const [transaction, setTransaction] = useState<any>({})
  const [category, setCategory] = useState<any>({})
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const transactionModal = useRef<HTMLIonModalElement>(null);
  const editModal = useRef<HTMLIonModalElement>(null);
  const allTransactionsModal = useRef<HTMLIonModalElement>(null);
  const [isAllTransactionModalOpen, setAllIsTransactionModalOpen] = useState(false);

  const handleOpenTransaction = () => {
    setIsTransactionModalOpen(true)
  }

  const handleCloseTransaction = () => {

    setIsTransactionModalOpen(false)
  }

  const handleOpenEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
  }

  const handleOpenAllTransaction = () => {
    setAllIsTransactionModalOpen(true)
  }

  const handleCloseAllTransaction = () => {
    setAllIsTransactionModalOpen(false)
  }


  const handleTransactionSelection = (transaction: any) => {
    setTransaction(transaction)
    const category = categories.filter((cat: any) => {
      if (transaction.type === "INCOME") {
        return cat.id === transaction.income.category
      } else if (transaction.type === "EXPENSE") {

        return cat.id === transaction.expense.category
      } else {
        return { categoryName: 'Transfer' }
      }
    })

    setCategory(category[0])
  }

  const categories = [
    { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
    { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
    { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
    { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
    { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
    { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
    { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

]


  const getCategory = (categoryId: string) => {
    const category = categories.filter((cat: any) => {
      return cat.id === categoryId
    })

    return category
  }
  useEffect(() => {
    const getTransactions = async () => {
      const existingTransactions = await storage.get('transactions')
      setRecentTransactions(existingTransactions.slice(Math.max(existingTransactions.length - 4, 1)).reverse());

    }

    getTransactions()
  }, [])

  useEffect(() => {
    const refreshTransactions = async () => {
      const existingTransactions = await storage.get('transactions')
      if (!isEqual(existingTransactions, transactions) && transactions) {
        await storage.set('transactions', transactions)
        setRecentTransactions(transactions.slice(Math.max(transactions.length - 3, 1)).reverse());
      }
    }

    refreshTransactions()
  }, [transactions])


  const formatDate = (inputDate: Date) => {
    const today = moment();
    const date = moment(inputDate);

    if (date.isSame(today, 'day')) {
      return "Today, " + date.format("h:mm A");
    } else {
      return date.format("D MMM YYYY, h:mm A");
    }
  }

  const capitalise = (text: string) => {
    // text = text.toLowerCase()
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className="recent-transactions">
      <div className="header">
        <IonText>Recent Transactions</IonText>
        <span onClick={handleOpenAllTransaction}>View All</span>
      </div>
      {recentTransactions.map((recentTransaction) => (
        <div className="receipt-card" key={recentTransaction.id} onClick={() => {
          handleTransactionSelection(recentTransaction)
          handleOpenTransaction()
        }}

        >
          <div className="left-side">
            <IonIcon icon={bagHandle} aria-hidden="true" />
            <div><span>{recentTransaction.type === "INCOME" ? recentTransaction.income.name : recentTransaction.type === "EXPENSE" ? recentTransaction.expense.name : recentTransaction.name}</span><span>{recentTransaction.type === "INCOME" ? formatDate(recentTransaction.income.created_on) : recentTransaction.type === "EXPENSE" ? formatDate(recentTransaction.expense.created_on) : <></>}</span></div>
          </div>

          <div className="right-side">
            <span>{recentTransaction.type === "INCOME" ? <>+ N$ {recentTransaction.income.amount}</> : recentTransaction.type === "EXPENSE" ? <>- N$ {recentTransaction.expense.amount}</> : null}</span>
            <span>{recentTransaction.type === "INCOME" ? getCategory(recentTransaction.income.category)[0].categoryName : recentTransaction.type === "EXPENSE" ? getCategory(recentTransaction.expense.category)[0].categoryName : <>Transfer</>}</span>
          </div>
        </div>
      ))}

      <IonModal
        isOpen={isTransactionModalOpen}
        onDidDismiss={handleCloseTransaction}
        ref={transactionModal}
        trigger="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className="modal"
        id="open-modal"
      >
        <IonRow
          class="ion-justify-content-center"
          className="modal-title"
        >
          <IonText>{transaction.type === "INCOME" ? transaction.income.name : transaction.type === "EXPENSE" ? transaction.expense.name : transaction.name}</IonText>
        </IonRow>
        <div className="selected-amount-date">
          <span className="amount">{transaction.type === "INCOME" ? <>N$ {transaction.income.amount}</> : transaction.type === "EXPENSE" ? <>N$ {transaction.expense.amount}</> : null}</span><span>&#9679;</span><span className="date">{transaction.type === "INCOME" ? formatDate(transaction.income.created_on) : transaction.type === "EXPENSE" ? formatDate(transaction.expense.created_on) : <></>}</span>
        </div>
        <div className="cat-and-type">
          <div className="cat">
            <span> <IonIcon aria-hidden={true} icon={arrowUpOutline} />{transaction.type}</span>
          </div>
          <div className={`type ${category.class}`} key={category.id} >
            <span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span>
          </div>
        </div>
        <div className="transaction-description">
          <p>Description</p>
          <span>{transaction.type === "INCOME" ? <>{transaction.income.description === "" ? <>No Description</> : transaction.income.description}</> : transaction.type === "EXPENSE" ? <>{transaction.expense.description === "" ? <>No Description</> : transaction.expense.description}</> : <>No Description</>}</span>
        </div>
        <div className="bottom-actions bottom-action-btns">
          <IonButton className='delete-btn'>Delete</IonButton>
          <IonButton className='' onClick={handleOpenEdit}>Edit</IonButton>
        </div>
      </IonModal>

      <IonModal isOpen={isEditModalOpen} ref={editModal} className="confirm-deposit">
        <IonHeader>
          <IonToolbar className='selected-category-header'>
            <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsEditModalOpen(false) }} /><IonTitle>{transaction.type === "INCOME" ? <>N$ {transaction.income.amount}</> : transaction.type === "EXPENSE" ? <>N$ {transaction.expense.amount}</> : null}</IonTitle></div>
          </IonToolbar>
        </IonHeader>
        <IonInput className="transaction-title " value={transaction.type === "INCOME" ? transaction.income.name : transaction.type === "EXPENSE" ? transaction.expense.name : transaction.name} />
        <div className="transaction-type-info">
          <div>
            <div className={` saved-category ${category.class}`}><span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span></div>
          </div>
          <p className={` saved-category ${transaction.type}`}> <span><IonIcon aria-hidden={true} icon={transaction.type === 'Expense' ? arrowUpOutline : arrowDownOutline} />{transaction.type}</span></p>
        </div>

        <div className="ion-padding confirm-content">
          <div className="description">
            <IonInput type="text"
              inputmode="text"
              className="description-input"
              value={transaction.type === "INCOME" ? transaction.income.description === "" ? 'Add Description' : transaction.income.description : transaction.type === "EXPENSE" ? transaction.expense.description === "" ? 'Add Description' : transaction.expense.description : 'Add Description'}

            />
          </div>


          <IonButton>Confirm</IonButton>
        </div>
      </IonModal>

      <IonModal isOpen={isAllTransactionModalOpen} ref={allTransactionsModal} className="confirm-deposit">
        <IonHeader>
          <IonToolbar className='selected-category-header'>
            <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => setAllIsTransactionModalOpen(false)} /><IonTitle>Transactions</IonTitle></div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="all-transactions">
            {transactions.map((recentTransaction: any) => (
              <div className="receipt-card" key={recentTransaction.id} onClick={() => {
                handleTransactionSelection(recentTransaction)
                handleOpenTransaction()
              }}
              >
                <div className="left-side">
                  <IonIcon icon={bagHandle} aria-hidden="true" />
                  <div><span>{recentTransaction.type === "INCOME" ? recentTransaction.income.name : recentTransaction.type === "EXPENSE" ? recentTransaction.expense.name : recentTransaction.name}</span><span>{recentTransaction.type === "INCOME" ? formatDate(recentTransaction.income.created_on) : recentTransaction.type === "EXPENSE" ? formatDate(recentTransaction.expense.created_on) : <></>}</span></div>
                </div>
                <div className="right-side">
                  <span>{recentTransaction.type === "INCOME" ? <>+ N$ {recentTransaction.income.amount}</> : recentTransaction.type === "EXPENSE" ? <>- N$ {recentTransaction.expense.amount}</> : null}</span>
                  <span>{recentTransaction.type === "INCOME" ? getCategory(recentTransaction.income.category)[0].categoryName : recentTransaction.type === "EXPENSE" ? getCategory(recentTransaction.expense.category)[0].categoryName : <>Transfer</>}</span>
                </div>
              </div>
            )).reverse()}
          </div>
        </IonContent>
      </IonModal>
    </div>

  );
};

export default RecentTransactions;
