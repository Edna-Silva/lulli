import {
  IonButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonCol,
  IonLabel,
  IonSegment,
  IonSegmentButton,
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
import "./appearance.scss";

import { checkmarkCircle, closeCircle, colorFill, heart } from "ionicons/icons";

const Appearance = ({
  AppearanceModalOpen,
  AppearanceModalClose,
}: any) => {
  const Appearance = useRef<HTMLIonModalElement>(null);

  const handleCompleteAppearance = async () => {};

  return (
    <>
      <IonContent>
        <IonModal
          isOpen={AppearanceModalOpen}
          ref={Appearance}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    AppearanceModalClose();
                  }}
                />
                <IonTitle>Appearance</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonSegment className="segment" value="default">
              <IonSegmentButton value="default">
                <IonLabel>LIGHT</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="segment">
                <IonLabel>DARK</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div>
              <IonRow>
                <IonCol sizeXs="1.5" style={{ marginLeft: 30 }}>
                  <IonButton className="colour1"></IonButton>
                </IonCol>
                <IonCol sizeXs="1.5">
                  <IonButton className="colour2"></IonButton>
                </IonCol>
                <IonCol sizeXs="1.5">
                  <IonButton className="colour3"></IonButton>
                </IonCol>
              </IonRow>
            </div>
          </IonGrid>
        </IonModal>
      </IonContent>
    </>
  );
};

export default Appearance;
