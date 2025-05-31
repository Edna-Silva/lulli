import {
  IonButton,
  IonCard,
  IonCol,
  IonHeader,
  IonIcon,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import storage from "../../redux/store";
import { useGetUserQuery } from "../../services/backend";
import { setCredentials } from "../../services/auth/auth.slice";

import { add, bagHandleOutline, carSportOutline, cashOutline, fastFoodOutline, videocamOutline } from 'ionicons/icons';
import "./styles.scss";
import { useDispatch } from "react-redux";

interface Category {
  id: string | number;
  name: string;
  iconName: string;
}

interface SuggestedCategory {
  id: string | number;
  name: string;
  className: string;
}

interface ComponentProps {
  onCompleted: () => void
}
const SelectSuggestedCategories = ({onCompleted}: ComponentProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory()
  const dispatch = useDispatch()

  const suggestedCategoryOptions: SuggestedCategory[] = [
    { id: btoa('Food and Drinks'), name: 'Food and Drinks', className: 'show' },
    { id: btoa('Transport'), name: 'Transport', className: 'show' },
    { id: btoa('Entertainment'), name: 'Entertainment', className: 'show' },
    { id: btoa('Groceries'), name: 'Groceries', className: 'show' },
    { id: btoa('Bills and Subscriptions'), name: 'Bills and Subscriptions', className: 'show' }
  ]

  const [suggestedCategories, setSuggestedCategories] = useState<SuggestedCategory[]>(suggestedCategoryOptions);



  const addCategory = (newCategory: SuggestedCategory) => (): void => {
    const iconNames = [
      { name: fastFoodOutline, categoryName: 'Food and Drinks' },
      { name: carSportOutline, categoryName: 'Transport' },
      { name: videocamOutline, categoryName: 'Entertainment' },
      { name: bagHandleOutline, categoryName: 'Groceries' },
      { name: cashOutline, categoryName: 'Bills and Subscriptions' }

    ]


    const category: Category = {
      id: newCategory.id,
      name: newCategory.name,
      iconName: iconNames.find(iconName => iconName.categoryName === newCategory.name)?.name || ""
    }

    const updatedSuggestedCategories = suggestedCategories.map(cat => {
      if (cat.id === newCategory.id) {
        return { ...cat, className: 'hidden' }; // Create a new object with updated className
      } else {
        return cat;  // Leave other categories unchanged
      }
    });

    setSuggestedCategories(updatedSuggestedCategories);


    setCategories(previousCategories => [...previousCategories, category])
  }

  const removeCategory = (categoryId: string | number) => (): void => {
    const updatedSuggestedCategories = suggestedCategories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, className: 'show' }; // Create a new object with updated className
      } else {
        return cat;  // Leave other categories unchanged
      }
    });

    setSuggestedCategories(updatedSuggestedCategories);
    setCategories(previousCategories => previousCategories.filter(category => category.id !== categoryId));
  }
  const handleBackNavigation = () => {
    history.push('/welcome-screen')
  }

  const setCurrentUser = async () => {
    const {data: user = {}} = useGetUserQuery()
    await storage.set('user', user)
    dispatch(setCredentials(user))
  }

  setCurrentUser()
  
  const handleCompletion = () => {
    onCompleted()
    storage.set('is_onboarded', true)
    
    
    
    history.push('/')
  }
  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <div className="tool-bar-title"><IonTitle>Add Categories</IonTitle></div>
        </IonToolbar>
      </IonHeader>
      
      <IonCol className="selected-categories">
        {categories.map(category =>
          <IonCard key={category.id} onClick={removeCategory(category.id)}>
            <IonIcon icon={category.iconName} aria-hidden="true" />
            <IonText>{category.name}</IonText>
          </IonCard>
        )}
      </IonCol>
      <IonRow className="suggestions-title" >
        <IonText >Suggestions</IonText>
      </IonRow>
      <IonRow className="option-btns">

        {suggestedCategories.map(suggestedCategoryOption =>
          <IonButton key={suggestedCategoryOption.id} onClick={addCategory(suggestedCategoryOption)} className={`${suggestedCategoryOption.className} category-btn`} ><IonIcon aria-hidden="true" icon={add} />{suggestedCategoryOption.name}</IonButton>

        )}
      </IonRow>
      <IonRow className="finish-btn-row">
      <IonButton expand="block" className="finish-btn" onClick={handleCompletion}>Finish</IonButton>
      </IonRow>
    </div>

  );
};

export default SelectSuggestedCategories;
