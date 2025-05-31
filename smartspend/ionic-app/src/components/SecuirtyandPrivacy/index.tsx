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


const SecurityandPrivacy = ({ SecurityandPrivacyModalOpen, SecurityandPrivacyModalClose }: any) => {
  const SecurityandPrivacy = useRef<HTMLIonModalElement>(null);

  const handleCompleteSecurityandPrivacy = async () => {};

  const [ChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };
  const handleDismissChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };



  return (
    <>
      <IonContent>
        <IonModal
          isOpen={SecurityandPrivacyModalOpen}
          ref={SecurityandPrivacy}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    SecurityandPrivacyModalClose();
                  }}
                />
                <IonTitle>Security & Privacy</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>

          <p className="card-title">Security</p>
          <IonCard className="security-card">
            <IonCol onClick={handleOpenChangePasswordModal}>
              <p className="card-content">Change Password</p>
            </IonCol>
          </IonCard>

          <p className="card-title">Privacy</p>
          <IonCard className="privacy-card">
            <IonCol>
              <p className="card-content">Social Media sharing</p>
            </IonCol>
            <IonToggle style={{ marginRight: 20 }}></IonToggle>
          </IonCard>
        </IonModal>

        {/* Modal Componenet Handling */}

        <ChangePassword
          ChangePasswordModalOpen={ChangePasswordModalOpen}
          ChangePasswordModalClose={handleDismissChangePasswordModal}
        />
      </IonContent>
    </>
  );
};

export default SecurityandPrivacy;
