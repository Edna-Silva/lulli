import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonChip, IonNote } from '@ionic/react';
import 'ReportsCard.scss';

interface ReportsCardProps {
  title: string;
  data: {
    label: string;
    value: number;
    date?: string;
  }[];
}

const ReportsCard: React.FC<ReportsCardProps> = ({ title, data }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {data.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                {item.label}
                {item.date && <IonNote slot="end">{item.date}</IonNote>}
              </IonLabel>
              <IonChip color="primary">{item.value}</IonChip>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default ReportsCard;