import { IonRow, IonCol, IonIcon, IonCard, IonItem, IonLabel, IonCardContent, IonAvatar, IonAlert, IonButton, IonBadge } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import './TweetCard.css';
import '../../src/theme/variables.css'
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing'
import { isPlatform } from '@ionic/react';
import { RWebShare } from "react-web-share";
import { Capacitor } from '@capacitor/core';

export   const getMessege=(messege:string)=>{
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
const TweetItem: React.FC<{ onCalculate: () => void; onReset: () => void ; 
    tweet:{
        mentions:Array<string>,
        message:string,
        attachements:any, 
        hashtags:Array<string>,
        tweep:{tweepName:string,tweepPhoto:string;},
        timeLeft:string;
        likes:Array<any>,
        count:number,
        displayReplies:boolean,
        replies:any,
        retweets:number,
        _id:string,
        tweet_id:string,
        url:string,
        shareNumber:number,
        updated_at:string,
        created_at:string,
        classification: { prediction: any; Probability: any; };
    
    
    }
    changeTweet:(id:string,action:string)=>void
    userObject:any
}> = props => {
    const [isOpen,setOpen]=useState<boolean>(false)
    const [token,setToken]=useState<any>()
    const [message,setMessage]=useState<string>()
    const [timeLeft,setLeftTime]=useState<string>()
    const [openRecommendation,setopenRecommendation]=useState<boolean>(false)
    const[tweetedDate,setTweetedDate]=useState<any>(0)
   const [displayReplies,setDisplay]=useState<boolean>(false)
   const [recommended,setRecommended]=useState<any>(0)
      function getTimeRemaining(a:any, b:any){
        let total = Math.abs(Date.parse(a) - Date.parse(b))/1000;
        const days = Math.floor( total/(86400) );
        total-=days*86400;
        const hours = Math.floor( (total/3600) % 24 )-2;
        total-=hours*3600;
        const minutes = Math.floor( (total/60) % 60 );
        total-=minutes*60;
        const seconds =  Math.floor(total% 60) ;
      
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
     
    useEffect(()=>{
      // setopenRecommendation(true)
     
        const token:string=localStorage.getItem("token")||""
        setToken(token)
    
        const createdDate=props.tweet.created_at
        const d2 = new Date().toUTCString();
     
        const diffDays=getTimeRemaining(d2,createdDate)
        setTweetedDate(diffDays);
      
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
      
    },[props.tweet.created_at])
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
    likes:Array<any>,
    count:number,
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
    const options={
      message:props.tweet.message,
      subject:'share tweet',
      url:window.location.origin+'/home/'+props.tweet._id,
      chooserTitle:'Share via..'
     }
   
   SocialSharing.shareWithOptions(options).then((result)=>{
    console.log("Sharing completed? "+result.completed)
    console.log("Shared to app: "+result.app)
    props.tweet.shareNumber+=1
    updateTweet(token,props.tweet,'http://127.0.0.1:8000/api/'+props.tweet.url+props.tweet._id)
   }).catch((error)=>{
    console.log("Sharing failed with message: "+error)
   })
// await Browser.open({ url: 'http://capacitorjs.com/' });
//   SocialSharing.shareViaTwitter(props.tweet.message, '', window.location.origin+'/home/'+props.tweet._id)

  }

  const share=()=>{
    let valueToreturn=<></>
    
    if(Capacitor.isNativePlatform()|| isPlatform('cordova')){
       valueToreturn=(<button onClick={()=>{doShare()}} style={{ all: "unset" }}><IonIcon id='rotate_icon' icon={exitOutline}></IonIcon>{props.tweet.shareNumber}</button>)
    }
    else{
      valueToreturn= (<RWebShare
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
      )
    }
  return(
 
   valueToreturn
  )


    

 
}

      const assignReaction = () => {
    
              props.changeTweet(props.tweet._id,"assignReaction")
              
          }
      const retweet=()=>{
        props.changeTweet(props.tweet._id,"retweet")
      }
         
      const addReplies = () => {
             props.changeTweet(props.tweet._id,"addReplies")
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
const fetchRecommended=(tweet_id:string)=>{
console.log(tweet_id)
}
const getRecommendedReplies=(tweet:any)=>{
if(tweet.user===props.userObject.id){
  if(tweet.replies.length===0 && !tweet.tweet_id && tweetedDate.days>2){
    return(
      <>
       <IonItem>
        <IonBadge slot="start" className='cursor-pointer' onClick={()=>fetchRecommended(tweet._id)}>{recommended} recommended</IonBadge>
        {/* <IonLabel>recommended replies</IonLabel> */}
       
      </IonItem>
      </>
    )
  }
  else{
    return null
  }
}
}

    return(
        <>

        <IonCard>   
        <IonItem>
            <IonAvatar className='ion-margin-end'>
               {props.tweet.tweep ? (<img src={props.tweet.tweep.tweepPhoto} alt="" />):null}
            </IonAvatar>
            <IonLabel>
                <h3 style={{ display: "inline" }} > {props.tweet.tweep ? props.tweet.tweep.tweepName:""}</h3>  <p style={{ display: "inline" }} className='ion-margin-horizontal'>{timeLeft}</p>
            </IonLabel>
            {getRecommendedReplies(props.tweet)}
            {/* <IonRow><IonCol>{getRecommendedReplies(props.tweet)}</IonCol></IonRow> */}
        </IonItem>
        <IonCardContent className=' w-60 container lg:px-30 px-4 py-8 mx-auto items-center' onClick={()=>goToReplies()}>
            {getMessege(props.tweet.message)}
           { getImagesDiv(props.tweet.attachements)}
        </IonCardContent>
        <IonRow className='ion-justify-content-space-evenly ion-margin-horizontal'>
            <IonCol><button style={{ all: "unset" }} onClick={()=>setDisplay(!displayReplies)}><IonIcon id='clickableIcon' icon={chatbubbleOutline}></IonIcon>{props.tweet.replies.length}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={assignReaction}><IonIcon color={props.tweet.likes.includes(props.userObject.id) ? 'danger' : ''} icon={props.tweet.likes.includes(props.userObject.id) ? heart : heartOutline}></IonIcon>{props.tweet.likes.length}</button></IonCol>
            <IonCol><button style={{ all: "unset" }} onClick={retweet}><IonIcon icon={repeatOutline}></IonIcon></button>{props.tweet.retweets}</IonCol>
            <IonCol>
             {share()}
             </IonCol>
            {displayReplies && <RepliesCard tweet={props.tweet} addReplies={addReplies} />}
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





