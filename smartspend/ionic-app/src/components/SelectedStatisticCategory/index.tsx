import React, { useRef, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonCardHeader, IonCard, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonModal, IonIcon, IonButton, IonInput } from '@ionic/react';
import './styles.scss';
import StatisticCategory from '../StatisticCategory';
import { arrowDownOutline, arrowUpOutline, closeCircle, diamond, searchOutline } from 'ionicons/icons';
import moment from "moment";

const SelectedStatisticCategory: React.FC = ({ addFundsModalOpen, addFundsModalClose }: any) => {

    const confirmOpenModal = useRef<HTMLIonModalElement>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const handleOpenConfirmDeposit = () => {
        setIsConfirmOpen(true)
    }

    console.log(moment().day());
    
    return (
        <>
            <IonContent className='statistic-categories'>
                <div className="header">
                    <IonText>Categories</IonText>
                    <span onClick={handleOpenConfirmDeposit}>View All</span>
                </div>
                <IonGrid >
                    <IonRow class="ion-justify-content-center" >
                        {/* Use a scrollable container for the cards */}
                        <div className="card-scroller">
                            <IonCol size="6" size-md="4" size-lg="3" className='no-padding'>
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>
                            <IonCol size="6" size-md="4" size-lg="3">
                                <StatisticCategory />
                            </IonCol>

                        </div>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                <IonHeader>
                    <IonToolbar>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>Categories</IonTitle></div>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div className="search-box">
                        {/* <IonIcon icon={searchOutline} /> */}
                        <IonInput type="text"
                            inputmode="text"
                            placeholder="Search"
                            className="description-input"

                        >
                            <IonIcon icon={searchOutline} />
                        </IonInput>
                    </div>
                    <div className='category-card'>
                        <div className='category-title-and-balance'>
                            <span><IonIcon icon={diamond} /><span>Entertainment</span></span>
                            <span>N$ 200</span>
                        </div>
                        <div className='expense-and-income'>
                            <span className='expense'><IonIcon aria-hidden={true} icon={arrowUpOutline} />Expenses N$ 300</span>
                            <span className='income'><IonIcon aria-hidden={true} icon={arrowDownOutline} />Income N$ 300</span>
                        </div>
                    </div>
                </IonContent>
            </IonModal>
        </>
    );
};

export default SelectedStatisticCategory