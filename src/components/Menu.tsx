import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, warningOutline, warningSharp,home,homeOutline,homeSharp,bagCheck,bagAdd,bagCheckSharp, bagCheckOutline, checkmarkDone, checkmarkCircleOutline, checkmarkCircle, moveSharp, locateSharp, businessSharp, cashSharp, handRightSharp, handLeftSharp, enterSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Pay parking',
    url: '/page/Pay',
    iosIcon:bagCheckOutline ,
    mdIcon:bagCheckSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Paid',
    url: '/page/paid',
    iosIcon:checkmarkCircleOutline,
    mdIcon: checkmarkCircle
  },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const handleLogout = () => {
    // make a request to the logout endpoint using your desired method
    // for example using `fetch`
    fetch("http://127.0.0.1:8000/api/users/logout", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${""}` // include the token in the headers
        },
    }).then(() => {
        // redirect to login page on successful logout
        localStorage.removeItem("token")
        history.push("/login");
    });
  }
  return (
    <IonMenu contentId="main" type="overlay" className=''>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Logged in use</IonListHeader>
          <IonNote>email@gmail.com</IonNote>
          <IonList>
              <IonItem>
                <IonButton onClick={handleLogout}>Logout</IonButton>
              </IonItem>
            </IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
