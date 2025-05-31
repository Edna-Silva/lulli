import {
    IonButton,
    IonDatetime,
    IonDatetimeButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonModal,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAddExpenseMutation, useUpdateExpenditureBudgetMutation, useAddIncomeMutation, useAddPlannedPaymentMutation, useAddStatisticsMutation, useAddTransactionMutation } from "../../services/backend";
import "./styles.scss";

import { apertureOutline, arrowDownOutline, arrowUpOutline, bagHandleOutline, calendarClear, carSportOutline, cashOutline, checkmarkCircle, closeCircle, fastFoodOutline, flashOutline, giftOutline, videocamOutline } from "ionicons/icons";
import moment from "moment";
import { useHistory } from "react-router";
import { fetchAndStoreAPIData } from "../../utils/util";
interface ICategory {
    name: string;
    categoryName: string;
    class: string;
    id: number;
}
const AddTransaction = ({ addModalOpen, addModalClose }: any) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const categories = [
        { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
        { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
        { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
        { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
        { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
        { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
        { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

    ]

    const addWalletModal = useRef<HTMLIonModalElement>(null);

    const [addExpense] = useAddExpenseMutation()
    const [addIncome] = useAddIncomeMutation()
    const [addTransaction] = useAddTransactionMutation()
    const [addPlannedPayment] = useAddPlannedPaymentMutation()
    const [addStatistic] = useAddStatisticsMutation()
    const [updateExpenditureBudget] = useUpdateExpenditureBudgetMutation()



    const [transactionType, setTransactionType] = useState('')
    const [transactionCategory, setTransactionCategory] = useState<ICategory>({ name: '', categoryName: '', class: '', id: 0 })
    const [plannedTransaction, setPlannedTransaction] = useState<boolean>(false)
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(true)
    const [transactionTitle, setTransactionTitle] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const datePickerRef = useRef<any>(null);

    const handleDateChange = (event: CustomEvent) => {
        setSelectedDate(event.detail.value);
    };

    const handleOpenDatePicker = () => {
        datePickerRef.current.open();
    };
    const handleTitleInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setTransactionTitle(value);
    };

    const [description, setDescription] = useState('')
    const handleDescriptionInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setDescription(value);
    };

    const [isEnterAmountModalOpen, setIsEnterAmountModalOpen] = useState(false);
    const enterAmountModal = useRef<HTMLIonModalElement>(null);
    const handleOpenEnterAmount = () => {
        setIsEnterAmountModalOpen(true)
    }

    const handleCloseEnterAmount = () => {
        setIsEnterAmountModalOpen(false)
    }
    const [amount, setAmount] = useState<number>(0);
    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setAmount(value);
    };

    const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(false);
    const selectCategoryModal = useRef<HTMLIonModalElement>(null);
    const handleOpenSelectCategory = () => {
        setIsSelectCategoryModalOpen(true)
    }

    const handleCloseSelectCategory = () => {
        setIsSelectCategoryModalOpen(false)
    }

    const confirmOpenModal = useRef<HTMLIonModalElement>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const handleOpenConfirmDeposit = () => {
        setIsConfirmOpen(true)
    }

    const [selectType, setSelectTypeOpen] = useState(false);
    const selectTypeModal = useRef<HTMLIonModalElement>(null);
    const handleOpenSelectType = () => {
        setSelectTypeOpen(true)
    }

    const handleCloseSelectType = () => {
        setSelectTypeOpen(false)
    }

    const [isPlanForModalOpen, setIsPlanForModalOpen] = useState(false);
    const planForModal = useRef<HTMLIonModalElement>(null);
    const handleOpenPlanFor = () => {
        setIsPlanForModalOpen(true)
    }
    const handleClosePlanFor = () => {
        setIsPlanForModalOpen(false)
    }

    const handleCompleteAddTransaction = () => {
        const transactionData = {
            name: transactionTitle,
            category: transactionCategory.id,
            amount: amount,
            description: description
        }

        const transaction = {
            type: transactionType.toUpperCase(),
            income: transactionType === 'Income' ? transactionData : null,
            expense: transactionType === 'Expense' ? transactionData : null
        }

        const statData = {
            time: moment().format('HH:mm:ss'),
            day: moment().date(),
            week: moment().weekYear(),
            month: moment().month(),
            year: moment().year(),
            amount: amount,
            type: transactionType.toUpperCase()
        }

        const budgetData = {
            category: transactionCategory.id,
            amount: amount
        }
        addTransaction(transaction)
        addStatistic(statData)
        updateExpenditureBudget(budgetData)
        // window.location.reload()

    }

    const [occurrence, setOccurrence] = useState(1)
    const handleOccurrenceInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setOccurrence(value);
    };

    const cycleValues = ["Day", "Week", "Month", "Year"];
    const [currentIndex, setCurrentIndex] = useState(2)
    const previousCycle = () => {
        setCurrentIndex((currentIndex - 1 + cycleValues.length) % cycleValues.length)
    }

    const nextCycle = () => {
        setCurrentIndex((currentIndex + 1) % cycleValues.length)
    }

    const [plannedDate, setPlannedDate] = useState<any>(new Date().toISOString())
    const handlePlannedDate = (event: CustomEvent) => {
        setPlannedDate(event.detail.value)
    }
    const handleCompletePlannedPayment = () => {
        const transaction = {
            is_recurring: !recurringTransaction,
            repeat_occurrence: occurrence,
            repeat_schedule: cycleValues[currentIndex].toUpperCase(),
            transaction_type: transactionType.toUpperCase(),
            name: transactionTitle,
            category: transactionCategory.id,
            amount: amount,
            description: description,
            payment_date: plannedDate
        }

       

        addPlannedPayment(transaction)
        console.log(transaction);

        // history.go(0)
    }

    const handleComplete =  async() => {
        if (plannedTransaction) {
            handleCompletePlannedPayment()
        } else {
            handleCompleteAddTransaction()
        }
        await fetchAndStoreAPIData(dispatch)
        window.location.reload()

    }
    return (
        <>
            <IonModal
                isOpen={addModalOpen}
                onDidDismiss={addModalClose}
                ref={addWalletModal}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText></IonText>
                </IonRow>
                <IonRow>
                    <div className="transaction-option planned-payment-option" onClick={() => {
                        addModalClose()
                        setPlannedTransaction(true)
                        handleOpenSelectType()
                    }}>
                        <span> <IonIcon aria-hidden={true} icon={flashOutline} />  Add Planned Payment</span>
                    </div>
                </IonRow>
                <IonRow>
                    <div className="transaction-option expense-option" onClick={() => {
                        addModalClose()
                        setTransactionType('Expense')
                        handleOpenEnterAmount()
                    }}>
                        <span> <IonIcon aria-hidden={true} icon={arrowUpOutline} />Add Expense</span>
                    </div>
                </IonRow>
                <IonRow>
                    <div className="transaction-option income-option" onClick={() => {
                        addModalClose()
                        setTransactionType('Income')
                        handleOpenEnterAmount()
                    }}>
                        <span> <IonIcon aria-hidden={true} icon={arrowDownOutline} /> Add Income</span>
                    </div>
                </IonRow>
                <div className="transaction-bottom-actions">
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" onClick={addModalClose} />

                </div>
            </IonModal>

                <IonModal
                    isOpen={selectType}
                    onDidDismiss={handleCloseSelectType}
                    ref={selectTypeModal}
                    trigger="open-modal"
                    initialBreakpoint={1}
                    breakpoints={[0, 1]}
                    className="modal"
                >
                    <IonRow
                        class="ion-justify-content-center"
                        className="modal-title"
                    >
                        <IonText>Select Type</IonText>
                    </IonRow>
                    <IonRow>
                        <div className="planned-expense-option" onClick={() => {
                            handleCloseSelectType()
                            setTransactionType('Expense')
                            handleOpenEnterAmount()
                        }
                        }>
                            <span> <IonIcon aria-hidden={true} icon={arrowUpOutline} />Expense</span>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className="planned-income-option" onClick={() => {
                            handleCloseSelectType()
                            setTransactionType('Income')
                            handleOpenEnterAmount()
                        }}>
                            <span> <IonIcon aria-hidden={true} icon={arrowDownOutline} /> Income</span>
                        </div>
                    </IonRow>
                    <div className="transaction-bottom-actions">
                        <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" onClick={addModalClose} />
                    </div>
                </IonModal>
                <IonModal
                    isOpen={isEnterAmountModalOpen}
                    onDidDismiss={handleCloseEnterAmount}
                    ref={enterAmountModal}
                    trigger="open-modal"
                    initialBreakpoint={1}
                    breakpoints={[0, 1]}
                    className="modal"
                >
                    <IonRow
                        class="ion-justify-content-center"
                        className="modal-title"
                    >
                        <IonText>Enter Amount</IonText>
                    </IonRow>
                    <IonRow>
                        <IonInput type="number" min={0} className="enter-amount" value={amount}
                            onIonChange={handleInputChange}
                            inputmode="numeric" />
                    </IonRow>
                    <div className="bottom-actions">
                        <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" onClick={handleCloseEnterAmount} />
                        <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                            handleCloseEnterAmount()
                            handleOpenSelectCategory()
                        }} />
                    </div>
                </IonModal>
                <IonModal
                    isOpen={isSelectCategoryModalOpen}
                    onDidDismiss={handleCloseSelectCategory}
                    ref={selectCategoryModal}
                    trigger="open-modal"
                    initialBreakpoint={1}
                    breakpoints={[0, 1]}
                    className="modal"
                >
                    <IonRow
                        class="ion-justify-content-center"
                        className="modal-title"
                    >
                        <IonText>Select Category</IonText>
                    </IonRow>
                    <IonRow className="saved-categories">
                        {categories.map((category) => (
                            <div className={`saved-category ${category.class}`} key={category.id} onClick={() => {
                                handleCloseSelectCategory()
                                setTransactionCategory(category)
                                plannedTransaction ? handleOpenPlanFor() : handleOpenConfirmDeposit()
                            }}>
                                <span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span>
                            </div>
                        ))}
                    </IonRow>
                </IonModal>
                <IonModal
                    isOpen={isPlanForModalOpen}
                    onDidDismiss={handleClosePlanFor}
                    ref={planForModal}
                    trigger="open-modal"
                    initialBreakpoint={1}
                    breakpoints={[0, 1]}
                    className="modal"
                >
                    <IonRow
                        class="ion-justify-content-center"
                        className="modal-title"
                    >
                        <IonText>Plan For</IonText>
                    </IonRow>
                    <IonRow className="saved-categories">
                        <div className="recurring-option">
                            <span className={recurringTransaction ? "selected-option" : "unselected-option"} onClick={() => { setRecurringTransaction(true) }}>One Time</span>
                            <span className={recurringTransaction ? "unselected-option" : "selected-option"} onClick={() => { setRecurringTransaction(false) }}>Recurring</span>
                        </div>
                    </IonRow>
                    <div className="date-selector">
                        {!recurringTransaction ? (<span className="starts-on">Starts On</span>) : null}
                        <span>
                            <IonInput
                                ref={datePickerRef}
                                value={selectedDate}
                                onIonChange={handleDateChange}
                                type="date"
                                style={{ 'display': 'none' }}
                            />
                            <IonDatetimeButton className="date-time-picker" datetime="datetime"> </IonDatetimeButton>
                            <IonIcon onClick={() => { setDatePickerOpen(true) }} icon={calendarClear} aria-hidden={true} className="bottom-icons" size="larger" />
                        </span>
                    </div>
                    {!recurringTransaction ? (
                        <div className="repeats-every">
                            <div className="occurrence">
                                <span>Repeats Every</span>
                                <IonInput type="number" min={1} className="repeats-every-amount" value={occurrence}
                                    onIonChange={handleOccurrenceInputChange}
                                    inputmode="numeric" />
                            </div>
                            <div className="month-cycle">
                                <svg width="20" height="20" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={previousCycle}>
                                    <path d="M6.49081 8.75L6.49081 1.25C6.49057 1.17407 6.46963 1.09964 6.43023 1.03472C6.39084 0.969804 6.33449 0.916861 6.26724 0.881588C6.2 0.846315 6.12441 0.83005 6.04861 0.834543C5.9728 0.839036 5.89966 0.864117 5.83706 0.907086L0.420391 4.65709C0.195807 4.8125 0.195807 5.18667 0.420391 5.3425L5.83706 9.0925C5.89953 9.13591 5.97271 9.16136 6.04864 9.1661C6.12457 9.17084 6.20034 9.15468 6.26773 9.11937C6.33511 9.08407 6.39154 9.03097 6.43087 8.96585C6.4702 8.90073 6.49093 8.82608 6.49081 8.75ZM1.38956 5L5.65747 2.045V7.955L1.38956 5Z" fill="#040316" />
                                </svg>
                                <span>{cycleValues[currentIndex]}</span>
                                <svg width="20" height="20" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={nextCycle}>
                                    <path d="M0.82267 1.25L0.82267 8.75C0.822908 8.82593 0.843851 8.90036 0.883244 8.96528C0.922637 9.0302 0.978988 9.08314 1.04623 9.11841C1.11348 9.15368 1.18907 9.16995 1.26487 9.16546C1.34067 9.16096 1.41381 9.13588 1.47642 9.09291L6.89309 5.34291C7.11767 5.1875 7.11767 4.81333 6.89309 4.6575L1.47642 0.907497C1.41394 0.864091 1.34077 0.838637 1.26484 0.8339C1.18891 0.829163 1.11314 0.845324 1.04575 0.880628C0.978363 0.915932 0.921939 0.969029 0.88261 1.03415C0.84328 1.09927 0.82255 1.17392 0.82267 1.25ZM5.92392 5L1.656 7.955L1.656 2.045L5.92392 5Z" fill="#040316" />
                                </svg>
                            </div>
                        </div>
                    ) : ''
                    }
                    <div className="bottom-actions">
                        <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" />
                        <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                            handleClosePlanFor()
                            handleOpenConfirmDeposit()
                        }} />
                    </div>
                </IonModal>
                <IonModal keepContentsMounted={true}>
                    <IonDatetime id="datetime" presentation="date"
                        formatOptions={{
                            date: {
                                weekday: 'long',
                                month: 'long',
                                day: '2-digit',
                                year: "numeric"
                            }
                        }}
                        value={plannedDate}
                        onIonChange={handlePlannedDate}
                    ></IonDatetime>
                </IonModal>
                <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                    <IonHeader>
                        <IonToolbar>
                            <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>N$ {amount}</IonTitle></div>
                        </IonToolbar>
                    </IonHeader>
                    <IonInput placeholder={`${transactionType} Title`} className="transaction-title " value={transactionTitle} onIonInput={handleTitleInputChange} />
                    <div className="transaction-type-info">
                        <div>
                            <div className={` saved-category ${transactionCategory.class}`}><span><IonIcon aria-hidden={true} icon={transactionCategory.name} />{transactionCategory.categoryName}</span></div>
                        </div>
                        <p className={` saved-category ${transactionType}`}> <span><IonIcon aria-hidden={true} icon={transactionType === 'Expense' ? arrowUpOutline : arrowDownOutline} />{transactionType}</span></p>
                    </div>
                    <div className="ion-padding confirm-content">
                        <div className="description">
                            <IonInput type="text"
                                inputmode="text"
                                placeholder="Add Description"
                                className="description-input"
                                value={description}
                                onIonInput={handleDescriptionInputChange}
                            />
                        </div>
                        <div className="created-on">
                            <p> {plannedTransaction ? (<span>Planned For</span>) : (<span>Created On</span>)} <span>{plannedTransaction ? moment(plannedDate).format('D MMM.') : moment().format('D MMM. HH:mm')}</span> </p>
                            {!recurringTransaction ? <p className="repeats-every-text">Repeats Every {occurrence} {cycleValues[currentIndex]}</p> : null}
                        </div>
                        <IonButton type="submit"
                            onClick={(e) => {
                                handleComplete()
                            }}

                        >Confirm</IonButton>
                    </div>
                </IonModal>

        </>
    );
};

export default AddTransaction;
