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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storage from "../../redux/store";
import { useAddTransactionMutation, useUpdateWalletMutation } from "../../services/backend";
import "./styles.scss";

import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { IWallet } from "../../services/wallet/wallet.model";

const TransferFunds = ({ transferFundsModalOpen, transferFundsModalClose }: any) => {
    const transferFunds = useRef<HTMLIonModalElement>(null);
    const selectWalletModal = useRef<HTMLIonModalElement>(null);
    const enterAmountModal = useRef<HTMLIonModalElement>(null);

    const [updateWallet] = useUpdateWalletMutation()
    const [addTransaction] = useAddTransactionMutation()

    const { currentWallet } = useSelector((state: any) => state.wallet)
    const {fromWallet} = useSelector((state: any) => state.wallet)
    const {toWallet} = useSelector((state: any) => state.wallet)


    const [isEnterAmountModalOpen, setIsEnterAmountModalOpen] = useState(false);
    const [isSelectWalletModalOpen, setIsSelectWalletModalOpen] = useState(false);
    const [wallets, setWallets] = useState<any>([])

    const handleOpenEnterAmount = () => {
        setIsEnterAmountModalOpen(true)
    }

    const handleCloseEnterAmount = () => {
        setIsEnterAmountModalOpen(false)
    }


    const handleCloseSelectWallet = () => {
        setIsSelectWalletModalOpen(false)
    }

    const [amount, setAmount] = useState<number>(0);
    const [reference, setReference] = useState<string>('')
    const [selectedBankAccount, setSelectedBankAccount] = useState<any>()
    const [selectedFromWallet, setSelectedFromWallet] = useState<IWallet>({ name: '', account_number: 0, balance: 0, user: 0 })
    const [selectedToWallet, setSelectedToWallet] = useState<IWallet>({ name: '', account_number: 0, balance: 0, user: 0 })
    

    

    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value || 0;
        setAmount(value);
    };

    const handleReferenceInputChange = (event: CustomEvent) => {
        const value = event.detail.value || '';
        setReference(value)
    }



    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const handleOpenConfirmDeposit = () => {
        setIsConfirmOpen(true)
    }

    const handleCompleteTransferFunds = async () => {
        const updatedFromWalletBalance = Number(selectedFromWallet.balance) - Number(amount)
        const updatedToWalletBalance = Number(selectedToWallet.balance) + Number(amount)
        const walletTakenFrom = {
            account_number: selectedFromWallet.account_number,
            balance: updatedFromWalletBalance
        }

        const walletAddedTo = {
            account_number: selectedToWallet.account_number,
            balance: updatedToWalletBalance
        }

        const transactionData = {
            name: reference,
            user: selectedFromWallet.user,
            type: 'TRANSFER',
            income: null,
            expense: null

        }

        updateWallet(walletTakenFrom)
        updateWallet(walletAddedTo)
        addTransaction(transactionData)
        setTimeout(() => {
            window.location.reload()
          }, 2000);
    }

    const retrieveWallets = async () => {
        try {
            const storedWallets = await storage.get('wallets');
            if (storedWallets) {
                setWallets(storedWallets)
            }
        } catch (err) {
            console.error("Error retrieving wallets:", err);
        }
    };

    useEffect(() => {
        retrieveWallets()
        
        
        
    }, [])

    useEffect(()=> {
        setSelectedFromWallet(fromWallet)
        setSelectedToWallet(toWallet)
        
        
    }, [transferFundsModalOpen])

    const handleSelectToWallet =() => {

    } 

    const [selectedWallet, setSelectedWallet] = useState<any>({})
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const selectWalletOptionModal = useRef<HTMLIonModalElement>(null)
    const handleOpenSelectWalletModal = () => {
        retrieveWallets()
        setIsWalletModalOpen(true)
    }
    const handleCloseSelectWalletModal = () => {
        setIsWalletModalOpen(false)
    }

    const [isWalletToModalOpen, setIsWalletToModalOpen] = useState(false)
    const selectWalletToOptionModal = useRef<HTMLIonModalElement>(null)
    const handleOpenSelectWalletToModal = () => {
        retrieveWallets()
        setIsWalletToModalOpen(true)
    }
    const handleCloseSelectWalletT0Modal = () => {
        setIsWalletToModalOpen(false)
    }
    return (
        <>


            <IonModal
                isOpen={isEnterAmountModalOpen}
                onDidDismiss={handleCloseEnterAmount}
                ref={enterAmountModal}
                id="open-modal"
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

            <IonModal isOpen={transferFundsModalOpen} ref={transferFunds} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { transferFundsModalClose() }} /><IonTitle>Transfer</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <div className="ion-padding transfer-form">
                    <div onClick={handleOpenSelectWalletModal}>
                        <p>From</p>
                        <div className="wallet-transfer">
                            <span className="account-name">{selectedFromWallet.name}</span>
                            <span className="account-balance">Available<span>N$ {selectedFromWallet.balance}</span> </span>
                        </div>
                    </div>

                    <div onClick={handleOpenSelectWalletToModal}>
                        <p>To</p>
                        <div className="wallet-transfer" onClick={handleSelectToWallet}>
                            <span className="account-name">{selectedToWallet.name}</span>
                            <span className="account-balance">Available<span>N$ {selectedToWallet.balance}</span> </span>
                        </div>
                    </div>
                    <IonInput type="number" min={0} className="amount-to-transfer" value={amount}
                        onIonChange={handleInputChange}
                        inputmode="numeric"
                        placeholder="Amount"
                    />

                    <IonInput type="text" className="amount-to-transfer" value={reference}
                        onIonChange={handleReferenceInputChange}
                        inputmode="text"
                        placeholder="Reference"
                    />
                    <IonButton onClick={handleCompleteTransferFunds}>Confirm</IonButton>
                </div>
            </IonModal>

            <IonModal
                isOpen={isSelectWalletModalOpen}
                onDidDismiss={handleCloseSelectWallet}
                ref={selectWalletModal}
                id="open-modal"
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
                {wallets ? (wallets.map((account: any) => (
                    <div className="accounts" onClick={() => {
                        handleCloseSelectWallet()
                        handleOpenEnterAmount()
                        setSelectedBankAccount(account)
                    }} key={account.account_number}>
                        <span className="account-name">{account.account_name}</span>
                        <span className="account-balance">Available<span>N$ {account.balance}</span> </span>
                    </div>
                ))) : (
                    <>
                    </>
                )}
            </IonModal>

            <IonModal
                isOpen={isWalletModalOpen}
                onDidDismiss={handleCloseSelectWalletModal}
                ref={selectWalletOptionModal}
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
                        setSelectedFromWallet(wallet)
                    }} key={wallet.account_number}>
                        <span className="account-name">{wallet.name}</span>
                        <span className="account-balance">Available<span>N$ {wallet.balance}</span> </span>
                    </div>
                ))}
            </IonModal>

            <IonModal
                isOpen={isWalletToModalOpen}
                onDidDismiss={handleCloseSelectWalletT0Modal}
                ref={selectWalletToOptionModal}
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
                        handleCloseSelectWalletT0Modal()
                        setSelectedToWallet(wallet)
                    }} key={wallet.account_number}>
                        <span className="account-name">{wallet.name}</span>
                        <span className="account-balance">Available<span>N$ {wallet.balance}</span> </span>
                    </div>
                ))}
            </IonModal>
        </>
    );
};

export default TransferFunds;
