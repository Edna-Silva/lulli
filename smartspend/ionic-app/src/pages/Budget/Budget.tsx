import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonToolbar,
  RefresherEventDetail
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import AddBudget from "../../components/AddBudget";
import Budgets from "../../components/Budgets";
import storage from "../../redux/store";
import { useGetBudgetsQuery } from "../../services/backend";
import "./Budget.scss";
export const Budget = () => {
  const {data: budgets = []} = useGetBudgetsQuery()
  const [totalAmount, setTotalAmount] = useState(0)
  function calculateTotalAmount (budgets: any)  {
    let total = 0;
    budgets.forEach((item: { total_amount: number; }) => total += item.total_amount);
    
    return total;
  }
  const getTotalBudgets = async() => {
    const budgetsStored = await storage.get('budgets')
    setTotalAmount(calculateTotalAmount(budgetsStored))
  }
  //Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  useEffect(()=> {
    getTotalBudgets()
  },[])

  const loadData = async () => {
    await storage.set('budgets', budgets)
  }
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      loadData()
      event.detail.complete();
    });
  }


  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonRow className="ion-justify-content-between">
              <IonCol className="budget-page-header">
                <IonText className="budget-title">Budgets</IonText>
                <br />
                <IonText className="total-budgeted">
                  Total Budgeted: N$ {totalAmount}
                </IonText>
              </IonCol >
              {/* <IonCol>
                <IonButton className="date-button">
                  <IonText>Mar. 31 - Apr. 30</IonText>
                  <IonIcon icon={caretDown} aria-hidden={true} />
                </IonButton>
              </IonCol> */}
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent >


          <IonGrid>
            <IonRow>

              <Budgets />

            </IonRow>
          </IonGrid>
        </IonContent>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={handleOpenModal}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>


      </IonPage>

      <AddBudget addModalOpen={isModalOpen} addModalClose={handleCloseModal} />


    </>
  );
};
