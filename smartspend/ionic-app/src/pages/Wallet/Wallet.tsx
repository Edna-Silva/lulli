import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import WalletCard from "../../components/WalletCard";
import WalletActions from "../../components/WalletActions";
import './Wallet.scss'
import { useGetWalletsQuery } from "../../services/backend";
import storage from "../../redux/store";
export const Wallet = () => {
  const {data: wallets = []} = useGetWalletsQuery()
  const loadData = async () => {
    await storage.set('wallets', wallets)
  }
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadData()
      event.detail.complete();
    });
  }
  return (
    <IonPage className="wallet-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle className='statistics-title'>Wallets</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <WalletCard />
      <WalletActions/>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
      </IonContent>
    </IonPage>
  )
}

export default Wallet