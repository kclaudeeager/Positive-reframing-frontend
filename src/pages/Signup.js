import { IonBackButton, IonButton, IonButtons,IonAvatar, IonAlert,IonTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Signup.module.scss';

import { arrowBack, shapesOutline ,logoTwitter} from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import axios from "axios";
const Signup = () => {

    const params = useParams();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState(false);
    const [iserror, setIserror] = useState(false);
    const [message, setMessage] = useState("");
    function validateEmail(email) {
        const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        return re.test(String(email).toLowerCase());
    }
    const createAccount = () => {

        const errors = validateForm(fields);
        setErrors(errors);
        if (validateEmail(fields[1].input.state.value) === false) {
            setMessage("Your email is invalid");
            setIserror(true);
            return;
        }
        if (!errors.length &&!iserror ) {
    
         const data={
            email: fields[1].input.state.value,
            username:fields[0].input.state.value,
            password: fields[2].input.state.value,
            profile_image:""
         }
         register(data)
        }
    }
    const register=(userInfo)=>{
         let url="http://127.0.0.1:8000/api/users/register"
        let data = JSON.stringify(userInfo);
          const config = {
            method: 'post',
            url: url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
           window.location.assign("/");
          })
          .catch(function (error) {
            console.log(error);
            setMessage("Auth failure! "+error);
            //Auth failure! Please create an account
            setIserror(true)
          });
      }
      
    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
	
	return (
		<IonPage className={ styles.signupPage }>
      
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>
          <IonButtons slot="end">
            <IonButton >
              <IonIcon color='primary' icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle color='primary'>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>

			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            {/* <IonCardTitle>Sign up</IonCardTitle> */}
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
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
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Already got an account?" text="Login" link="/login" />
                    <Wave />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Signup;