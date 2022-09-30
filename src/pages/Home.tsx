import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { logoTwitter } from 'ionicons/icons'

import './Home.css';
import TweetCard from '../components/TweetCard';
import { useEffect, useState } from 'react';
const Home: React.FC = () => {

  const [tweetList,setTweetList]=useState<Array<Object>>([])
  const addTweet=(tweet:{
    mentions:Array<string>,
    message:string,
    images:Array<{src:string,caption:string,name:string}>, 
    hashtags:Array<string>,
    tweep:{tweepName:string,tweepPhoto:string;},
    timeLeft:string;
    isreacted:boolean,
    count:number,
    displayReplies:boolean,
    replies:Array<Object>,
    retweets:number,
    id:string
}):any=>{
    setTweetList([...tweetList,tweet])
    localStorage.setItem("tweets", JSON.stringify(tweetList))

  }

  var tweep={
    tweepName:"Bonnie",
     tweepPhoto:"https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
  };
  var timeLeft:string="2h";
  var images=[{
    src:"https://images.unsplash.com/photo-1664235778033-47a8f8f92dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=60"
    ,caption:"This is a caption",
    name:"image1"
  }]
  var mentions=["Claude","Paterne"];
  var message="this is the test tweet for hashtag stressed"
  var  hashtags=["Stressed","Anxienty"]
  const makeId=(length:Number):string=>{
    var result:string='';
    var characters:string='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charatersLength:number=characters.length
    for(var i=0;i<length;i++){
        result+=characters.charAt(Math.random()*charatersLength)
    }
    return result
    }
  var tweet={
    mentions:mentions,
    message:message,
    images:images, 
    hashtags:hashtags,
    tweep:tweep,
    timeLeft:timeLeft,
    isreacted:false,
    count:0,
    displayReplies:false,
    replies:[],
    retweets:0,
    id:makeId(30)
}
var newTweet={
  mentions:["KC","NK"],
    message:message,
    images:images, 
    hashtags:hashtags,
    tweep:tweep,
    timeLeft:timeLeft,
    isreacted:false,
    count:0,
    displayReplies:false,
    replies:[],
    retweets:0,
    id:makeId(30)
}
const Tweet=async()=>{
await  addTweet(tweet)
}
const addChanges=()=>{
  var listTOtest=JSON.parse(localStorage.getItem("tweets")|| "[]")
  setTweetList(listTOtest)
}

 useEffect(()=>{
  var listTOtest=JSON.parse(localStorage.getItem("tweets")|| "[]")
  setTweetList(listTOtest)
 //localStorage.removeItem("tweets")
  console.log("trying the list: ",listTOtest)
},[])

  return (
    
    <IonPage>
  
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonAvatar>
              <img src="https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </IonAvatar>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton >
              <IonIcon color='primary' icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle color='primary'>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  className=' relative'>
        <IonButton onClick={Tweet} className=" sticky top-0 z-10">Click to add a tweet</IonButton>
        <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
