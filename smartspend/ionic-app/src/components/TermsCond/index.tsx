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
import "./styles.scss";

import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { IWallet } from "../../services/wallet/wallet.model";

const TermsCond = ({
  TermsCondModalOpen,
  TermsCondModalClose,
}: any) => {
  const TermsCond = useRef<HTMLIonModalElement>(null);

  const handleCompleteTermsCond = async () => {};

  return (
    <>
      <IonContent>
        <IonModal
          isOpen={TermsCondModalOpen}
          ref={TermsCond}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    TermsCondModalClose();
                  }}
                />
                <IonTitle>Terms & Conditions</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>

          <div className="grid-style">
            <IonRow className="h1">SmartSpend Privacy Notice</IonRow>

            <IonRow className="h3">Effective Date: April 13, 2024</IonRow>

            <IonRow className="h2">Introduction</IonRow>

            <IonRow className="h3">
              At SmartSpend, we understand the importance of protecting your
              privacy. This Privacy Notice explains what types of information we
              collect, how it's used, and the choices you have regarding your
              personal information.
            </IonRow>

            <IonRow className="h2">Information We Collect</IonRow>

            <IonRow className="h3">Information you provide directly:</IonRow>
            <IonRow className="h3">
              Account creation details: Name, email address, username, password
            </IonRow>
            <IonRow className="h3">
              Financial information: Bank account details, transaction history
              (if you link external accounts)
            </IonRow>
            <IonRow className="h3">
              Budgeting categories and goals you set
            </IonRow>
            <IonRow className="h2">Information collected automatically:</IonRow>
            <IonRow className="h3">
              Device information: Device type, operating system, IP address
            </IonRow>
            <IonRow className="h3">
              Usage data: How you interact with the app (features used, time
              spent)
            </IonRow>
            <IonRow className="h3">
              Location data: (Only if you grant permission)
            </IonRow>
            <IonRow className="h2">Information from third parties:</IonRow>
            <IonRow className="h3">
              If you connect external financial accounts, we may receive limited
              data from those institutions to facilitate transactions and
              categorization.
            </IonRow>
            <IonRow className="h2">How We Use Your Information</IonRow>
            <IonRow className="h3">Providing the SmartSpend service:</IonRow>
            <IonRow className="h3">
              Creating and maintaining your user account
            </IonRow>
            <IonRow className="h3">
              Processing transactions (if applicable)
            </IonRow>
          </div>
        </IonModal>
      </IonContent>
    </>
  );
};

export default TermsCond;
