import React from 'react';
import { IonContent, IonText } from '@ionic/react';

const LoadingScreen: React.FC = () => {
  return (
    <IonContent className="ion-padding">
      <IonText>Loading...</IonText>
    </IonContent>
  );
};

export default LoadingScreen;