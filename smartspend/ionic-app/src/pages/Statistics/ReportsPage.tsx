import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip } from '@ionic/react';
import ReportsCard from '../../components/Statistics/ReportsCard';
import 'ReportsPage.scss';

const ReportsPage: React.FC = () => {
  const reportsData = [
    {
      label: 'March 2024',
      data: [
        { label: 'Pick n Pay Namibia', value: -18.25 },
        { label: 'Pick n Pay Namibia', value: -18.25 },
        { label: 'Pick n Pay Namibia', value: -18.25, date: 'Due Today' },
        { label: 'Pick n Pay Namibia', value: -18.25 },
      ],
    },
    {
      label: 'February 2024',
      data: [
        { label: 'Pick n Pay Namibia', value: -15.12 },
        { label: 'Pick n Pay Namibia', value: -15.12 },
        { label: 'Pick n Pay Namibia', value: -15.12 },
      ],
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics: View Reports</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {reportsData.map((report, index) => (
          <div key={index}>
            <IonChip color="danger">Expense: N{report.data.reduce((sum, item) => sum + item.value, 0)}</IonChip>
            <IonChip color="success">Income: N$0.00</IonChip>
            <ReportsCard title={report.label} data={report.data} />
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ReportsPage;