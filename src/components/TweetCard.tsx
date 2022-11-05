import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonText, IonList, IonGrid } from '@ionic/react';
import React, { useState } from 'react';

import './TweetCard.css';
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline, colorFill } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';
import TweetItem from './Tweet';
import { createTweet, updateTweet } from '../backendIntractions/TweetServices';
import axios from 'axios';
import { useHistory } from 'react-router';
const TweetCard: React.FC<{ 
    tweetList:Array<Object>
    setTweetList:(tweetList:Array<Object>)=>void
    addChanges:()=>void
    userObject:any
}> = props => {
    const token:string=localStorage.getItem("token")||""
    const history=useHistory()
    const[url,setUrl]= useState<string>('http://127.0.0.1:8000/api/')
   const changeTweet=(id:string,action:string)=>{
  const tweets= props.tweetList
  tweets.map((item:any)=>{
        if(item._id==id){
        
            setUrl('http://127.0.0.1:8000/api/'+item.url+id)
        if(action=="assignReaction"){
            console.log("Gonna see what's on")
            console.log(props.userObject.id)
            console.log(item.likes)
                if (!item.likes.includes(props.userObject.id)) {
                    item.likes.push(props.userObject.id)
                    item.count=item.count+1
                   
                }
                else{
                    const index=item.likes.indexOf(props.userObject.id)
                    item.likes.splice(index,1)
                    item.count= item.count -1
                  
                }
                updateTweet(token,item,'http://127.0.0.1:8000/api/'+item.url+id)
        }
        if(action=="addReplies"){
          item.displayReplies=!item.displayReplies
          updateTweet(token,item,'http://127.0.0.1:8000/api/'+item.url+id)
        }
        if(action==="retweet"){
            const tweetToRetweet={...item}
            tweetToRetweet.tweet_id=""
            tweetToRetweet.likes=[]
            tweetToRetweet.shareNumber=0
            tweetToRetweet.replies=[]
            tweetToRetweet.retweets=0
            tweetToRetweet._id=null
            const data = JSON.stringify(tweetToRetweet);
            const config = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/tweets',
              headers: { 
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response: { data: any; }) {
              console.log(JSON.stringify(response.data));
              item.retweets+=1;
              updateTweet(token,item,'http://127.0.0.1:8000/api/'+item.url+id)
            }).then((done)=>{
                history.push("/home")
            })
            .catch(function (error: any) {
              console.log(error);
              if(token===""||null){
                window.location.assign("/home")
              }
            });
           
        }
        
  
    }
    // props.setTweetList(tweets)
    
    // localStorage.setItem("tweets",JSON.stringify(props.tweetList))
    props.addChanges()
    
})
    }
    return (
     
    <div className=' grid grid-cols-1 md:grid-cols-3 '>
        {props.tweetList.map((item:any)=>{
            
            return <IonRow  key={`${item._id}`} className="mx-auto"><TweetItem tweet={item} onCalculate={function (): void {
                throw new Error('Function not implemented.');
            } } onReset={function (): void {
                throw new Error('Function not implemented.');
            } } changeTweet={changeTweet} userObject={props.userObject} /></IonRow>
        })}
    </ div>
            


    );
};

export default TweetCard;