import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonText, IonIcon } from '@ionic/react';
import './styles.scss';
import { add, apertureOutline, bagHandleOutline, carSportOutline, cashOutline, fastFoodOutline, giftOutline, videocamOutline } from 'ionicons/icons';

interface StatisticsCardProps {
  title: string;
  data: { label: string; value: number }[];
}

const StatisticCategory = ({ cat }: any) => {
  const categories = [
    { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
    { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
    { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
    { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
    { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
    { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
    { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

]

  const getCategory = (id: number) => {
    return categories.find((category) => category.id === id);
  }

  const category = getCategory(cat.id); // Get the category outside the JSX for better readability
  const icon = category ? category.name : bagHandleOutline;

  return (
    <IonCard className='statistic-card'>
      <IonIcon icon={icon} />
      <span><span>{category ? category.categoryName : 'Unknown Category'}</span> <span>N$ {cat.total}</span></span>
    </IonCard>
  );
};

export default StatisticCategory;