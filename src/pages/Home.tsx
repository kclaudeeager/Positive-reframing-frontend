import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logoTwitter } from 'ionicons/icons'

import './Home.css';
import TweetCard from '../components/TweetCard';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { parseJwt } from "../decodeToken";

const Home: React.FC = () => {
const [tweetList,setTweetList]=useState<any>([])
const [token,setToken]=useState<any>()
const [profile_image,setProfileImage]=useState<any>()
const addChanges=()=>{
  getTweets(token)
}
const fetchTweep=(tweets:any,token:string)=>{
  tweets.forEach((tweet:any) => {
    tweet.url="tweets/"
  const id=tweet.user;
  //console.log("id>>>>",id)
  const config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/api/users/'+id,
    headers: { 
      'Authorization': 'Bearer '+token
    }
  };
  axios(config)
  .then( async (response:any)=> {
    response=response.data
    const user=response.user;
    tweet['tweep']= {
      tweepName:user.username,
      tweepPhoto:user.profile_image||"https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      email:user.email
    }
setTweetList(tweets)
  })
  .catch(function (error: any) {
    console.log(error);
  });
})
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
  .then((response: { data: any; })=> {
   const tweets:Array<any>= response.data.tweets 
    //console.log(tweets)
    
    fetchTweep(tweets,token)
   
  })
  .catch(function (error: any) {
    console.log(error);
    window.location.assign("/")
  });
 
}

 useEffect( ()=>{
 const currentHref=window.location.pathname
 localStorage.setItem('prevhref',currentHref)
 const token:string=localStorage.getItem("token")||""
 let userObject:any=parseJwt(token)
 setProfileImage(userObject.profile_image)
 setToken(token)
  console.log(token)
  getTweets(token)
  console.log(currentHref)
},[])
  return (
    
    <IonPage>
  
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonAvatar>
              <img src={profile_image|| "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="" />
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
