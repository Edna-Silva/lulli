import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonCardHeader, IonCard, IonCardSubtitle, IonCardContent, IonCardTitle, IonText } from '@ionic/react';
import './StatisticsPage.scss';
import StatisticsCategories from '../../components/StatisticCategories';
import StatisticReportCards from '../../components/StatisticReportCards';

import ChartComponent from '../../components/Chart';

export const StatisticsPage: React.FC = () => {
  const categoriesData = [
    { label: 'Entertainment', value: 10000 },
    { label: 'Furniture', value: 5000 },
  ];

  const expensesData = [
    { label: 'Entertainment', value: -200 },
  ];

  return (
    <IonPage>
      <IonHeader className='statistics-header'>
        <IonToolbar>
          <IonTitle className='statistics-title'>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ChartComponent />


      <IonContent className='rest-of-stats'>
        <StatisticsCategories />
        <StatisticReportCards />
      </IonContent>
    </IonPage>
  );
};
