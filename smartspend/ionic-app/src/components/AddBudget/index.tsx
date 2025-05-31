import {
    IonButton,
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
import { useAddBudgetMutation } from "../../services/backend";
import "./styles.scss";
import { useDispatch } from "react-redux";

import { apertureOutline, bagHandleOutline, carSportOutline, cashOutline, checkmarkCircle, closeCircle, fastFoodOutline, giftOutline, videocamOutline } from "ionicons/icons";
import moment from "moment";
import storage from "../../redux/store";
import { fetchAndStoreAPIData } from "../../utils/util";
interface ICategory {
    name: string;
    categoryName: string;
    class: string;
    id: number;
}
const AddBudget = ({ addModalOpen, addModalClose }: any) => {

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

    const [addBudget] = useAddBudgetMutation()




    const [budgetCategory, setBudgetCategory] = useState<ICategory>({ name: '', categoryName: '', class: '', id: 0 })

    const [wallets, setWallets] = useState<any>([])




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

    const [budgetName, setBudgetName] = useState('')
    const handleBudgetNameChange = (event: CustomEvent) => {
        const value = event.detail.value
        setBudgetName(value);
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




    const [selectedWallet, setSelectedWallet] = useState<any>({})
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const selectWalletModal = useRef<HTMLIonModalElement>(null)
    const handleOpenSelectWalletModal = () => {
        retrieveWallets()
        setIsWalletModalOpen(true)
    }
    const handleCloseSelectWalletModal = () => {
        setIsWalletModalOpen(false)
    }

    const retrieveWallets = async () => {
        try {
            const storedWallets = await storage.get('wallets');
            setWallets(storedWallets)
        } catch (err) {
            console.error("Error retrieving wallets:", err);
        }
    }





    const handleCompleteAddBudget = async () => {


        const budgetData = {
            categories: {
                id: budgetCategory.id,
                name: budgetCategory.categoryName,
                icon_name: ''
            },
            name: budgetName,
            total_amount: amount,
            wallet: selectedWallet.account_number,
            month: moment().month(),
            year: moment().year()
        }


        addBudget(budgetData)
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
                    <IonText>Create Budget</IonText>
                </IonRow>

                <IonRow>
                    <IonInput type="text" className="enter-budget" placeholder="Budget Name" value={budgetName}
                        onIonChange={handleBudgetNameChange} />
                </IonRow>
                <div className="bottom-actions">
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" />
                    <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                        addModalClose()
                        handleOpenSelectCategory()
                    }} />
                </div>
            </IonModal>

            <IonModal
                isOpen={isWalletModalOpen}
                onDidDismiss={handleCloseSelectWalletModal}
                ref={selectWalletModal}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText>Select Wallet</IonText>
                </IonRow>
                {wallets.map((wallet: any) => (
                    <div className="accounts" onClick={() => {
                        handleCloseSelectWalletModal()
                        setSelectedWallet(wallet)
                        handleOpenEnterAmount()
                    }} key={wallet.account_number}>
                        <span className="account-name">{wallet.name}</span>
                        <span className="account-balance">Available<span>N$ {wallet.balance}</span> </span>
                    </div>
                ))}
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
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" />
                    <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                        handleCloseEnterAmount()
                        handleOpenConfirmDeposit()
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
                            setBudgetCategory(category)
                            handleOpenSelectWalletModal()
                        }}>
                            <span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span>
                        </div>
                    ))}
                </IonRow>
            </IonModal>


            <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>{budgetName}</IonTitle></div>
                    </IonToolbar>
                </IonHeader>


                <div className="wallet-type-info">
                    <div className={` saved-category ${budgetCategory.class}`}>
                        <span>
                            <IonIcon aria-hidden={true} icon={budgetCategory.name} />
                            {budgetCategory.categoryName}
                        </span>
                    </div>
                    <span>&#9679;</span>
                    <span className="budget-amount-confirm">N$ {amount}</span>

                </div>

                <div className="ion-padding confirm-content">
                    <IonButton onClick={() => {
                        handleCompleteAddBudget()
                    }}>Confirm</IonButton>
                </div>
            </IonModal>

        </>
    );
};

export default AddBudget;
