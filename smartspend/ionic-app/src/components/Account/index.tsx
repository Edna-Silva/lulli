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
import PrivacyPolicy from "../../components/PrivacyPolicy";
import TermsCond from "../../components/TermsCond";
import PersonalDetails from "../../components/PersonalDetails";
import CloseAccount from "../../components/CloseAccount";

const Account = ({ AccountModalOpen, AccountModalClose }: any) => {
  const Account = useRef<HTMLIonModalElement>(null);

  const handleCompleteAccount = async () => {};

  const [PrivacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);

  const handleOpenPrivacyPolicyModal = () => {
    setPrivacyPolicyModalOpen(true);
  };
  const handleDismissPrivacyPolicyModal = () => {
    setPrivacyPolicyModalOpen(false);
  };

  const [TermsCondModalOpen, setTermsCondModalOpen] = useState(false);

  const handleOpenTermsCondModal = () => {
    setTermsCondModalOpen(true);
  };
  const handleDismissTermsCondModal = () => {
    setTermsCondModalOpen(false);
  };

  const [PersonalDetailsModalOpen, setPersonalDetailsModalOpen] =
    useState(false);

  const handleOpenPersonalDetailsModal = () => {
    setPersonalDetailsModalOpen(true);
  };
  const handleDismissPersonalDetailsModal = () => {
    setPersonalDetailsModalOpen(false);
  };

  const [CloseAccountModalOpen, setCloseAccountModalOpen] =
    useState(false);

  const handleOpenCloseAccountModal = () => {
    setCloseAccountModalOpen(true);
  };
  const handleDismissCloseAccountModal = () => {
    setCloseAccountModalOpen(false);
  };


  return (
    <>
      <IonContent>
        <IonModal
          isOpen={AccountModalOpen}
          ref={Account}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    AccountModalClose();
                  }}
                />
                <IonTitle>Account</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>

          <IonCard className="card">
            <IonCol onClick={handleOpenPersonalDetailsModal}>
              <p className="card-content">Personal Details</p>
            </IonCol>
          </IonCard>

          <IonCard className="card">
            <IonCol onClick={handleOpenPrivacyPolicyModal}>
              <p className="card-content">Privacy Policy</p>
            </IonCol>
            <IonCol onClick={handleOpenTermsCondModal}>
              <p className="card-content">Terms & Conditions</p>
            </IonCol>
          </IonCard>

          <IonCard className="card">
            <IonCol onClick={handleOpenCloseAccountModal}>
              <p className="card-content">Close Account</p>
            </IonCol>
          </IonCard>
        </IonModal>

        {/* Modal Componenet Handling */}

        <PrivacyPolicy
          PrivacyPolicyModalOpen={PrivacyPolicyModalOpen}
          PrivacyPolicyModalClose={handleDismissPrivacyPolicyModal}
        />
        <TermsCond
          TermsCondModalOpen={TermsCondModalOpen}
          TermsCondModalClose={handleDismissTermsCondModal}
        />

        <PersonalDetails
          PersonalDetailsModalOpen={PersonalDetailsModalOpen}
          PersonalDetailsModalClose={handleDismissPersonalDetailsModal}
        />

        <CloseAccount
          CloseAccountModalOpen={CloseAccountModalOpen}
          CloseAccountModalClose={handleDismissCloseAccountModal}
        />
      </IonContent>
    </>
  );
};

export default Account;
