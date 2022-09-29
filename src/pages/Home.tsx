import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { logoTwitter } from 'ionicons/icons'

import './Home.css';
import TweetCard from '../components/TweetCard';
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonAvatar>
              <img src="https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </IonAvatar>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton >
              <IonIcon color='primary' icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle color='primary'>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
      <TweetCard onCalculate={function (): void {
        throw new Error('Function not implemented.');
      } } onReset={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      <TweetCard onCalculate={function (): void {
        throw new Error('Function not implemented.');
      } } onReset={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      <TweetCard onCalculate={function (): void {
        throw new Error('Function not implemented.');
      } } onReset={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      <TweetCard onCalculate={function (): void {
        throw new Error('Function not implemented.');
      } } onReset={function (): void {
        throw new Error('Function not implemented.');
      } }/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
