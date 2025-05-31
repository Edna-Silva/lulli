import { IonButton, IonHeader, IonIcon, IonModal, IonRow, IonText, IonTitle, IonToolbar, createGesture } from "@ionic/react";
import { apertureOutline, arrowDownOutline, arrowUpOutline, bagHandleOutline, carSportOutline, cashOutline, closeCircle, fastFoodOutline, giftOutline, videocamOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import storage from "../../redux/store";
import { useGetPlannedPaymentsQuery, useAddStatisticsMutation, useUpdatePlannedPaymentMutation, useAddTransactionMutation, useDeletePlannedPaymentMutation, useUpdateExpenditureBudgetMutation } from "../../services/backend";
import './styles.scss';
import moment from "moment";
import { isEqual } from "lodash";
import { fetchAndStoreAPIData } from "../../utils/util";
import { useDispatch } from "react-redux";

const Upcoming = () => {
    const dispatch = useDispatch()
    const { data: plannedpayments = [] } = useGetPlannedPaymentsQuery()
    const [allPlannedPayments, setAllPlannedPayments] = useState<any>([])
    const allUpcomingTransactionsModal = useRef<HTMLIonModalElement>(null);
    const isPlannedPaymentModal = useRef<HTMLIonModalElement>(null);
    const [isAllUpcomingTransactionsModalOpen, setAllIsUpcomingTransactionsModalOpen] = useState(false);
    const [plannedPaymentExpense, setPlannedPaymentExpense] = useState(0)
    const [plannedPaymentIncome, setPlannedPaymentIncome] = useState(0)
    const [isPlannedPaymentModalOpen, setIsPlannedPaymentModalOpen] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState<any>({})
    const [addTransaction] = useAddTransactionMutation()
    const [updatePlannedPayment] = useUpdatePlannedPaymentMutation()
    const [deletePlannedPayment] = useDeletePlannedPaymentMutation()
    const [addStatistic] = useAddStatisticsMutation()
    const [updateExpenditureBudget] = useUpdateExpenditureBudgetMutation()
    const handleOpenAllTransaction = () => {
        setAllIsUpcomingTransactionsModalOpen(true)
    }

    const getExpensesAndIncome = (plannedpayments: any) => {
        let totalExpense = 0;
        let totalIncome = 0;
        plannedpayments.forEach((item: { transaction_type: string, amount: number; }) => { if (item.transaction_type === "EXPENSE") { totalExpense += item.amount } else { totalIncome += item.amount } });
        setPlannedPaymentExpense(totalExpense)
        setPlannedPaymentIncome(totalIncome)
    }

    useEffect(() => {
        const storePlannedPayments = async () => {
            const existingPlannedPayments = await storage.get('plannedpayments');
            if (plannedpayments) {
                try {
                    await storage.set('plannedpayments', plannedpayments);
                    setAllPlannedPayments(plannedpayments)
                    getExpensesAndIncome(plannedpayments)
                } catch (err) {
                    console.error("Error storing wallets:", err);
                }
                let filteredPayments: any = []
                try {
                    existingPlannedPayments.forEach((item: any) => {
                        const paymentDate = new Date(item.payment_date)
                        if (paymentDate.getMonth() === moment().month() && paymentDate.getFullYear() === moment().year()) {
                            filteredPayments.push(item)
                        }
                    });
                    setAllPlannedPayments(filteredPayments)
                    getExpensesAndIncome(filteredPayments)
                } catch (error) {
                    console.error(error);

                }
            }
            else {
                let filteredPayments: any = []
                try {
                    existingPlannedPayments.forEach((item: any) => {
                        const paymentDate = new Date(item.payment_date)
                        if (paymentDate.getMonth() === moment().month() && paymentDate.getFullYear() === moment().year()) {
                            filteredPayments.push(item)
                        }
                    });
                    setAllPlannedPayments(filteredPayments)
                    getExpensesAndIncome(filteredPayments)
                } catch (error) {
                    console.error(error);

                }
            }


        }

        storePlannedPayments()
    }, [])

    useEffect(() => {
        const refreshPayments = async () => {
            const existingPlannedPayments = await storage.get('plannedpayments');
            if (!isEqual(plannedpayments, existingPlannedPayments) && plannedpayments) {
                await storage.set('plannedpayments', plannedpayments)
                setAllPlannedPayments(plannedpayments)
                getExpensesAndIncome(plannedpayments)
                let filteredPayments: any = []
                try {
                    plannedpayments.forEach((item: any) => {
                        const paymentDate = new Date(item.payment_date)
                        if (paymentDate.getMonth() === moment().month() && paymentDate.getFullYear() === moment().year() ) {
                            filteredPayments.push(item)
                        }
                    });
                    setAllPlannedPayments(filteredPayments)
                    getExpensesAndIncome(filteredPayments)
                } catch (error) {
                    console.error(error);

                }
            } 
        }

        refreshPayments()
    }, [plannedpayments])
    const categories = [
        { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
        { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
        { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
        { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
        { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
        { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
        { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

    ]
    const formatDate = (inputDate: Date) => {
        const today = moment();
        const date = moment(inputDate);

        if (date.isSame(today, 'day')) {
            return "Today, " + date.format("h:mm A");
        } else {
            return date.format("D MMM YYYY, h:mm A");
        }
    }
    const [category, setCategory] = useState<any>({})

    const getCategory = (categoryId: number) => {
        const category = categories.filter((cat: any) => {
            return cat.id === categoryId
        })

        return category
    }
    const handleSelectPayment = (payment: any) => {
        const category = categories.filter((cat: any) => {
            return cat.id === payment.category
        })

        setSelectedPayment(payment)
        setCategory(category[0])
    }

    const handleEditPayment = async () => {

        const transactionData = {
            name: selectedPayment.name,
            category: selectedPayment.category,
            amount: selectedPayment.amount,
            description: selectedPayment.description
        }


        const transaction = {
            type: selectedPayment.transaction_type.toUpperCase(),
            income: selectedPayment.transaction_type === 'INCOME' ? transactionData : null,
            expense: selectedPayment.transaction_type === 'EXPENSE' ? transactionData : null
        }

        const paymentData: any = {
            id: selectedPayment.id
        }

        const statData = {
            time: moment().format('HH:mm:ss'),
            day: moment().date(),
            week: moment().weekYear(),
            month: moment().month(),
            year: moment().year(),
            amount: transactionData.amount,
            type: selectedPayment.transaction_type.toUpperCase()
        }
        if (selectedPayment.is_recurring) {

            let newDate = null
            const oldDate = new Date(selectedPayment.payment_date)
            if (selectedPayment.repeat_schedule === 'MONTH') {
                newDate = new Date(oldDate.setMonth(oldDate.getMonth() + selectedPayment.repeat_occurrence))
            } else if (selectedPayment.repeat_schedule === 'DAY') {
                newDate = new Date(oldDate.setDate(oldDate.getDate() + selectedPayment.repeat_occurrence))
            } else if (selectedPayment.repeat_schedule === 'YEAR') {
                newDate = new Date(oldDate.setFullYear(oldDate.getFullYear() + selectedPayment.repeat_occurrence))
            } else if (selectedPayment.repeat_schedule === 'WEEK') {
                newDate = new Date(oldDate.setDate(oldDate.getDate() + (selectedPayment.repeat_occurrence * 7)))
            }

            paymentData.payment_date = newDate
            updatePlannedPayment(paymentData)
        } else {
            deletePlannedPayment(paymentData)
        }

        const budgetData = {
            category: transactionData.category,
            amount: transactionData.amount
        }
        addStatistic(statData)
        updateExpenditureBudget(budgetData)
        addTransaction(transaction)
        await fetchAndStoreAPIData(dispatch)
        window.location.reload()

    }

    const capitalise = (text: string = '') => {
        return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase()
    }
    return (
        <div className="upcoming-expenses">
            <div className="header">
                <IonText>Upcoming Transactions</IonText>
                <span onClick={handleOpenAllTransaction}>View All</span>
            </div>
            <div className="upcoming-expenses-income"><span className="expenses"><IonIcon aria-hidden={true} icon={arrowUpOutline} />  Expenses: N$ {plannedPaymentExpense}</span> <span>&#9679;</span> <span className="income"><IonIcon aria-hidden={true} icon={arrowDownOutline} /> Income: N$ {plannedPaymentIncome}</span></div>


            <IonModal isOpen={isAllUpcomingTransactionsModalOpen} ref={allUpcomingTransactionsModal} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar className='selected-category-header'>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setAllIsUpcomingTransactionsModalOpen(false) }} /><IonTitle>Upcoming Transactions</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <div className="all-transactions">
                    {allPlannedPayments.map((plannedpayment: any) => (
                        <div className="planned-payment-card" onClick={() => {
                            handleSelectPayment(plannedpayment)
                            setIsPlannedPaymentModalOpen(true)
                        }}
                            key={plannedpayment.id}
                        >
                            <div>
                                <span className="payment-name">{plannedpayment.name}</span>
                                <span>{plannedpayment.is_recurring ? `${plannedpayment.repeat_occurrence} - ${capitalise(plannedpayment.repeat_schedule)}` : formatDate(plannedpayment.payment_date)}</span>
                            </div>
                            <div className="right-details">
                                <span className="amount">{plannedpayment.transaction_type === 'EXPENSE' ? `- N$ ${plannedpayment.amount}` : `+ N$ ${plannedpayment.amount}`}</span>
                                <span >{getCategory(plannedpayment.category)[0].categoryName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </IonModal>

            <IonModal
                isOpen={isPlannedPaymentModalOpen}
                onDidDismiss={() => setIsPlannedPaymentModalOpen(false)}
                ref={isPlannedPaymentModal}
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
                    <IonText>{selectedPayment.name}</IonText>
                </IonRow>
                <div className="selected-amount-date">
                    <span className="amount">{`N$ ${selectedPayment.amount}`}</span><span>&#9679;</span><span className="date">{selectedPayment.is_recurring ? `${selectedPayment.repeat_occurrence} - ${capitalise(selectedPayment.repeat_schedule)}` : selectedPayment.payment_date}</span>
                </div>
                <div className="cat-and-type">
                    <div className="cat">
                        <span> <IonIcon aria-hidden={true} icon={selectedPayment.transaction_type === 'EXPENSE' ? arrowUpOutline : arrowDownOutline} />{capitalise(selectedPayment.transaction_type)}</span>
                    </div>
                    <div className={`type ${category.class}`} key={category.id} >
                        <span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span>
                    </div>
                </div>
                <div className="transaction-description">
                    <p>Description</p>
                    <span>{selectedPayment.description ? selectedPayment.description : 'No Description'}</span>
                </div>
                <div className="bottom-actions bottom-action-btns">
                    <IonButton className='delete-btn'>Delete</IonButton>
                    <IonButton className='' onClick={handleEditPayment}>{selectedPayment.transaction_type === 'EXPENSE' ? 'Pay' : 'Get'}</IonButton>
                </div>
            </IonModal>
        </div>
    )
}

export default Upcoming