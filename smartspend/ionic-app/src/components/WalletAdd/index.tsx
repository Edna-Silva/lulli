import {
    IonIcon,
    IonInput,
    IonModal,
    IonRow,
    IonText
} from "@ionic/react";
import { useRef, useState } from "react";
import { useAddWalletMutation } from "../../services/backend";
import "./styles.scss";

import { checkmarkCircle, closeCircle } from "ionicons/icons";

const WalletAdd = ({ addModalOpen, addModalClose }: any) => {
    


    const [addWallet] = useAddWalletMutation()
    const addWalletModal = useRef<HTMLIonModalElement>(null);

    

    const [name, setName] = useState<string>('');

    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value 
        setName(value);
    };


    const handleAddWalletComplete = async () =>{
        const walletData = {
            account_number: Math.floor(10000000 + Math.random() * 90000000),
            name
        }
        addWallet(walletData)
        setTimeout(() => {
            window.location.reload()
          }, 2000);
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
                    <IonText>Wallet Name</IonText>
                </IonRow>
                <IonRow>
                    <IonInput type="text" className="enter-amount" value={name}
                        onIonChange={handleInputChange} />
                </IonRow>
                <div className="bottom-actions">
                    <IonIcon icon={closeCircle} aria-hidden={true} className="bottom-icons"  />
                    <IonIcon icon={checkmarkCircle} aria-hidden={true} className="bottom-icons" onClick={
                        handleAddWalletComplete
                    } />
                </div>
            </IonModal>

        </>
    );
};

export default WalletAdd;
