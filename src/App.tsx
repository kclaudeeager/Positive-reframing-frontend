import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, homeSharp, triangle } from 'ionicons/icons';
import Login from './pages/Login';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import TweetWithReplies from './components/TweetWithReplies';
import NewPost from './components/NewTweet';
import Signup from './pages/Signup';




setupIonicReact();
const App: React.FC = () => (

  <IonApp>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
           
          </Route>
          <Route exact path="/signup">
            <Signup/>
           
          </Route>
          <Route path="/home/:tweetId">
          <TweetWithReplies/>
            </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/new">
           <NewPost />
          </Route>
          <Redirect to="/login"/>
         
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Login" href="/login">
            <IonIcon icon={triangle} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="newTweet" href="/new">
            <IonIcon icon={addCircle} />
            <IonLabel>New_Tweet</IonLabel>
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  
    
  </IonApp>
);

export default App;
