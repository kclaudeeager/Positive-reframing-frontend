import { IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonRow }  from '@ionic/react';
import { useState } from 'react';
import {send} from 'ionicons/icons';

import './RepliesCard.css';

const RepliesCard: React.FC<{ }> = props => {
    const [reply, setReply] = useState<string>();

    return (

        <>
        <IonRow >
            <IonItem>
                <IonLabel position="floating">Write your comment</IonLabel>
                <IonInput value={reply}></IonInput>
            </IonItem>
            <button  style={{ all: "unset" }} type="submit"><IonIcon className='' color='primary' icon={send}></IonIcon></button>
        </IonRow>
    
        </>


    );
};

export default RepliesCard;