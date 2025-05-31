import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react"
import {walletOutline, homeOutline, clipboardOutline, personOutline, pieChartOutline } from 'ionicons/icons';
import React from "react";

const ToolBar: React.FC  = () =>{
    return(
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="wallet" href="/wallet">
            <IonIcon aria-hidden="true" icon={walletOutline} />
          </IonTabButton>
          <IonTabButton tab="budget" href="/budget">
            <IonIcon aria-hidden="true" icon={clipboardOutline} />
          </IonTabButton>
          <IonTabButton tab="statistics" href="/statistics">
            <IonIcon aria-hidden="true" icon={pieChartOutline} />
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
          </IonTabButton>
        </IonTabBar>
    )
}

export default ToolBar