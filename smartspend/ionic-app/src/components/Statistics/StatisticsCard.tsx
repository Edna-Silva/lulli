import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonText, IonIcon } from '@ionic/react';
import './StatisticsCard.scss';
import { add, bagHandleOutline, carSportOutline, cashOutline, fastFoodOutline, videocamOutline } from 'ionicons/icons';

interface StatisticsCardProps {
  title: string;
  data: { label: string; value: number }[];
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, data }) => {
  return (
    <IonCard className='statistic-card'>
      <IonIcon icon={bagHandleOutline}/>
      <span><span>Groceries</span> <span>N$ 300</span></span>
    </IonCard>
  );
};

export default StatisticsCard;