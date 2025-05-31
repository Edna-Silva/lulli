import React from "react";
import { IonContent, IonPage, IonTitle } from "@ionic/react";
import {SwiperSlide, Swiper} from "swiper/react";
import Welcome from "../Welcome";
import SignIn from "../Sign In";
import SelectSuggestedCategories from "../Select Suggested Catagories";
import './styles.scss';
const OnboardingSlide : React.FC = () => {
    return(
        <IonPage className="onboarding">
            {/* <Welcome/> */}
            <SignIn/>
            {/* <SelectSuggestedCategories/> */}
        </IonPage>
    )
}

export default OnboardingSlide