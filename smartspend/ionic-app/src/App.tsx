import {
  IonApp,
  IonContent,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { clipboardOutline, homeOutline, personOutline, pieChartOutline, walletOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectSuggestedCategories from './components/Select Suggested Catagories';
import SignIn from './components/Sign In';
import Welcome from './components/Welcome';
import { Budget, Home, Profile, StatisticsPage, Wallet } from './pages';
import { onboardUser } from './services/auth/auth.slice';
import LoadingScreen from './components/LoadingScreen';
import { fetchAndStoreAPIData } from './utils/util';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './default.scss';
import storage from './redux/store';
import { useRefreshTokenMutation } from './services/backend';
import './theme/variables.css';
setupIonicReact();

const checkIsOnboarded = async () => {
  return await storage.get('is_onboarded');
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const isOnboardedValue = await checkIsOnboarded();
      setIsOnboarded(isOnboardedValue || false); // Handle potential null/undefined values
    };

    checkOnboardingStatus();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOnboardingComplete = async() => {
    setIsOnboarded(!isOnboarded);
    dispatch(onboardUser());
    await fetchAndStoreAPIData(dispatch)
  };

  // render LoadingScreen component while onboarding is null
  if (isOnboarded === null) {
    return <LoadingScreen />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {/* Conditional check to see if the user is onboarded or not */}
        {!isOnboarded ? (
          <>
            <Route exact path="/welcome-screen">
              <Welcome />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path={'/onboarding-add-categories'}>
              <SelectSuggestedCategories onCompleted={handleOnboardingComplete} />
            </Route>
            <Redirect to={'/welcome-screen'} />
          </>
        ) : (
          <>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/">
                  <Redirect to={'/home'} />
                </Route>
                <Route exact path="/wallet">
                  <Wallet />
                </Route>
                <Route exact path="/budget">
                  <Budget />
                </Route>
                <Route exact path="/statistics">
                  <StatisticsPage />
                </Route>
                <Route exact path="/Profile">
                  <Profile />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={homeOutline} />
                </IonTabButton>
                <IonTabButton tab="wallet" href="/wallet">
                  <IonIcon aria-hidden="true" icon={walletOutline} />
                </IonTabButton>
                <IonTabButton tab="budget" href="/budget">
                  <IonIcon aria-hidden="true" icon={clipboardOutline} />
                </IonTabButton>
                <IonTabButton tab="statistics" href="/statistics">
                  <IonIcon aria-hidden="true" icon={pieChartOutline} />
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon aria-hidden="true" icon={personOutline} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </>
        )}
      </IonReactRouter>
      {/* Display the message conditionally */}
      {!isOnline && (
        <IonContent className="ion-padding">
          <IonText color="danger">
            You are offline. Please connect to the internet to use this app.
          </IonText>
        </IonContent>
      )}
    </IonApp>
  );
};

export default App;