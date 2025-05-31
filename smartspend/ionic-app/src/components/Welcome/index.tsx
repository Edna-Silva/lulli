import React from "react";
import {
  IonContent,
  IonPage,
  IonTitle,
  IonButton,
  IonText,
  IonCol,
  IonRow,
} from "@ionic/react";
import "./styles.scss";
import {useHistory} from 'react-router-dom'

const Welcome: React.FC = ()  => {
  const history = useHistory()
  const handleNavigation = () => {
    history.push('/signin')
  }
  return (
    <div className="welcome">
      <div className="circles">
      <div className="circle small-inner-circle"></div>
      <div className="circle outline-circle"></div>
      <div className="circle gradient-circle"></div>
      <div className="circle small-circle sm1"></div>
      <div className="circle small-circle sm2"></div>
      <div className="circle small-circle sm3"></div>
      </div>
      
      <div className="vertical-line"></div>


      <IonRow className="welcome-content">
        <IonText className="welcome-title"><span className="welcome-to">Welcome to</span><br /><span className="smartspend-name">SmartSpend</span></IonText>
        
        <IonText className="personal-finance">Your personal finance manager</IonText>
        <IonText className="brought-to-you">
          Proudly brought to you by Bank X
        </IonText>
      </IonRow>
      <IonRow className="button-content">
        <IonButton className="get-started-btn" onClick={handleNavigation} >Get Started</IonButton>
      </IonRow>
    </div>
  );
};

export default Welcome;
