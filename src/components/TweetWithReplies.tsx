import { IonBackButton, IonCol, IonIcon, IonImg, IonItem, IonPage, IonRow } from "@ionic/react";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router";
import TweetItem from "./Tweet";
import TweetCard from "./TweetCard";

const   TweetWithReplies:React.FC<{
 
}> = props  => {
   const [tweet,setTweet]=useState<any>()

    const [tweetList,setTweetList]=useState<Array<Object>>([])
    const [tweetRepliesList,setTweetRepliesList]=useState<any>([]);
    const [isHide, setIsHide] = useState(true);

    setTimeout(() => setIsHide(false), 1000);
    const addChanges=()=>{
      setTweetList((prev)=>{
        let isFound=false;
        prev.forEach((prev:any)=>{
        if(prev.id==tweet.id){
            isFound=true;
        }
        })
        if(!isFound){
            return [...prev, tweet];
        }
        return [...prev]
        
    }
        )

    }

    const changeTweet=(id:string,action:string)=>{
        console.log("Tweet id ",id)
        if(tweet.id==id){
            if(action=="assignReaction"){
                    if (tweet.isreacted == false) {
                        tweet.isreacted=true
                        tweet.count=tweet.count+1
                        console.log(tweet.count, tweet.isreacted)
                    }
                    else{
                        tweet.isreacted=false
                        tweet.count= tweet.count -1
                      
                    }
                
            }
            if(action=="addReplies"){
                tweet.displayReplies=!tweet.displayReplies
            }
        }
        setTweet(tweet);
        addChanges();
    }

    const addChangesToTweetReplies=()=>{
        setTweetRepliesList(tweetRepliesList)
    }

const getTweetReplies=()=>{
    console.log("my tweetRepliesList ",tweetRepliesList)
    if(tweetRepliesList.length==0){
        return null
    }
    return (
    <div className=' grid grid-cols-1 md:grid-cols-3 '>
    {tweetRepliesList.map((item:any)=>{

return (<IonRow  key={`${item.id}`} className="mx-auto"><TweetItem tweet={item} onCalculate={function (): void {
    throw new Error('Function not implemented.');
} } onReset={function (): void {
    throw new Error('Function not implemented.');
} } changeTweet={changeTweet}/></IonRow>
) 
    })}
</ div>  
    )    
}
const getTweetCard=()=>{
  console.log("Found tweet: ",tweet)
    return (
        <div className=' grid grid-cols-1 md:grid-cols-3 '><IonRow  key={`${tweet.id}`} className="mx-auto"><TweetItem tweet={tweet} onCalculate={function (): void {
        throw new Error('Function not implemented.');
    } } onReset={function (): void {
        throw new Error('Function not implemented.');
    } } changeTweet={changeTweet}/></IonRow></div>
) 
}

  const {tweetId}=useParams<any>();
     console.log("Id found ",tweetId)
 const renderTweets=(tweets:any)=>{
    console.log("sent tweets: ",tweets)
    tweets.map((tweet:any)=>{
        console.log(" found tweet id: ",tweet.id)
        console.log("sent one: ",tweetId)
        if(tweet.id==tweetId){
            setTweet(tweet)

            setTweetList((prev)=>{
                let isFound=false;
                prev.forEach((prev:any)=>{
                if(prev.id==tweet.id){
                    isFound=true;
                }
                })
                if(!isFound){
                    return [...prev, tweet];
                }
                return [...prev]
                
            }
                )
                setTweetRepliesList(tweet.replies)
        }
        else{
            if( tweet.replies.length==0){
                return
            }

            tweet.replies.forEach((reply:any) => {
                if(reply.id==tweetId){
                    setTweet(reply)
                    setTweetList((prev)=>{
                        let isFound=false;
                        prev.forEach((prev:any)=>{
                        if(prev.id==reply.id){
                            isFound=true;
                        }
                        })
                        if(!isFound){
                            return [...prev, reply];
                        }
                        return [...prev]
                        
                    }
                        )
                        setTweetRepliesList(reply.replies)
                }
                else{
                    renderTweets(reply.replies)
                }
          
            });
        }

        
    })
 }
 
useEffect(()=>{
    console.log("Id found:: ",tweetId)
    const listTOtest=JSON.parse(localStorage.getItem("tweets")|| "[]")
    renderTweets(listTOtest);
    console.log("tweet found",tweet)
},[])

    return(
        <IonPage>
        <div className="border border-b-gray">
          {!isHide ? getTweetCard(): null}
        {/* <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges}/> */}
        </div>
       <div>
        {!isHide ? getTweetReplies(): null}
       </div>
        </IonPage>
    )
}

export default TweetWithReplies;