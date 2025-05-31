import React, { useState, useRef, useEffect } from "react";
import "./Profile.scss";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
  IonRow,
  IonImg,
  IonCol,
  IonCard,
  IonModal,
  IonText,
  IonButton,
} from "@ionic/react";
import { helpCircle, person } from "ionicons/icons";
import Account from "../../components/Account";
import SecurityandPrivacy from "../../components/SecuirtyandPrivacy";
import Notifications from "../../components/Notifications";
import Appearnace from "../../components/Appearance";
import AboutUs from "../../components/AboutUs";
import storage from "../../redux/store";
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei, bigSmile, rings } from '@dicebear/collection';


export const Profile: React.FC = () => {
  const [AccountModalOpen, setAccountModalOpen] = useState(false);

  const handleOpenAccountModal = () => {
    setAccountModalOpen(true);
  };
  const handleDismissAccountModal = () => {
    setAccountModalOpen(false);
  };

  const [SecurityandPrivacyModalOpen, setSecurityandPrivacyModalOpen] =
    useState(false);

  const handleOpenSecurityandPrivacyModal = () => {
    setSecurityandPrivacyModalOpen(true);
  };
  const handleDismissSecurityandPrivacyModal = () => {
    setSecurityandPrivacyModalOpen(false);
  };

  const [NotificationsModalOpen, setNotificationsModalOpen] = useState(false);

  const handleOpenNotificationsModal = () => {
    setNotificationsModalOpen(true);
  };
  const handleDismissNotificationsModal = () => {
    setNotificationsModalOpen(false);
  };

  const [AppearanceModalOpen, setAppearanceModalOpen] = useState(false);

  const handleOpenAppearanceModal = () => {
    setAppearanceModalOpen(true);
  };
  const handleDismissAppearanceModal = () => {
    setAppearanceModalOpen(false);
  };

  const [AboutUsModalOpen, setAboutUsModalOpen] = useState(false);

  const handleOpenAboutUsModal = () => {
    setAboutUsModalOpen(true);
  };
  const handleDismissAboutUsModal = () => {
    setAboutUsModalOpen(false);
  };
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  useEffect(() => {
    const getUser = async () => {
      const userStored = await storage.get('user')
      if (userStored) {
        setUser(userStored)
      }
    }

    getUser()
  }, [])

  const avatar = useMemo(() => {
    return createAvatar(bigSmile, {
      size: 128,
      // ... other options
    }).toDataUriSync();
  }, []);

  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false)
  const confirmOpenModal = useRef<HTMLIonModalElement>(null);
  const handleOpenConfirmLogout = () => {
    setConfirmLogoutModal(true)
  }
  const handleCloseConfirmLogout = () => {
    setConfirmLogoutModal(false)
  }
  const handleLogout = async () => {
    await storage.clear()
    window.location.reload()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>

      <IonRow className="first-row">
        <IonCol size="3">
          <IonImg src={avatar} alt="Profile Picture" />
          {/* <img src={avatar} alt="Avatar" /> */}
        </IonCol>
        <IonCol>
          <p className="user-name">{user.first_name} {user.last_name}</p>
          <p className="user-email">{user.email}</p>
        </IonCol>
      </IonRow>

      <IonCard className="card">
        <IonCol>
          <IonIcon icon={helpCircle} slot="start" />
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
              <defs>
                <mask id="ipSHelp0">
                  <g fill="none">
                    <path fill="#fff" stroke="#fff" strokeLinejoin="round" strokeWidth="4" d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z" />
                    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 28.625v-4a6 6 0 1 0-6-6" />
                    <path fill="#000" fillRule="evenodd" d="M24 37.625a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5" clipRule="evenodd" />
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSHelp0)" />
            </svg>
            Help
          </p>
        </IonCol>

        <IonCol onClick={handleOpenAccountModal}>
          <IonIcon icon={person} slot="start" />
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 13q1.45 0 2.475-1.025T15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15t-3.863.763T5 17.85z" />
            </svg>
            Account
          </p>
        </IonCol>
      </IonCard>

      <IonCard className="middle-card">
        <IonCol onClick={handleOpenSecurityandPrivacyModal}>
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.425-.75 4.05-2.963T17.95 12H12V4.125l-6 2.25v5.175q0 .175.05.45H12z" />
            </svg>
            Security & Privacy
          </p>
        </IonCol>
        <IonCol onClick={handleOpenNotificationsModal}>
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="none">
                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3.001 3.001 0 0 1-2.83-2h5.66A3.001 3.001 0 0 1 12 21" />
              </g>
            </svg>
            Notification Settings
          </p>
        </IonCol>
        <IonCol onClick={handleOpenAppearanceModal}>
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
              <path fill="currentColor" fillRule="evenodd" d="M4.35.577a7 7 0 0 1 9.381 4.085c.27.758.15 1.626-.315 2.282A2.526 2.526 0 0 1 11.37 8H9.5a1.5 1.5 0 0 0-.455 2.931c.55.205.935.702.972 1.286a1.43 1.43 0 0 1-1.01 1.524A6.8 6.8 0 0 1 7.129 14a7 7 0 0 1-3.636-1.021A7.055 7.055 0 0 1 .15 6.517a7.055 7.055 0 0 1 4.2-5.94M4.5 7a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6-3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-6 6.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clipRule="evenodd" />
            </svg>
            Appearance
          </p>
        </IonCol>
      </IonCard>

      <IonCard className="card">
        <IonCol onClick={handleOpenAboutUsModal}>
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
              <defs>
                <mask id="ipSHelp0">
                  <g fill="none">
                    <path fill="#fff" stroke="#fff" strokeLinejoin="round" strokeWidth="4" d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z" />
                    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 28.625v-4a6 6 0 1 0-6-6" />
                    <path fill="#000" fillRule="evenodd" d="M24 37.625a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5" clipRule="evenodd" />
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSHelp0)" />
            </svg>
            About Us
          </p>
        </IonCol>
        <IonCol onClick={handleOpenConfirmLogout}>
          <p className="card-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="M10.796 2.244C12.653 1.826 14 3.422 14 5v14c0 1.578-1.347 3.174-3.204 2.756C6.334 20.752 3 16.766 3 12s3.334-8.752 7.796-9.756m5.497 6.049a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L17.586 13H9a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414" clipRule="evenodd" />
            </svg>
            Logout
          </p>
        </IonCol>
      </IonCard>

      <Account
        AccountModalOpen={AccountModalOpen}
        AccountModalClose={handleDismissAccountModal}
      />
      <SecurityandPrivacy
        SecurityandPrivacyModalOpen={SecurityandPrivacyModalOpen}
        SecurityandPrivacyModalClose={handleDismissSecurityandPrivacyModal}
      />
      <Notifications
        NotificationsModalOpen={NotificationsModalOpen}
        NotificationsModalClose={handleDismissNotificationsModal}
      />
      <Appearnace
        AppearanceModalOpen={AppearanceModalOpen}
        AppearanceModalClose={handleDismissAppearanceModal}
      />
      <AboutUs
        AboutUsodalOpen={AboutUsModalOpen}
        AboutUsModalClose={handleDismissAboutUsModal}
      />

      <IonModal
        isOpen={confirmLogoutModal}
        onDidDismiss={handleCloseConfirmLogout}
        ref={confirmOpenModal}
        trigger="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        className="modal"
      >
        <IonRow
          class="ion-justify-content-center"
          className="modal-title"
        >
          <IonText>Select Account</IonText>
        </IonRow>
        <div className="edit-budget-actions">
                    <IonButton className='' onClick={handleCloseConfirmLogout}>Cancel</IonButton>
                    <IonButton className='delete-btn' onClick={handleLogout}>Logout</IonButton>
                </div>
      </IonModal>
    </IonPage>
  );
};
