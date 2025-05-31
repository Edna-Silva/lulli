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
  useUpdateUserMutation,
  useAddTransactionMutation,
  useUpdateWalletMutation,
} from "../../services/backend";
import "../../components/PersonalDetails/styles.scss";
import { checkmarkCircle, closeCircle } from "ionicons/icons";



const PersonalDetails = ({
  PersonalDetailsModalOpen,
  PersonalDetailsModalClose,
}: any) => {
  const [user, setUser] = useState<any>({});
  const [firstName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const PersonalDetails = useRef<HTMLIonModalElement>(null);

  useEffect(()=> {
    const getUser = async() => {
      const user = await storage.get('user')
      setUser(user)
    }

    getUser()
  }, [])

  const [updateUser] = useUpdateUserMutation();

  const handleCompletePersonalDetails = async () => { };


  const handleFirstNameChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setLastName(value);
  };

  const handleEmailChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setEmail(value);
  };


  const handleEdit = () => {
    const userData: any = { id: user.email };

    if (firstName) {
      userData.first_name = firstName;
    }

    if (lastName) {
      userData.last_name = lastName;
    }

    if (email) {
      userData.email = email;
    }

    updateUser(userData);
  };


  return (
    <>
      <IonContent>
        <IonModal
          isOpen={PersonalDetailsModalOpen}
          ref={PersonalDetails}
          className="confirm-deposit"
        >
          <IonHeader className="header">
            <IonToolbar>
              <div className="tool-bar-title">
                <IonIcon
                  icon={closeCircle}
                  aria-hidden={true}
                  onClick={() => {
                    PersonalDetailsModalClose();
                  }}
                />
                <IonTitle>Edit Profile</IonTitle>
              </div>
            </IonToolbar>
          </IonHeader>

          <div>
            <IonRow className="image-container">
              <IonImg
                className="profile-picture"
                src="src/Images/camera.svg"
                alt="Profile Picture"
              />
            </IonRow>
            <IonTitle className="subheading">Personal Details</IonTitle>

            <div className="div-style">
              <IonRow>
                <IonCol>
                  <IonInput
                  label="Firstname" labelPlacement="stacked"
                    className="input"
                    type="text"
                    placeholder={user.first_name}
                    value={firstName}
                    onIonChange={handleFirstNameChange}
                  />
                </IonCol>
              </IonRow>
            </div>
            <div className="div-style">
              <IonRow>
                <IonCol>
                  <IonInput
                  label="Lastname" labelPlacement="stacked"
                    className="input"
                    type="text"
                    placeholder={user.last_name}
                    value={lastName}
                    onIonChange={handleLastNameChange}
                  />
                </IonCol>
              </IonRow>
            </div>
            <div className="div-style">
              <IonRow>
                <IonCol>
                  <IonInput
                  label="Email Address" labelPlacement="stacked"
                    className="input"
                    type="text"
                    placeholder={user.email}
                    value={email}
                    onIonChange={handleEmailChange}
                  />
                </IonCol>
              </IonRow>
            </div>
            {/* <div className="div-style">
              <IonRow>
                <IonCol>
                  <IonInput
                    className="input"
                    type="number"
                    placeholder={user.num}
                    value={num}
                    onIonChange={handleEdit}
                  />
                </IonCol>
              </IonRow>
            </div> */}
          </div>
          <div className="ion-modal-container">
            <IonRow>
              <IonCol>
                <button className="save-button" onClick={handleEdit}>
                  SAVE
                </button>
              </IonCol>
              <IonCol>
                <button className="cancel-button">CANCEL</button>
              </IonCol>
            </IonRow>
          </div>
        </IonModal>
      </IonContent>
    </>
  );
};

export default PersonalDetails;
