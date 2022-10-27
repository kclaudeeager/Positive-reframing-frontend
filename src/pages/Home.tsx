import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { logoTwitter } from 'ionicons/icons'

import './Home.css';
import TweetCard from '../components/TweetCard';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

const Home: React.FC = () => {
const [tweetList,setTweetList]=useState<any>([])
const [token,setToken]=useState<any>()

const addChanges=()=>{
  getTweets(token)
}
const getTweets=async(token:string)=>{

  const config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/api/tweets/',
    headers: { 
      'Authorization': 'Bearer '+token
    }
  };
  
  axios(config)
  .then( async (response: { data: any; })=> {
   const tweets:Array<any>= await response.data.tweets 
    console.log(tweets)
    tweets.forEach(tweet => {
      tweet['tweep']={tweepName:"Bonnie",
      tweepPhoto:"https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" } 
      tweet['url']="tweets/"
    });

    setTweetList(tweets)
  })
  .catch(function (error: any) {
    console.log(error);
    window.location.assign("/")
  });
 
}

 useEffect( ()=>{

  //console.log("trying the list: ",listTOtest)
  //setTweetList(listTOtest)
 
 //localStorage.removeItem("tweets")
 const token:string=localStorage.getItem("token")||""
 setToken(token)
  console.log(token)
  getTweets(token)
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
        <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
