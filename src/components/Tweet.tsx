import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonText, IonList } from '@ionic/react';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import './TweetCard.css';
import '../../src/theme/variables.css'
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline, colorFill } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';

const TweetItem: React.FC<{ onCalculate: () => void; onReset: () => void ; 
    tweet:{
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
    changeTweet:(id:string,action:string)=>void
}> = props => {

  const returnImages=(images:Array<{src:any,caption:string,name:string}>)=>{
      return images.map((image:{src:string,caption:string,name:string})=>{return(<img  key={`${image.name}`} src={`${image.src}`} alt={image.name} className=' w-full'/>)})
  }

      const assignReaction = () => {
              props.changeTweet(props.tweet.id,"assignReaction")
              
          }
         
  
      const addReplies = () => {
             props.changeTweet(props.tweet.id,"addReplies")
      }
   const getMessege=(messege:string)=>{
    var pragraph="<p>"
    var messegeArray=messege.split(" ");
    messegeArray.forEach((messege)=>{
        if(messege.startsWith("#")){
        pragraph+='<span className="hashtag">'+messege+'</span>'
        }
        else if( messege.startsWith("@")){
            pragraph+='<span className="mention">'+messege+'</span>'
        }
        else{
            pragraph+=" "+messege;
        }
    })
    pragraph+=" </p>"
    return  parse(pragraph);

   }
   
    return(
        <>

        <IonCard>   
        <IonItem>
            <IonAvatar className='ion-margin-end'>
                <img src={props.tweet.tweep.tweepPhoto} alt="" />
            </IonAvatar>
            <IonLabel>
                <h3 style={{ display: "inline" }} >{props.tweet.tweep.tweepName}</h3>  <p style={{ display: "inline" }} className='ion-margin-horizontal'>{props.tweet.timeLeft}</p>
            </IonLabel>
        </IonItem>
          
        <IonCardContent>
            {getMessege(props.tweet.message)}
          <> {returnImages(props.tweet.images)}</>
        </IonCardContent>
        <IonRow className='ion-justify-content-space-evenly ion-margin-horizontal'>
            <IonCol><button style={{ all: "unset" }} onClick={addReplies}><IonIcon id='clickableIcon' icon={chatbubbleOutline}></IonIcon>{props.tweet.replies.length}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={assignReaction}><IonIcon color={props.tweet.isreacted ? 'danger' : ''} icon={props.tweet.isreacted ? heart : heartOutline}></IonIcon>{props.tweet.count}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={() => console.log("retweet")}><IonIcon icon={repeatOutline}></IonIcon></button>{props.tweet.retweets}</IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={() => console.log("archive")}><IonIcon id='rotate_icon' icon={exitOutline}></IonIcon></button></IonCol>
            {props.tweet.displayReplies && <RepliesCard tweet={props.tweet} addReplies={addReplies} />}
        </IonRow>
        </IonCard>
        </>
    );

}
export default TweetItem;