import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonNav, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { arrowBack, arrowBackCircle, logoTwitter } from "ionicons/icons";
import { FormEventHandler, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetchTweep, updateTweet } from "../backendIntractions/TweetServices";
import RepliesCard from "./RepliesCard";
import TweetItem from "./Tweet";
import { parseJwt } from "../decodeToken";

const   TweetWithReplies:React.FC<{
}> = props  => {
   const [tweet,setTweet]=useState<any>()
    const [tweetList,setTweetList]=useState<Array<Object>>([])
    const [tweetRepliesList,setTweetRepliesList]=useState<any>([]);
    const [isHide, setIsHide] = useState(true);
    const [token,setToken]=useState<any>()
    const[url,setUrl]= useState<string>('http://127.0.0.1:8000/api/')
    const [previousHref,setPreviousHref]=useState<string>('/')
    const  Router = require("react-router");
    let history = useHistory();
    const [profile_image,setProfileImage]=useState<any>()
    // setTimeout(() => setIsHide(false), 1000);
    const addChanges=()=>{
        getTweets(token)
      }
    const changeTweet=(id:string,action:string)=>{
       
        if(tweet._id==id){
            setUrl('http://127.0.0.1:8000/api/'+tweet.url+id)
            if(action=="assignReaction"){
                console.log("I am clicked...")
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
            updateTweet(token,tweet,'http://127.0.0.1:8000/api/'+tweet.url+id)
        }
        setTweet(tweet);
        addChanges();
    }
    const fetchusers=()=>{

    }

const changeTweetReplies=(id:string,action:string)=>{
    tweetRepliesList.map((item:any)=>{
        console.log("Tweet id ",id)
        console.log("Tweet id1 ",item._id)
          if(item._id==id){
              setUrl('http://127.0.0.1:8000/api/'+item.url+id)
          if(action=="assignReaction"){
              console.log("I am called.....")
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
          updateTweet(token,item,'http://127.0.0.1:8000/api/'+item.url+id)
      }
    })
    
    addChanges();
}

    const addChangesToTweetReplies=()=>{
        setTweetRepliesList(tweetRepliesList)
    }
    const addReplies = () => {
       
 }

const getTweetReplies=()=>{
    console.log("my tweetRepliesList ",tweetRepliesList)
    if(tweetRepliesList.length==0){
        return null
    }
    return (
    <div className=' grid grid-cols-1 md:grid-cols-3 '>
    {tweetRepliesList.map((item:any)=>{
 item['url']="replies/"
return (<IonRow  key={`${item._id}`} className="mx-auto"><TweetItem tweet={item} onCalculate={function (): void {
    throw new Error('Function not implemented.');
} } onReset={function (): void {
    throw new Error('Function not implemented.');
} } changeTweet={changeTweetReplies}/></IonRow>
) 
    })}
</ div>  
    )    
}
const getTweetCard=()=>{
  console.log("Found tweet: ",tweet)
  if(tweet.tweet_id!=undefined){
    tweet['url']='replies/'
  }
  else{
      tweet['url']='tweets/'
  }
    return (
        <div className=' grid grid-cols-1 md:grid-cols-3 '><IonRow  key={`${tweet._id}`} className="mx-auto"><TweetItem tweet={tweet} onCalculate={function (): void {
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
        console.log(" found tweet id: ",tweet._id)
        console.log("sent one: ",tweetId)
        console.log(tweet)
        if(tweet.tweet_id!=undefined){
          tweet['url']='replies/'
        }
        else{
            tweet['url']='tweets/'
        }
        if(tweet._id==tweetId){
            setTweet(tweet)

            setTweetList((prev)=>{
                let isFound=false;
                prev.forEach((prev:any)=>{
                if(prev._id==tweet._id){
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
                if(reply._id==tweetId){
                    setTweet(reply)
                    setTweetList((prev)=>{
                        let isFound=false;
                        prev.forEach((prev:any)=>{
                        if(prev._id==reply._id){
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
    setIsHide(false)
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
        fetchTweep(tweet,token)
        tweet['url']="tweets/"
        if(tweet['replies']){
         console.log("replies>> ",tweet['replies'])
        //  tweet['url']="tweets/"
        tweet['replies'].forEach((reply:any)=>{
            reply['url']='replies/'
            fetchTweep(reply,token)
        })
       
        }
      });
    
      renderTweets(tweets);
    })
    .catch(function (error: any) {
      console.log(error);
      window.location.assign("/")
    });
   
  }
useEffect(()=>{
    console.log("Id found:: ",tweetId)
    const token:string=localStorage.getItem("token")||""
    let userObject:any=parseJwt(token)
    setProfileImage(userObject.profile_image)
     setToken(token)
     getTweets(token)
     const prevhref:string=localStorage.getItem("prevhref")||""
     setPreviousHref(prevhref)
    // const listTOtest=JSON.parse(localStorage.getItem("tweets")|| "[]")
    // renderTweets(listTOtest);
    console.log("tweet found",tweet)
},[])

    return(
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
          <IonButton onClick={()=>{
        history.goBack()
          }}>
          <IonIcon color='primary' icon={arrowBack}></IonIcon>
          </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
          <IonButton>
              <IonIcon color='primary' icon={logoTwitter}></IonIcon>
            </IonButton>
          
          </IonButtons>
        
          <IonTitle color='primary'>Tweet</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent>
        
        <div className="border border-b-gray">
          {!isHide ? getTweetCard(): null}
        {/* <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges}/> */}
        </div>
       <div  className="border border-b-gray">
        {!isHide ? getTweetReplies(): null}
       </div>
     <div className=" mx-auto w-48 flex justify-self-center" ><RepliesCard tweet={tweet} addReplies={addReplies} /></div> 
        </IonContent>
     
        </IonPage>
    )
}

export default TweetWithReplies;