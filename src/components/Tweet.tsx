import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonText, IonList, IonThumbnail, IonImg, IonGrid, IonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';
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
import Moment from 'react-moment';

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
        shareNumber:number,
        updated_at:string,
        created_at:string
    
    
    }
    changeTweet:(id:string,action:string)=>void
}> = props => {

    const history=useHistory()
    const [isOpen,setOpen]=useState<boolean>(false)
    const [token,setToken]=useState<any>()
    const [message,setMessage]=useState<string>()
    const [timeLeft,setLeftTime]=useState<string>()
    const counter = React.useRef(0);
   
      function getTimeRemaining(a:any, b:any){
        const total = Date.parse(a) - Date.parse(b);
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 )-2;
        const days = Math.floor( total/(1000*60*60*24) );
      
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
     
    useEffect(()=>{
        const token:string=localStorage.getItem("token")||""
        setToken(token)
        const createdDate=props.tweet.created_at
        const d2 = new Date().toUTCString();
        for (let i = 0; i < 10000000000000; i++) {
            counter.current += 1;
            setTimeout(()=>{
        const diffDays=getTimeRemaining(d2,createdDate)
      
       console.log(diffDays)

        if(diffDays.days>0){
       
          setLeftTime((prev)=>""+diffDays.days+" days")
        }
        else{
            if(diffDays.hours>0){
         
               setLeftTime((prev)=>""+diffDays.hours+" hrs")
            }
            else{
                if(diffDays.minutes>0){
            
                  setLeftTime((prev)=>""+diffDays.minutes+" mins")
                }
                else{
                  
                   
                   setLeftTime((prev)=>""+diffDays.seconds+" secs")
                
                  
                }
            }
            
        }
    },i * 1000);
    
}
      
    },[])
  const returnImages=(images:any)=>{
   
        return images.map((image:any,i:number)=>{return(
            <div key={i} className="w-full" >
                <img className='inset-0 h-full w-full object-cover object-center rounded opacity-75 hover:opacity-100 ' src={image.src}  alt={image.name} onClick={()=>{
                  
                    window.open(image.src)
                }}/>
          </div>
              )})

     
     
  }

  const updateTweet= async( token:string, tweet:{
    mentions:Array<string>,
    message:string,
    hashtags:Array<string>,
    tweep:{tweepName:string,tweepPhoto:string;},
    timeLeft:string;
    isreacted:boolean,
    count:number,
    displayReplies:boolean,
    retweets:number,
    tweet_id:string,
    shareNumber:number,
    updated_at:string,
    created_at:string

},url:string)=>{
  const axios = require('axios');
  let date=new Date()
  const utcDate = date.toUTCString();
  tweet.updated_at=utcDate
  const data = JSON.stringify(tweet);
  console.log("Asked to update.....")
  const config = {
    method: 'put',
    url: url,
    headers: { 
      'Authorization': 'Bearer '+token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response: { data: any; }) {
    console.log(JSON.stringify(response.data));
    setOpen(!isOpen)
    setMessage("Successfully shared")
  })
  .catch(function (error: any) {
    console.log(error);
    setOpen(!isOpen)
    setMessage("Error: "+error)
  });
  

} 
  async function doShare(){
  
  SocialSharing.canShareViaEmail().then(canShare=>{
        console.log("it can share via email")
    }).catch(error=>console.log(error))
   await SocialSharing.shareWithOptions({
    message:props.tweet.message,
    subject:'share tweet',
    files:props.tweet.attachements,
    url:window.location.origin+'/home/'+props.tweet._id,
    chooserTitle:'Share via..'
   })
await Browser.open({ url: 'http://capacitorjs.com/' });
  SocialSharing.shareViaTwitter(props.tweet.message, '', window.location.origin+'/home/'+props.tweet._id)

  }

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
                <h3 style={{ display: "inline" }} > {props.tweet.tweep ? props.tweet.tweep.tweepName:"NO name"}</h3>  <p style={{ display: "inline" }} className='ion-margin-horizontal'>{timeLeft}</p>
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
        onClick={() => {
            props.tweet.shareNumber+=1
            updateTweet(token,props.tweet,'http://127.0.0.1:8000/api/'+props.tweet.url+props.tweet._id)
        
        }}
      >
        <button style={{ all: "unset" }}><IonIcon id='rotate_icon' icon={exitOutline}></IonIcon>{props.tweet.shareNumber}</button>
      </RWebShare>
 
             </IonCol>
            {props.tweet.displayReplies && <RepliesCard tweet={props.tweet} addReplies={addReplies} />}
        </IonRow>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={isOpen}
                onDidDismiss={() => setOpen(false)}
                cssClass="my-custom-class"
                header={"sharing"}
                message={message}
                buttons={["Close"]}
            />
          </IonCol>
        </IonRow>
        </IonCard>
        </>
    );

}
export default TweetItem;




