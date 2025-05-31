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
import { useSelector, useDispatch } from "react-redux";
import moment from"moment"; 
import { useUpdateWalletMutation, useGetBankAccountsQuery, useUpdateBankAccountsMutation, useGetWalletsQuery } from "../../services/backend";
import storage from "../../redux/store";
import { setWallets } from "../../services/wallet/wallet.slice";
import { fetchAndStoreAPIData } from "../../utils/util";

import { closeCircle, checkmarkCircle } from "ionicons/icons";
import { isEqual } from "lodash";

const WalletAddFunds = ({ addFundsModalOpen, addFundsModalClose }: any) => {
    
    const {data: accounts = []} = useGetBankAccountsQuery()
    const {data: wallets = []} = useGetWalletsQuery()
    const dispatch = useDispatch()
    
    const [updateWallet] = useUpdateWalletMutation()
    const [updateBankAccount] = useUpdateBankAccountsMutation()
    const selectAccountModal = useRef<HTMLIonModalElement>(null);
    const {currentWallet} = useSelector((state: any)=> state.wallet)


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

    useEffect(() => {
        const storeWallets = async () => {
            const existingWallets = await storage.get('wallets');

            const walletsChanged = !isEqual(wallets, existingWallets);
            if (walletsChanged && wallets) {
                try {
                    await storage.set('wallets', wallets);
                    dispatch(setWallets(wallets))
                } catch (err) {
                    console.error("Error storing wallets:", err);
                }
            }
        }

        storeWallets()
        
    }, [wallets])
    const handleCompleteAddFunds = async () => {
        setIsConfirmOpen(false)
        const updatedWalletBalance = Number(currentWallet.balance) + Number(amount) 
        const updatedBankAccountBalance = Number(selectedBankAccount.balance) - Number(amount)
        const walletData = {
            account_number: currentWallet.account_number,
            balance: updatedWalletBalance
        }

        const bankData = {
            account_number: selectedBankAccount.account_number,
            balance: updatedBankAccountBalance

        }
        
        updateWallet(walletData)
        updateBankAccount(bankData)
        await fetchAndStoreAPIData(dispatch)
        setTimeout(() => {
            window.location.reload()
          }, 2000);
    }

    

    return (
        <>
            <IonModal
                isOpen={addFundsModalOpen}
                onDidDismiss={addFundsModalClose}
                ref={selectAccountModal}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText>Select Account</IonText>
                </IonRow>
                {accounts.map((account:any) => (
                    <div className="accounts" onClick={() => {
                        addFundsModalClose()
                        handleOpenEnterAmount()
                        setSelectedBankAccount(account)
                    }} key={account.account_number}>
                        <span className="account-name">{account.account_name}</span>
                        <span className="account-balance">Available<span>N$ {account.balance}</span> </span>
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

            <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>Confirm Deposit</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div className="deposit-info">
                        <p><span>Amount</span> <span>N$ {amount}</span></p>
                        <p><span>To</span> <span>{currentWallet.name}</span></p>
                        <p><span>Date</span> <span>{moment().format('dddd, MMM D')}</span></p>
                    </div>
                    {/* <p>Scan fingerprint to confirm </p> */}
                    <br />
                    <IonButton onClick={handleCompleteAddFunds}>Confirm</IonButton>
                </IonContent>
            </IonModal>
        </>
    );
};

export default WalletAddFunds;
