import { IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonRow }  from '@ionic/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {send} from 'ionicons/icons';

import './RepliesCard.css';

const RepliesCard: React.FC<{tweet:{
    mentions:Array<string>,
    message:string,
    images:Array<{src:string,caption:string,name:string}>, 
    hashtags:Array<string>,
    tweep:{tweepName:string,tweepPhoto:string;},
    timeLeft:string;
    isreacted:boolean,
    count:number,
    displayReplies:boolean,
    replies:Array<any>,
    retweets:number,
    id:string
}
addReplies:()=>void
}> = props => {
    const [reply, setReply] = useState<string>();
    let timeout:any=null
    
 const addReply=(e:any)=>{
   
    e.preventDefault();
    console.log("Just clicked")
    console.log("Repy",reply)
    if(reply?.length){
        console.log(reply)
      props.tweet.replies.push({message:reply})
      console.log( props.tweet)
    //   props.tweet.count+=1;
      props.addReplies();
    }
 }
 const addContent=(inputValue:any)=>{
    console.log(" changed")
   
            if (inputValue.length <= 350) {
                setReply(inputValue);
              }
     
 }
    return (

        <>
        <form onSubmit={addReply}>
        <IonRow >
            <IonItem>
                <IonLabel position="floating">Write your comment</IonLabel>
                <IonInput type="text" value={reply} onIonChange={e=>{
                    if(e.detail.value===undefined) return;
                    addContent(e.detail.value!)
                }}></IonInput>
            </IonItem>
            <button  style={{ all: "unset" }} type="submit"><IonIcon className='' color='primary' icon={send}></IonIcon></button>
        </IonRow>
        </form>
        </>


    );
};

export default RepliesCard;