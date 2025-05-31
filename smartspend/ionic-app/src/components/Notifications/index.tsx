import {
  IonButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonCol,
  IonCard,
  IonToggle,
  IonTitle,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storage from "../../redux/store";
import {
  useAddTransactionMutation,
  useUpdateWalletMutation,
} from "../../services/backend";

import ChangePassword from "../../components/ChangePassword";
import "./styles.scss";

import { checkmarkCircle, closeCircle } from "ionicons/icons";

const Notifications = ({
  NotificationsModalOpen,
  NotificationsModalClose,
}: any) => {
  const Notifications = useRef<HTMLIonModalElement>(null);

  const handleCompleteNotifications = async () => {};

  

  return (
    <>
      <IonContent>
        <IonModal
          isOpen={NotificationsModalOpen}
          ref={Notifications}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    NotificationsModalClose();
                  }}
                />
                <IonTitle>Notifications</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>

          <p className="card-title">General</p>

          <IonCard className="general-card">
            <IonCol className="orientation">
              <p className="card-content">Personalised Emails</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
            <IonCol className="orientation">
              <p className="card-content">Personalised Pushes</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
          </IonCard>

          <p className="card-title">Marketing</p>

          <IonCard className="general-card">
            <IonCol className="orientation">
              <p className="card-content">Personalised Emails</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
            <IonCol className="orientation">
              <p className="card-content">Personalised Pushes</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
          </IonCard>

          <p className="card-title">Promotions</p>

          <IonCard className="general-card">
            <IonCol className="orientation">
              <p className="card-content">Emails</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
            <IonCol className="orientation">
              <p className="card-content">Pushes</p>
              <IonToggle style={{ marginRight: 20 }}></IonToggle>
            </IonCol>
          </IonCard>
        </IonModal>

        {/* Modal Componenet Handling */}
      </IonContent>
    </>
  );
};

export default Notifications;
