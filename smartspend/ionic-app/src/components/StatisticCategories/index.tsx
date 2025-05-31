import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonCardHeader, IonCard, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonModal, IonIcon, IonButton, IonInput, IonFab, IonFabButton } from '@ionic/react';
import './styles.scss';
import StatisticCategory from '../StatisticCategory';
import { add, arrowDownOutline, arrowUpOutline, bagHandleOutline, carSportOutline, cashOutline, checkmarkCircle, closeCircle, diamond, fastFoodOutline, searchOutline, trash, trashOutline, videocamOutline } from 'ionicons/icons';
import Chart from '../Chart';
import RecentTransactions from '../RecentTransactions';
import storage from '../../redux/store';
import { setTransactions } from '../../services/transaction/transaction.slice';

const StatisticsCategories: React.FC = () => {
    const [transactions, setTransactions] = useState<any>([])
    const confirmOpenModal = useRef<HTMLIonModalElement>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [category, setCategory]= useState<any>({})
    const handleOpenConfirmDeposit = () => {
        setIsConfirmOpen(true)
    }

    
    const selectedCategory = useRef<HTMLIonModalElement>(null);
    const [isSelectedCategoryOpen, setSelectedCategoryOpen] = useState(false)
    const handleOpenSelectedCategoryOpen = () => {
        setSelectedCategoryOpen(true)
    }

    const handleDismissSelectedCategoryOpen = () => {
        setSelectedCategoryOpen(true)
    }

    const deleteModal = useRef<HTMLIonModalElement>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
    const handleOpenDeleteModalOpen = () => {
        setDeleteModalOpen(true)
    }

    const handleDismissDeleteModal = () => {
        setDeleteModalOpen(true)
    }

    

    useEffect(() => {
        const storeTransactions = async () => {
            const existingTransactions = await storage.get('transactions');
            if (existingTransactions) {
              try {
                const categoryTotals: any = {};
          
                // Calculate category totals
                existingTransactions.forEach((item: any) => {
                    
                  const amount = item.income ? item.income.amount : item.expense ? -item.expense.amount : 0;
                  const categoryId = item.income ? item.income.category : item.expense ? item.expense.category: null
          
                  categoryId? categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + amount : null
                });
          
                // Create desired structure
                const structuredTransactions = Object.keys(categoryTotals).map(categoryId => ({
                  id: Number(categoryId),
                  total: categoryTotals[categoryId]
                }));
          
                setTransactions(structuredTransactions);
              } catch (err) {
                console.error("Error storing transactions:", err);
              }
            }
          };

        storeTransactions()
        

    }, [])
    return (
        <>
            <div className='statistic-categories'>
                <div className="header">
                    <IonText>Categories</IonText>
                </div>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center" >
                        {/* Use a scrollable container for the cards */}
                        <div className="card-scroller">
                            {transactions.map((transaction: any) => (
                                    
                                    <IonCol size="6" size-md="4" size-lg="3" className='no-padding' key={transaction.id} >
                                        <StatisticCategory cat={transaction} onClick={() => {
                                            setCategory(transaction) 
                                            handleOpenSelectedCategoryOpen()} } />
                                    </IonCol>
                                
                            ))}

                        </div>
                    </IonRow>
                </IonGrid>
            </div>

            <IonModal isOpen={isConfirmOpen} ref={confirmOpenModal} className="confirm-deposit">
                <IonHeader >
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
                    <div className='category-card' onClick={handleOpenSelectedCategoryOpen}>
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

            <IonModal isOpen={isSelectedCategoryOpen} ref={selectedCategory} className="confirm-deposit">
                <IonHeader className='category-header'>
                    <IonToolbar className='selected-category-header'>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsConfirmOpen(false) }} /><IonTitle>{category.categoryName}</IonTitle> <IonIcon aria-hidden={true} icon={trash} onClick={handleOpenDeleteModalOpen} /></div>
                    </IonToolbar>
                </IonHeader>
                <Chart />
                <RecentTransactions />
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton >
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonModal>

            <IonModal
                isOpen={isDeleteModalOpen}
                onDidDismiss={handleDismissDeleteModal}
                ref={deleteModal}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
                id='open-modal'
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText>Confirm Delete</IonText>
                </IonRow>
                <IonText className='confirm-delete-message'>
                    <b>ALL DATA IN THIS
                        CATEGORY WILL BE LOST</b>
                </IonText>
                <div className="bottom-actions">
                    <IonButton className='cancel-btn'>Cancel</IonButton>
                    <IonButton className='delete-btn'>Delete</IonButton>
                </div>
            </IonModal>


        </>
    );
};

export default StatisticsCategories