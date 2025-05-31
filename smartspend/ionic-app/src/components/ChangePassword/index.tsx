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
  IonLabel,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storage from "../../redux/store";
import {
  useAddTransactionMutation,
  useUpdateWalletMutation,
  useUpdateUserMutation
} from "../../services/backend";
import "../../components/ChangePassword/styles.scss";
import { checkmarkCircle, closeCircle } from "ionicons/icons";

const ChangePassword = ({
  ChangePasswordModalOpen,
  ChangePasswordModalClose,
}: any) => {
  const [user, setUser] = useState<any>({})
  const ChangePassword = useRef<HTMLIonModalElement>(null);
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordMatch] = useState(false)
  const [updateUser] = useUpdateUserMutation()

  useEffect(()=> {
    const getUser = async() => {
      const user = await storage.get('user')
      setUser(user)
    }

    getUser()
  }, [])
  const handleCurrentPasswordChange = (e: CustomEvent) => {
    const value = e.detail.value
    setCurrentPassword(value)
  }

  const handlePasswordChange = (e: CustomEvent) => {
    const value = e.detail.value
    setPassword(value)
  }

  const handleConfirmPasswordChange = (e: CustomEvent) => {
    const value = e.detail.value
    setConfirmPassword(value)
  }
  const handleCompleteChangePassword = async () => { 
    const userData = {
      id: user.email,
      password: password
    }

    updateUser(userData)
    storage.clear()
  };

  return (
    <>
      <IonModal
        trigger="open-modal"
        id="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className="modal"
        isOpen={ChangePasswordModalOpen}
        ref={ChangePassword}
      >
        <IonRow
          class="ion-justify-content-center"
          className="modal-title"
        >
          <IonText>Change Password</IonText>
        </IonRow>

        <div>
          <div className="div-style">
            <IonRow>
              <IonCol className="row">
                <IonInput
                  className=" password-input row"
                  type="text"
                  placeholder="Current Password"
                  value={currentPassword}
                  onIonChange={handleCurrentPasswordChange}
                />
              </IonCol>
            </IonRow>
          </div>
          <div className="div-style">
            <IonRow>
              <IonCol>
                <IonInput
                  className="password-input"
                  type="text"
                  placeholder="New Password"
                  value={password}
                  onIonChange={handlePasswordChange}
                />
              </IonCol>
            </IonRow>
          </div>
          <div className="div-style">
            <IonRow>
              <IonCol>
                <IonInput
                  className="password-input"
                  type="number"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onIonChange={handleConfirmPasswordChange}
                />
              </IonCol>
            </IonRow>
          </div>
        </div>
        <div className="bottom-actions">
          
              <IonButton className="cancel">Cancel</IonButton>
           
              <IonButton className="save" onClick={handleCompleteChangePassword}>Save</IonButton>
            
        </div>
      </IonModal>
    </>
  );
};

export default ChangePassword;
