import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonText, IonList, IonThumbnail, IonImg, IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import parse from 'html-react-parser';
import './TweetCard.css';
import '../../src/theme/variables.css'
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline, colorFill, image } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';
import TweetWithReplies from './TweetWithReplies';
import { useHistory } from 'react-router';
const TweetItem: React.FC<{ onCalculate: () => void; onReset: () => void ; 
    tweet:{
        mentions:Array<string>,
        message:string,
        images:any, 
        hashtags:Array<string>,
        tweep:{tweepName:string,tweepPhoto:string;},
        timeLeft:string;
        isreacted:boolean,
        count:number,
        displayReplies:boolean,
        replies:any,
        retweets:number,
        id:string,
        tweetId:''
    
    }
    changeTweet:(id:string,action:string)=>void
}> = props => {

    const history=useHistory()
  const returnImages=(images:any)=>{
   
        return images.map((image:any,i:number)=>{return(
            <div key={i} className="w-full" >
                <img className='inset-0 h-full w-full object-cover object-center rounded opacity-75 hover:opacity-100 ' src={image.src}  alt={image.name} onClick={()=>{
                  
                    window.open(image.src)
                }}/>
          </div>
              )})

     
     
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
   const getImagesDiv=(images:any)=>{
    if(images.length>0){
        return(
            <div className='grid grid-cols-3 grid-rows-2  grid-flow-col gap-2'>{returnImages(images)}</div>
        )
    }
    else{
        return(
         null
        )
    }
   }
   function goToReplies(){
//     //history.push("/home/"+props.tweet.id)
//  window.open("/home/"+props.tweet.id)
 window.location.assign("/home/"+props.tweet.id);

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
        <IonCardContent className=' w-60 container lg:px-30 px-4 py-8 mx-auto items-center' onClick={()=>goToReplies()}>
            {getMessege(props.tweet.message)}
           { getImagesDiv(props.tweet.images)}
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


