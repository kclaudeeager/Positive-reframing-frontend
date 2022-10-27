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
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing'
import { platform } from 'os';
import { isPlatform } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { RWebShare } from "react-web-share";

const TweetItem: React.FC<{ onCalculate: () => void; onReset: () => void ; 
    tweet:{
        mentions:Array<string>,
        message:string,
        attachements:any, 
        hashtags:Array<string>,
        tweep:{tweepName:string,tweepPhoto:string;},
        timeLeft:string;
        isreacted:boolean,
        count:number,
        displayReplies:boolean,
        replies:any,
        retweets:number,
        _id:string,
        tweet_id:string,
        url:string,
    
    
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
  async function doShare(){
  return (
    <div>
      <h1>Web Share - GeeksforGeeks</h1>
      <RWebShare
        data={{
          text: props.tweet.message,
          url: window.location.origin+'/home/'+props.tweet._id,
          title: 'Share via..',
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share on Web</button>
      </RWebShare>
    </div>
  );
};
//   SocialSharing.canShareViaEmail().then(canShare=>{
//         console.log("it can share via email")
//     }).catch(error=>console.log(error))
//    await SocialSharing.shareWithOptions({
//     message:props.tweet.message,
//     subject:'share tweet',
//     files:props.tweet.attachements,
//     url:window.location.origin+'/home/'+props.tweet._id,
//     chooserTitle:'Share via..'
//    })
//await Browser.open({ url: 'http://capacitorjs.com/' });
  // SocialSharing.shareViaTwitter(props.tweet.message, '', window.location.origin+'/home/'+props.tweet._id)



      const assignReaction = () => {
    
              props.changeTweet(props.tweet._id,"assignReaction")
              
          }
         
      const addReplies = () => {
             props.changeTweet(props.tweet._id,"addReplies")
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
//     //history.push("/home/"+props.tweet._id)
//  window.open("/home/"+props.tweet._id)
 window.location.assign("/home/"+props.tweet._id);

}
   
    return(
        <>

        <IonCard>   
        <IonItem>
            <IonAvatar className='ion-margin-end'>
               {props.tweet.tweep ? (<img src={props.tweet.tweep.tweepPhoto} alt="" />):null}
            </IonAvatar>
            <IonLabel>
                <h3 style={{ display: "inline" }} > {props.tweet.tweep ? props.tweet.tweep.tweepName:"NO name"}</h3>  <p style={{ display: "inline" }} className='ion-margin-horizontal'>{props.tweet.timeLeft}</p>
            </IonLabel>
        </IonItem>
        <IonCardContent className=' w-60 container lg:px-30 px-4 py-8 mx-auto items-center' onClick={()=>goToReplies()}>
            {getMessege(props.tweet.message)}
           { getImagesDiv(props.tweet.attachements)}
        </IonCardContent>
        <IonRow className='ion-justify-content-space-evenly ion-margin-horizontal'>
            <IonCol><button style={{ all: "unset" }} onClick={addReplies}><IonIcon id='clickableIcon' icon={chatbubbleOutline}></IonIcon>{props.tweet.replies.length}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={assignReaction}><IonIcon color={props.tweet.isreacted ? 'danger' : ''} icon={props.tweet.isreacted ? heart : heartOutline}></IonIcon>{props.tweet.count}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={() => console.log("retweet")}><IonIcon icon={repeatOutline}></IonIcon></button>{props.tweet.retweets}</IonCol>
            <IonCol>
            <RWebShare
        data={{
          text: props.tweet.message,
          url: window.location.origin+'/home/'+props.tweet._id,
          title: 'Share via..',
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button style={{ all: "unset" }}><IonIcon id='rotate_icon' icon={exitOutline}></IonIcon></button>
      </RWebShare>
 
             </IonCol>
            {props.tweet.displayReplies && <RepliesCard tweet={props.tweet} addReplies={addReplies} />}
        </IonRow>
        </IonCard>
        </>
    );

}
export default TweetItem;




