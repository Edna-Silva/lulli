import { IonModal, IonRow, IonText, IonInput, IonIcon, IonButton } from "@ionic/react"
import { closeCircle, checkmarkCircle } from "ionicons/icons"
import { useRef, useState } from "react"


const SelectedBudget = ({ selectedModalOpen, selectedModalClose, budget }: any) => {
    const selectedModal = useRef<HTMLIonModalElement>(null)
    const [budgetName, setBudgetName] = useState(budget.name)
    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value
        setBudgetName(value)
    }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    console.log(budget);

    return (
        <IonModal
            isOpen={selectedModalOpen}
            onDidDismiss={selectedModalClose}
            ref={selectedModal}
            trigger="open-modal"
            className="modal"
        >
            <IonRow
                class="ion-justify-content-center"
                className="modal-title"
            >
                <IonText>Edit Budget</IonText>
            </IonRow>

            <IonRow>
                <IonInput type="text" className="enter-budget" value={budgetName}
                    onIonChange={handleInputChange} />
            </IonRow>
            <div className="bottom-actions">
                <div className="bottom-actions bottom-action-btns">
                    <IonButton className='delete-btn' onClick={handleDelete}>Delete</IonButton>
                    <IonButton className='' onClick={handleEdit}>Edit</IonButton>
                </div>
            </div>
        </IonModal>
    )
}

export default SelectedBudget