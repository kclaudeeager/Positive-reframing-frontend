import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar } from '@ionic/react';
import React, { useState } from 'react';

import './TweetCard.css';
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline, colorFill } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';

const TweetCard: React.FC<{ onCalculate: () => void; onReset: () => void }> = props => {
    const [isreacted, setreaction] = useState<boolean>(false);
    const [count, setcount] = useState<number>(0)
    const [replies, setreplies] = useState<number>(0)
    const [retweets, setretweets] = useState<number>(0)
    const [displayReplies, setDisplayReplies] = useState<boolean>(false)
    const assignReaction = () => {
        if (isreacted == false) {
            setreaction(true)
            setcount(count + 1)
        }
        else {
            setreaction(false)
            setcount(count - 1)
        }
    }

    const addReplies = () => {
        if (displayReplies == false) {
            setDisplayReplies(true)
        }
        else {
            setDisplayReplies(false)
        }
    }


    return (

        <>

            <IonCard>
                <IonItem>
                    <IonAvatar className='ion-margin-end'>
                        <img src="https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                    </IonAvatar>
                    <IonLabel>
                        <h3 style={{ display: "inline" }} >John Doe</h3> <p style={{ display: "inline" }}>@JohnD</p> <p style={{ display: "inline" }} className='ion-margin-horizontal'>. 2h</p>
                    </IonLabel>
                </IonItem>

                <IonCardContent >
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <span className='hashtag'>#something</span></p>
                    <img src="https://images.unsplash.com/photo-1664235778033-47a8f8f92dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60" alt="" />
                </IonCardContent>

                <IonRow className='ion-justify-content-space-evenly ion-margin-horizontal'>
                    <IonCol><button style={{ all: "unset" }} onClick={addReplies}><IonIcon id='clickableIcon' icon={chatbubbleOutline}></IonIcon>{replies}</button></IonCol>
                    <IonCol><button style={{ all: "unset" }} onClick={assignReaction}><IonIcon color={isreacted ? 'danger' : ''} icon={isreacted ? heart : heartOutline}></IonIcon>{count}</button></IonCol>
                    <IonCol><button style={{ all: "unset" }} onClick={() => console.log("retweet")}><IonIcon icon={repeatOutline}></IonIcon></button>{retweets}</IonCol>
                    <IonCol><button style={{ all: "unset" }} onClick={() => console.log("archive")}><IonIcon id='rotate_icon' icon={exitOutline}></IonIcon></button></IonCol>
                    {displayReplies && <RepliesCard />}
                </IonRow>


            </IonCard>
        </>


    );
};

export default TweetCard;