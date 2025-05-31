import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonChip, IonNote, IonIcon } from '@ionic/react';
import './styles.scss';
import moment from 'moment';

interface ReportsCardProps {
  title: string;
  data: {
    label: string;
    value: number;
    date?: string;
  }[];
}

import { barChartOutline } from 'ionicons/icons';
const StatisticReportCard = ({report}: any) => {
  return (
    <IonCard className='report-card'>
      <IonIcon icon={barChartOutline}/>
      <span>{moment(report.month + 1, 'M').format('MMMM')} {report.year}</span>
      
    </IonCard>
  );
};

export default StatisticReportCard;