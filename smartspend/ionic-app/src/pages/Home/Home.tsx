import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  RefresherEventDetail
} from "@ionic/react";
import { add, close } from "ionicons/icons";
import { createContext, useEffect, useRef, useState } from "react";
import AppBackdrop from '../../assets/home-circle.png';
import AddTransaction from "../../components/AddTransaction";
import CurrentExpenditure from "../../components/CurrentExpenditure";
import RecentTransactions from "../../components/RecentTransactions";
import Upcoming from "../../components/Upcoming";
import storage from "../../redux/store";
import { useGetTransactionsQuery, useGetPlannedPaymentsQuery } from "../../services/backend";
import "./Home.scss";
const UserContext = createContext(null);

export const Home = () => {

  const [user, setUser] = useState({ first_name: '', last_name: '' }); // Placeholder
  const [addModalOpen, setAddModalOpen] = useState(false)
  const { data: transactions = [] } = useGetTransactionsQuery()
  const { data: plannedpayments = [] } = useGetPlannedPaymentsQuery()

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  const handleDismissAddModal = () => {
    setAddModalOpen(false)
  }
  const [balance, setBalance] = useState(0); // Initial balance
  const veryHighMax = 10000;

  const handleRangeChange = (event: any) => {
    setBalance(event.detail.value); // Update balance on change
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIncomeModalOpen = () => { }
  const handleExpenseModalOpen = () => { }
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const userStored = await storage.get('user')
      if (userStored) {
        setUser(userStored)
      }
    }

    getUser()
  }, [])

  const loadData = async () => {
    await storage.set('transactions', transactions)
    await storage.set('plannedpayments', plannedpayments)
  }
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadData()
      event.detail.complete();
    });
  }
  return (

    <IonPage className="home-page">
      <img src={AppBackdrop} alt="app-backdrop" className="backdrop" />



      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>

      <div>
        <IonTitle className="logged-user-title"><span>Hello,</span> <br />{user.first_name} {user.last_name}</IonTitle>
      </div>




      <IonGrid fixed={true} >


        <IonRow>
          <CurrentExpenditure />
        </IonRow>

        <div className="home-body" >
          <Upcoming />
          <RecentTransactions />

        </div>







      </IonGrid>



      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={handleOpenAddModal}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <IonModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        id="open-modal"
      >
        <IonContent>
          <IonGrid>
            <IonRow
              class="ion-justify-content-center"
              className="modal-col-payment"
            >
              <IonButton onClick={() => handleIncomeModalOpen()}>
                Add Income
              </IonButton>
            </IonRow>
            <IonRow
              class="ion-justify-content-center"
              className="modal-col-income"
            >
              <IonButton onClick={() => handleExpenseModalOpen()}>
                Add Expense
              </IonButton>
            </IonRow>
            <div className="modal-content-wrapper">
              <IonFabButton onClick={handleModalOpen}>
                <IonIcon icon={close}></IonIcon>
              </IonFabButton>
            </div>
          </IonGrid>

        </IonContent>
      </IonModal>



      <AddTransaction addModalOpen={addModalOpen} addModalClose={handleDismissAddModal} />

    </IonPage>
  );
};
