import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoTwitter } from "ionicons/icons";
import React, { useState } from "react";
import axios from "axios";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonAlert } from "@ionic/react";
import "./Login.css";
import { Wave } from "../components/Wave";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("claudekwizera003@gmail.com");
  const [username, setuserName] = useState<string>("Claude");
  const [password, setPassword] = useState<string>("12345");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const[login,setLogin]=useState<string>("Login")
  function validateEmail(email: string) {
    const re =
      // eslint-disable-next-line no-control-regex
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleLogin = () => {
   
    if (!email) {
      setMessage("Please enter a valid email");
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setIserror(true);
      return;
    }

    if (!password || password.length < 5) {
      setMessage("Please enter your password");
      setIserror(true);
      return;
    }
    setLogin("loading......")

    const FormData = require("form-data");
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/users/login",
      headers: data.getHeaders
        ? data.getHeaders()
        : { "Content-Type": "multipart/form-data" },
      data: data,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Token to save: ", response.data.access_token);
        localStorage.setItem("token", response.data.access_token);
        //history.push("/home/");
        window.location.assign("/home");
        setLogin("Login")
      })
      .catch((error) => {
        console.log(error);
        setMessage("Auth failure! Please create an account");
        //Auth failure! Please create an account
        setIserror(true);
        setLogin("Login")
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonAvatar></IonAvatar>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon color="primary" icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle color="primary">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center ">
        <IonGrid className="md:w-1/2 mx-auto border-2 md:border-none ">
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => setuserName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p style={{ fontSize: "small" }}>
                By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p>
              <IonButton expand="block" onClick={handleLogin}>
                {login}
              </IonButton>
              <p style={{ fontSize: "medium" }}>
            
                Don't have an account? <a href="/signup" style={{}}>Sign up!</a>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <ExploreContainer /> */}
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding"></IonGrid>
        <Wave/>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
