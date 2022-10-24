import { IonRow, IonCol, IonButton, IonIcon, IonCard, IonItem, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonText, IonList, IonGrid } from '@ionic/react';
import React, { useState } from 'react';

import './TweetCard.css';
/* Icons */
import { chatbubbleOutline, heartOutline, heart, repeatOutline, exitOutline, colorFill } from 'ionicons/icons';
import RepliesCard from '../components/RepliesCard';
import TweetItem from './Tweet';

const TweetCard: React.FC<{ 
    tweetList:Array<Object>
    setTweetList:(tweetList:Array<Object>)=>void
    addChanges:()=>void
}> = props => {
   
   const changeTweet=(id:string,action:string)=>{
  var tweets= props.tweetList
  tweets.map((item:any)=>{

        if(item.id==id){
        if(action=="assignReaction"){
                if (item.isreacted == false) {
                    item.isreacted=true
                    item.count=item.count+1
                    console.log(item.count, item.isreacted)
                }
                else{
                    item.isreacted=false
                    item.count= item.count -1
                  
                }
            
        }
        if(action=="addReplies"){
          item.displayReplies=!item.displayReplies
        }
    
    }
    props.setTweetList(tweets)
    localStorage.setItem("tweets",JSON.stringify(props.tweetList))
    props.addChanges()
    
})
    }
    return (
     
    <div className=' grid grid-cols-1 md:grid-cols-3 '>
        {props.tweetList.map((item:any)=>{
            
            return <IonRow  key={`${item.id}`} className="mx-auto"><TweetItem tweet={item} onCalculate={function (): void {
                throw new Error('Function not implemented.');
            } } onReset={function (): void {
                throw new Error('Function not implemented.');
            } } changeTweet={changeTweet}/></IonRow>
        })}
    </ div>
            


    );
};

export default TweetCard;