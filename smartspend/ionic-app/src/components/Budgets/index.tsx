import { IonButton, IonHeader, IonIcon, IonInput, IonModal, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { bagHandleOutline, apertureOutline, giftOutline, carSportOutline, cashOutline, closeCircle, fastFoodOutline, videocamOutline } from "ionicons/icons";
import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import storage from "../../redux/store";
import { useDeleteBudgetMutation, useGetBudgetsQuery, useUpdateBudgetMutation } from "../../services/backend";
import './styles.scss';
const Budgets = () => {
    const categories = [
        { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
        { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
        { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
        { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
        { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
        { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
        { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

    ]

    const [updateBudget] = useUpdateBudgetMutation()
    const [deleteBudget] = useDeleteBudgetMutation()
    const [budget, setBudget] = useState<any>({})
    const [budgets, setBudgets] = useState<any>([])
    const [category, setCategory] = useState<any>({})
    const { data: budgetsDb = [] } = useGetBudgetsQuery()
    useEffect(() => {
        const getBudgets = async () => {
            const existingBudgets = await storage.get('budgets')
            setBudgets(existingBudgets)
        }

        getBudgets()


    }, [])

    useEffect(() => {
        const refreshBudgets = async () => {
            const storedBudgets = await storage.get('budgets');
            if (!isEqual(storedBudgets, budgetsDb) && budgetsDb) {
                await storage.set('budgets', budgetsDb)
                setBudgets(budgetsDb)
            }

        }
        refreshBudgets()

    }, [budgetsDb])

    const getCategory = (id: number) => {
        const category = categories.filter((cat: any) => {
            return cat.id === id
        })

        return category
    }




    const selectedModal = useRef<HTMLIonModalElement>(null)
    const [budgetName, setBudgetName] = useState(budget.name)
    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setBudgetName(value)
    }

    const [budgetAmount, setBudgetAmount] = useState(budget.total_amount)
    const handleBudgetAmountInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setBudgetAmount(value)
    }
    const [isSelectedBudgetModalOpen, setIsSelectedBudgetModalOpen] = useState(false);
    const handleOpenSelectedBudget = () => {
        setIsSelectedBudgetModalOpen(true)
    }

    const handleCloseSelectedBudget = () => {
        setIsSelectedBudgetModalOpen(false)
    }

    const changeCategory = () => {

    }


    const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(false);
    const selectCategoryModal = useRef<HTMLIonModalElement>(null);
    const handleOpenSelectCategory = () => {
        setIsSelectCategoryModalOpen(true)
    }

    const handleCloseSelectCategory = () => {
        setIsSelectCategoryModalOpen(false)
    }
    const handleEdit = () => {
        const budgetData: any = { id: budget.id }

        if (budgetName) {

            budgetData.name = budgetName
        }
        if (!isEqual(budget.categories, category)) {
            budgetData.categories = { id: category.id, name: category.categoryName, icon_name: '' }
        }

        if (budgetAmount) {
            console.log(budgetAmount);

            budgetData.total_amount = budgetAmount
        }

        updateBudget(budgetData)

        setTimeout(() => {
            window.location.reload()
          }, 3000);
    }

    const handleDelete = () => {
        const budgetData = {
            id: budget.id
        }

        deleteBudget(budgetData)
        setTimeout(() => {
            window.location.reload()
          }, 2000);
       
    }


    const [fillPercentage, setFillPercentage] = useState(
        (budget.current_expenditure / budget.total_amount) * 100
    );

    const calculateFillPercentage = (current: any, total: any) => {
        if (total === 0) return 0; // Avoid division by zero
        return Math.min((current / total) * 100, 100); // Cap at 100%
    };
    const fillColor =
        fillPercentage <= 20
            ? 'green'
            : fillPercentage <= 60
                ? '#7165E3'
                : '#E60026';
    return (
        <>
            {budgets.map((budget: any) => {
                const fillPercentage = calculateFillPercentage(budget.current_expenditure, budget.total_amount);
                const fillColor =
                    fillPercentage <= 20
                        ? 'var(--budget-fill-green)'
                        : fillPercentage <= 60
                            ? '#7165E3'
                            : '#E60026';
                return (
                    <div

                        className="budget-name"
                        key={budget.id}
                        onClick={() => {
                            setBudget(budget)
                            handleOpenSelectedBudget()
                            setCategory(getCategory(budget.categories.id)[0])
                        }}
                        style={{
                            backgroundColor: 'var(--ion-color-secondary)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            className="fill-indicator"
                            style={{
                                position: 'absolute',
                                top: 0, // Fill from the top down
                                left: 0,
                                width: `${fillPercentage}%`,
                                height: '100%',
                                backgroundColor: fillColor,
                            }}
                        ></div>
                        <div className="left-side">
                            <IonIcon icon={getCategory(budget.categories.id)[0].name} className="budget-icon" style={{ color: fillPercentage < 60 ? 'var(--ion-text-color)' : '#F8F8FF' }} />
                            <div className="budget-title" >
                                <span className="clothing-text" style={{ color: fillPercentage < 60 ? 'var(--ion-text-color)' : '#F8F8FF' }}>{budget.name}</span>
                                <span className="money1" style={{ color: fillPercentage < 60 ? 'var(--ion-text-color)' : '#F8F8FF' }}>N$ {budget.total_amount}</span>
                            </div>
                        </div>
                        <div className="right-side">
                            <span className="spent-text" style={{ color: fillPercentage < 60 ? 'var(--ion-text-color)' : '#F8F8FF' }}>Spent</span>
                            <span className="money2" style={{ color: fillPercentage < 60 ? 'var(--ion-text-color)' : '#F8F8FF' }}>N$ {budget.current_expenditure}</span>
                        </div>

                    </div>)
            }
            )}

            <IonModal
                isOpen={isSelectCategoryModalOpen}
                onDidDismiss={handleCloseSelectCategory}
                ref={selectCategoryModal}
                trigger="open-modal"
                initialBreakpoint={1}
                breakpoints={[0, 1]}
                className="modal"
                id="open-modal"
            >
                <IonRow
                    class="ion-justify-content-center"
                    className="modal-title"
                >
                    <IonText>Select Category</IonText>
                </IonRow>
                <IonRow className="saved-categories">
                    {categories.map((category) => (
                        <div className={`saved-category ${category.class}`} key={category.id} onClick={() => {
                            handleCloseSelectCategory()
                            setCategory(category)
                        }}>
                            <span><IonIcon aria-hidden={true} icon={category.name} />{category.categoryName}</span>
                        </div>
                    ))}
                </IonRow>
            </IonModal>

            <IonModal
                isOpen={isSelectedBudgetModalOpen}
                ref={selectedModal}
                className="confirm-deposit"
            >
                <IonHeader>
                    <IonToolbar className='selected-category-header'>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setIsSelectedBudgetModalOpen(false) }} /><IonTitle>Edit Budget</IonTitle></div>
                    </IonToolbar>
                </IonHeader>

                <IonRow>
                    <IonInput type="text" className="enter-budget" placeholder={budget.name} value={budgetName}
                        onIonChange={handleInputChange} />
                </IonRow>
                <div className={`budget-cat saved-category ${category.class}`} onClick={handleOpenSelectCategory}>
                    <span>
                        <IonIcon aria-hidden={true} icon={category.name} />
                        {category.categoryName}
                    </span>
                </div>
                <IonRow>
                    <IonInput type="number" min={0} className="enter-budget" placeholder={budget.total_amount} value={budgetAmount}
                        onIonChange={handleBudgetAmountInputChange} />
                </IonRow>
                <div className="edit-budget-actions">
                    <IonButton className='delete-btn' onClick={handleDelete}>Delete</IonButton>
                    <IonButton className='' onClick={handleEdit}>Edit</IonButton>
                </div>

            </IonModal>
        </>
    )
}

export default Budgets