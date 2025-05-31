import {
    IonText,
    IonIcon,
    IonModal,
    IonRow
} from "@ionic/react";
import { isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import storage from "../../redux/store";
import { useGetWalletsQuery } from "../../services/backend";
import { IWallet } from "../../services/wallet/wallet.model";
import { setCurrentWallet as setCurrent, setWallets } from "../../services/wallet/wallet.slice";
import "./styles.scss";
import { caretDown } from "ionicons/icons";

const WalletCard: React.FC = () => {
    const dispatch = useDispatch()
    const [currentWallet, setCurrentWallet] = useState<IWallet>()
    const { data: wallets = [], isLoading } = useGetWalletsQuery()
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

    
    const retrieveWallets = async () => {
        try {
            const storedWallets = await storage.get('wallets');
            if (storedWallets) {
                storedWallets.forEach((storedWallet: any) => {
                    if (storedWallet.is_default) {
                        setCurrentWallet(storedWallet);
                        dispatch(setCurrent(storedWallet))
                    }
                });
                
            }
        } catch (err) {
            console.error("Error retrieving wallets:", err);
        }
    };

    useEffect(() => {
        retrieveWallets()
    }, [])

    const formatAccountNumber = (account_number: any) => {
        const numberString = account_number.toString();
        return `${numberString.slice(0, 4)} ${numberString.slice(4)}`;

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

    const handleChangeWallet = () => {

    }
    return (
        <div className="wallet-card">
            <IonText className="wallet-title">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.625 5H3.125M10.625 5C10.7908 5 10.9497 5.06585 11.0669 5.18306C11.1842 5.30027 11.25 5.45924 11.25 5.625V7.25M10.625 5L8.125 2.5M3.125 5C2.95924 5 2.80027 5.06585 2.68306 5.18306C2.56585 5.30027 2.5 5.45924 2.5 5.625V11.875C2.5 12.0408 2.56585 12.1997 2.68306 12.3169C2.80027 12.4342 2.95924 12.5 3.125 12.5H10.625C10.7908 12.5 10.9497 12.4342 11.0669 12.3169C11.1842 12.1997 11.25 12.0408 11.25 11.875V10.25M3.125 5L5.625 2.5L8.125 5M11.875 7.5H9.375C9.04348 7.5 8.72554 7.6317 8.49112 7.86612C8.2567 8.10054 8.125 8.41848 8.125 8.75C8.125 9.08152 8.2567 9.39946 8.49112 9.63388C8.72554 9.8683 9.04348 10 9.375 10H11.875C12.0408 10 12.1997 9.93415 12.3169 9.81694C12.4342 9.69973 12.5 9.54076 12.5 9.375V8.125C12.5 7.95924 12.4342 7.80027 12.3169 7.68306C12.1997 7.56585 12.0408 7.5 11.875 7.5Z" stroke="#F8F8FF" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {currentWallet ? (currentWallet.name) : null}
                <IonIcon icon={caretDown} onClick={handleOpenSelectWalletModal}/>
            </IonText>
            <IonText className="wallet-balance">
                Your Balance
                <br />
                <span>N$ {currentWallet ? (currentWallet.balance) : null}</span>
            </IonText>
            <IonText>
                Account Number: {currentWallet ? (formatAccountNumber(currentWallet.account_number)) : ''}
            </IonText>

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
                        setCurrentWallet(wallet)
                        dispatch(setCurrent(wallet))
                        handleChangeWallet()
                    }} key={wallet.account_number}>
                        <span className="account-name">{wallet.name}</span>
                        <span className="account-balance">Available<span>N$ {wallet.balance}</span> </span>
                    </div>
                ))}
            </IonModal>
        </div>
    );
};

export default WalletCard;
