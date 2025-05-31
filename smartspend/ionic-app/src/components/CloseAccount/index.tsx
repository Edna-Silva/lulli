import {
  IonButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonCol,
  IonImg,
  IonText,
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
import "../../components/CloseAccount/styles.scss";
import { checkmarkCircle, closeCircle } from "ionicons/icons";

const CloseAccount = ({
  CloseAccountModalOpen,
  CloseAccountModalClose,
}: any) => {
  const CloseAccount = useRef<HTMLIonModalElement>(null);

  const handleCompleteCloseAccount = async () => {};

  return (
    <>
      <IonModal
        isOpen={CloseAccountModalOpen}
        ref={CloseAccount}
        className="confirm-deposit"
      >
        <IonHeader className="header">
          <IonToolbar>
            <div className="tool-bar-title">
              <IonIcon
                icon={closeCircle}
                aria-hidden={true}
                onClick={() => {
                  CloseAccountModalClose();
                }}
              />
              <IonTitle>Close Account</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="grid-style">
            <IonRow className="h1">Careful Now</IonRow>

            <IonRow className="text">
              When you delete your account all the information and data tied to
              it will be lost. This includes your budgets and statistics. You
              will have to re-enter everything if you recreate your account.
            </IonRow>
          </div>
          <div>
            <IonButton
                className="keep-account"
                onClick={() => {
                /* Handle button click */
                }}
            >
                Keep Account
            </IonButton>
          </div>
          <IonButton
            className="close-account"
            onClick={() => {
              /* Handle button click */
            }}
          >
            Close Account
          </IonButton>

        </IonContent>
      </IonModal>
    </>
  );
};

export default CloseAccount;
