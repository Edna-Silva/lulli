import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonIcon } from "@ionic/react";
import WalletCard from "../../components/WalletCard";
import WalletActions from "../../components/WalletActions";
import './styles.scss'
import { closeCircle } from "ionicons/icons";

export const ConfirmDeposit = () => {

    const handleBackNavigation = () =>{

    }
  return (
    <IonPage className="wallet-page">
      <IonHeader>
        <IonToolbar>
          <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={handleBackNavigation} /><IonTitle>Confirm Deposit</IonTitle></div>
        </IonToolbar>
      </IonHeader>
      <WalletCard />
      <WalletActions/>
    </IonPage>
  )
}

export default ConfirmDeposit