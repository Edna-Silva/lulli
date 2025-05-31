import React, { useRef, useState, useEffect } from "react";
import {
    IonContent,
    IonPage,
    IonTitle,
    IonButton,
    IonText,
    IonCol,
    IonRow,
    IonModal,
    IonInput,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonButtons
} from "@ionic/react";
import "./styles.scss";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import moment from "moment";
import { useUpdateWalletMutation, useGetBankAccountsQuery, useUpdateBankAccountsMutation, useAddTransactionMutation, useAddExpenseMutation } from "../../services/backend";
import storage from "../../redux/store";
import MTC from '../../assets/mtc_namibia_logo.png'

import { closeCircle, checkmarkCircle } from "ionicons/icons";

const WalletBuy = ({ buyModalOpen, buyModalClose }: any) => {



    const [updateWallet] = useUpdateWalletMutation()
    const [addTransaction] = useAddTransactionMutation()
    const [addExpense] = useAddExpenseMutation()
    const walletBuy = useRef<HTMLIonModalElement>(null);
    const { currentWallet } = useSelector((state: any) => state.wallet)


    const [isEnterAmountModalOpen, setIsEnterAmountModalOpen] = useState(false);
    const enterAmountModal = useRef<HTMLIonModalElement>(null);
    const handleOpenEnterAmount = () => {
        setIsEnterAmountModalOpen(true)
    }

    const handleCloseEnterAmount = () => {
        setIsEnterAmountModalOpen(false)
    }


    const [amount, setAmount] = useState<number>(0);
    const [selectedBankAccount, setSelectedBankAccount] = useState<any>()

    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value || '';
        setAmount(value);
    };



    const confirmOpenModal = useRef<HTMLIonModalElement>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const handleOpenConfirmDeposit = () => {
        setIsConfirmOpen(true)
    }

    const handleCompletePurchase = async () => {
        setIsConfirmOpen(false)
        const updatedWalletBalance = Number(currentWallet.balance) - Number(amount)
        const walletData = {
            account_number: currentWallet.account_number,
            balance: updatedWalletBalance
        }

        const expenseData = {
            name: 'MTC Airtime',
            amount: amount,
            category: 5,
            description: `Airtime Purchase to ${phoneNumber}`,
            user: ''
        }
        const transactionData = {}


        updateWallet(walletData)
        setTimeout(() => {
            window.location.reload()
          }, 2000);
    }

    const [isEnterPhoneNumber, setIsEnterPhoneNumber] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const enterPhoneNumber = useRef<HTMLIonModalElement>(null);
    const handleOpenEnterPhoneNumber = () => {
        setIsEnterPhoneNumber(true)
    }

    const handleCloseEnterPhoneNumber = () => {
        setIsEnterPhoneNumber(false)
    }

    const formatPhoneNumber = (phoneNumber: string | any[]) => {
        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    }

    const handlePhoneNumberInput = (e: CustomEvent) => {
        const value = e.detail.value || '';
        setPhoneNumber(value)
    }
    return (
        <>
            <IonModal isOpen={buyModalOpen} ref={walletBuy} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { buyModalClose() }} /><IonTitle>Buy</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <div className="ion-padding purchase-items">
                    <div className="purchase-item" onClick={e => handleOpenEnterAmount()}>
                        <span className="item-logo"><img src={MTC} alt="mtc-namibia" /></span>
                        <span className="item-name">MTC Airtime</span>
                    </div>


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
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" />
                    <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                        handleCloseEnterAmount()
                        handleOpenEnterPhoneNumber()
                    }} />
                </div>
            </IonModal>

            <IonModal
                isOpen={isEnterPhoneNumber}
                onDidDismiss={handleCloseEnterPhoneNumber}
                ref={enterPhoneNumber}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText>Enter Phone Number</IonText>
                </IonRow>
                <IonRow>
                    <IonInput type="text" className="enter-amount" value={phoneNumber}
                        onIonChange={handlePhoneNumberInput}
                        inputmode="numeric" 
                        minlength={10}
                        />
                </IonRow>
                <div className="bottom-actions">
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons" />
                    <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={() => {
                        handleCloseEnterPhoneNumber()
                        handleOpenConfirmDeposit()
                    }} />
                </div>
            </IonModal>

            <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>Confirm Purchase</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div className="deposit-info">
                        <p><span>Amount</span> <span>N$ {amount}</span></p>
                        <p><span>To</span> <span>{formatPhoneNumber(phoneNumber)}</span></p>
                        <p><span>Date</span> <span>{moment().format('dddd, MMM D')}</span></p>
                    </div>
                    {/* <p>Scan fingerprint to confirm </p> */}
                    <br />
                    <IonButton onClick={handleCompletePurchase}>Confirm</IonButton>
                </IonContent>
            </IonModal>
        </>
    );
};

export default WalletBuy;
