import React, { useRef, useState } from "react";
import {
    IonContent,
    IonPage,
    IonTitle,
    IonText,
    IonCol,
    IonRow,
    IonIcon,
    IonModal,
    IonButton,
} from "@ionic/react";
import "./styles.scss";
import { addOutline, bagHandleOutline, archiveOutline, trashOutline } from "ionicons/icons";
import WalletAddFunds from "../WalletAddFunds";
import TransferFunds from "../TransferFunds";
import WalletBuy from "../WalletBuy";
import WalletWithdraw from "../WalletWithdraw";
import WalletAdd from "../WalletAdd";
import { setCurrentWallet, setFromWallet, setToWallet } from "../../services/wallet/wallet.slice";
import { useSelector, useDispatch } from "react-redux";
import storage from "../../redux/store";
import { isEqual } from "lodash";
import { useDeleteWalletMutation } from "../../services/backend";

const WalletActions: React.FC = () => {
    const dispatch = useDispatch()
    const {currentWallet} = useSelector((state: any) => state.wallet)
    const [addFundsModalOpen, setAddFundsModalOpen] = useState(false)
    const [transferFundsModalOpen, setTransferFundsModalOpen] = useState(false)
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [deleteWallet] = useDeleteWalletMutation()

    const handleOpenAddFundsModal = () => {
        setAddFundsModalOpen(true);
    };
    const handleDismissAddFundsModal = () => {
        setAddFundsModalOpen(false)
    }

    const retrieveWallets = async ()=> {
        dispatch(setFromWallet(currentWallet))
        const wallets = await storage.get('wallets')
        if (wallets) {
            for(const [index, wallet] of wallets.entries()){
                if (!isEqual(currentWallet, wallet)) {
                    dispatch(setToWallet(wallet))
                    
                    
                    break;
                }
            }
        }
    }

    const handleOpenTransferFundsModal = () => {
        retrieveWallets()
        setTransferFundsModalOpen(true);
    };
    const handleDismissTransferFundsModal = () => {
        setTransferFundsModalOpen(false)
    }

    const handleOpenBuyModal = () => {
        setBuyModalOpen(true);
    };
    const handleDismissBuyModal = () => {
        setBuyModalOpen(false)
    }

    const handleOpenWithdrawModal = () => {
        setWithdrawModalOpen(true);
    };
    const handleDismissWithdrawModal = () => {
        setWithdrawModalOpen(false)
    }
    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };
    const handleDismissAddModal = () => {
        setAddModalOpen(false)
    }

    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const selectWalletModal = useRef<HTMLIonModalElement>(null)
    const handleOpenSelectWalletModal = () => {
        retrieveWallets()
        setIsWalletModalOpen(true)
    }
    const handleCloseSelectWalletModal = () => {
        setIsWalletModalOpen(false)
    }

    const handleDelete =() => {
        
        const walletDate = {
            id: currentWallet.account_number
        }

        deleteWallet(walletDate)
    }

    return (
        <>
        <div className="wallet-actions">
            <div className="action-btn" onClick={handleOpenAddFundsModal}>
                <button className="icon"><IonIcon icon={addOutline} aria-hidden={true} /></button>
                <span>Add Funds</span>
            </div>
            <div className="action-btn" onClick={handleOpenTransferFundsModal}>
                <button className="icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7542 1.20323C13.3005 1.28455 12.6809 1.49001 11.7778 1.79177L4.83296 4.10636C3.95228 4.39956 3.31344 4.61251 2.84796 4.79442C2.36428 4.98276 2.1524 5.10796 2.06359 5.1925C1.90758 5.34229 1.78345 5.52206 1.69865 5.72103C1.61386 5.91999 1.57015 6.13404 1.57015 6.35032C1.57015 6.5666 1.61386 6.78065 1.69865 6.97962C1.78345 7.17858 1.90758 7.35836 2.06359 7.50815C2.1524 7.59376 2.36428 7.71789 2.84796 7.90622C3.51783 8.15536 4.19323 8.38941 4.87362 8.6082C5.18609 8.712 5.40224 8.78369 5.59807 8.88749C6.07238 9.13875 6.46015 9.52689 6.71096 10.0014C6.81582 10.1973 6.88752 10.4134 6.99132 10.7259L7.00523 10.7676C7.29843 11.6472 7.51138 12.2871 7.69329 12.7516C7.88162 13.2352 8.00682 13.4471 8.09243 13.5359C8.24221 13.6918 8.42192 13.8158 8.62079 13.9005C8.81965 13.9851 9.03358 14.0288 9.24973 14.0288C9.46587 14.0288 9.6798 13.9851 9.87866 13.9005C10.0775 13.8158 10.2572 13.6918 10.407 13.5359C10.4926 13.4471 10.6168 13.2352 10.8051 12.7516C10.987 12.2871 11.201 11.6472 11.4932 10.7676L13.8088 3.82172C14.1095 2.91857 14.315 2.29792 14.3952 1.84528C14.4765 1.38728 14.3963 1.28348 14.3556 1.24389C14.316 1.20323 14.2122 1.1219 13.7542 1.20323ZM13.567 0.151336C14.1127 0.0550285 14.6852 0.0603791 15.1132 0.487342C15.5402 0.915375 15.5456 1.48787 15.4492 2.03361C15.3529 2.574 15.1218 3.26849 14.8393 4.11706L14.8232 4.15987L12.5087 11.1068L12.5033 11.1229C12.2848 11.8011 12.0511 12.4744 11.8024 13.1421C11.6151 13.6194 11.4279 14.0196 11.1785 14.2786C10.9289 14.5385 10.6293 14.7453 10.2978 14.8865C9.96624 15.0278 9.60957 15.1006 9.24919 15.1006C8.88881 15.1006 8.53215 15.0278 8.2006 14.8865C7.86906 14.7453 7.56948 14.5385 7.31983 14.2786C7.07157 14.0185 6.88324 13.6194 6.69597 13.1421C6.50336 12.6488 6.28185 11.9832 5.99507 11.1229L5.98972 11.1068C5.86666 10.7377 5.82279 10.6114 5.765 10.5033C5.61459 10.2184 5.38192 9.98538 5.09727 9.83451C4.99026 9.7778 4.86292 9.73392 4.49374 9.6098L4.47769 9.60552C3.79962 9.38652 3.12638 9.15283 2.45845 8.90461C1.98119 8.71735 1.58098 8.53008 1.32202 8.28075C1.06211 8.03111 0.855326 7.73152 0.71407 7.39998C0.572814 7.06844 0.5 6.71177 0.5 6.35139C0.5 5.99101 0.572814 5.63435 0.71407 5.30281C0.855326 4.97126 1.06211 4.67168 1.32202 4.42204C1.58205 4.17271 1.98119 3.98544 2.45845 3.79818C2.95175 3.60556 3.61735 3.38406 4.47769 3.09727L4.49374 3.09192L11.4397 0.777334L11.4835 0.762353C12.3321 0.479851 13.0266 0.248714 13.567 0.152406" fill="#F8F8FF" />
                    </svg>
                </button>
                <span>Transfer</span>
            </div>
            <div className="action-btn">
                <button className="icon">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.77676 1.61565L10.9482 1.65132L10.9839 10.8228M10.3135 2.28604L1.05055 11.549" stroke="#F8F8FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <span>Send</span>
            </div>
            <div className="action-btn">
                <button className="icon">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2223 11.5845L1.05083 11.5489L1.01515 2.37743M1.68554 10.9142L10.9485 1.65122" stroke="#F8F8FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <span>Receive</span>
            </div>
            
        </div>
        <div className="wallet-actions">
            <div className="action-btn" onClick={handleOpenBuyModal}>
                <button className="icon">
                    <IonIcon icon={bagHandleOutline} aria-hidden={true} />
                </button>
                <span>Buy</span>
            </div>
            <div className="action-btn" onClick={handleOpenWithdrawModal}>
                <button className="icon">
                    <IonIcon icon={archiveOutline} aria-hidden={true} />
                </button>
                <span>Withdraw</span>
            </div>
            <div className="action-btn" onClick={handleOpenAddModal}>
                <button className="icon">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.50893 0V2.00893H1.5V3.34821H3.50893V5.35714H4.84821V3.34821H6.85714V2.00893H4.84821V0H3.50893ZM8.19643 2.00893V3.34821H14.2232V4.6875H10.2054C9.46875 4.6875 8.86607 5.29018 8.86607 6.02679V10.0446C8.86607 10.7812 9.46875 11.3839 10.2054 11.3839H14.2232V12.7232H4.84821V6.69643H3.50893V12.7232C3.50893 13.0784 3.65003 13.4191 3.9012 13.6702C4.15236 13.9214 4.49301 14.0625 4.84821 14.0625H14.2232C14.9598 14.0625 15.5625 13.4598 15.5625 12.7232V11.1964C15.7649 11.0796 15.9332 10.9118 16.0507 10.7097C16.1682 10.5077 16.2307 10.2784 16.2321 10.0446V6.02679C16.2307 5.79306 16.1682 5.56378 16.0507 5.36172C15.9332 5.15966 15.7649 4.99186 15.5625 4.875V3.34821C15.5625 2.61161 14.9598 2.00893 14.2232 2.00893H8.19643ZM10.2054 6.02679H14.8929V10.0446H10.2054V6.02679ZM12.2143 7.03125C11.9479 7.03125 11.6924 7.13708 11.504 7.32545C11.3156 7.51382 11.2098 7.76931 11.2098 8.03571C11.2098 8.30211 11.3156 8.5576 11.504 8.74598C11.6924 8.93435 11.9479 9.04018 12.2143 9.04018C12.4807 9.04018 12.7362 8.93435 12.9245 8.74598C13.1129 8.5576 13.2188 8.30211 13.2188 8.03571C13.2188 7.76931 13.1129 7.51382 12.9245 7.32545C12.7362 7.13708 12.4807 7.03125 12.2143 7.03125Z" fill="#F8F8FF" />
                    </svg>
                </button>
                <span>New Wallet</span>
            </div>
            <div className="action-btn" onClick={handleOpenSelectWalletModal}>
                <button className="icon">
                    <IonIcon icon={trashOutline} aria-hidden={true} />
                </button>
                <span>Close Wallet</span>
            </div>
        </div>
        <WalletAddFunds addFundsModalOpen={addFundsModalOpen} addFundsModalClose={handleDismissAddFundsModal}/>
        <TransferFunds transferFundsModalOpen={transferFundsModalOpen} transferFundsModalClose={handleDismissTransferFundsModal}/>
        <WalletBuy buyModalOpen={buyModalOpen} buyModalClose={handleDismissBuyModal}/>
        <WalletWithdraw withdrawFundsModalOpen={withdrawModalOpen} withdrawFundsModalClose={handleDismissWithdrawModal}/>
        <WalletAdd addModalOpen={addModalOpen} addModalClose={handleDismissAddModal}/>
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
                    <IonText>Confirm Closure</IonText>
                </IonRow>
                <div className="edit-budget-actions">
                    <IonButton className='' onClick={handleCloseSelectWalletModal}>Cancel</IonButton>
                    <IonButton className='delete-btn' onClick={handleDelete}>Delete</IonButton>
                </div>
            </IonModal>
        </>
    );
};

export default WalletActions;
