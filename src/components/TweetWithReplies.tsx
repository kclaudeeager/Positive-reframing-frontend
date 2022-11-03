import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonNav, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { arrowBack, arrowBackCircle, logoTwitter } from "ionicons/icons";
import { FormEventHandler, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { fetchTweep, updateTweet } from "../backendIntractions/TweetServices";
import RepliesCard from "./RepliesCard";
import TweetItem from "./Tweet";
import { parseJwt } from "../decodeToken";
import { Wave } from "./Wave";

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
    const [userObject,setUserObject]=useState<any>()
    let history = useHistory();
    const [profile_image,setProfileImage]=useState<any>()
    
    // setTimeout(() => setIsHide(false), 1000);
    const addChanges=()=>{
       getSingleTweet(token,tweetId)
      }
    const changeTweet=(id:string,action:string)=>{
       
        if(tweet._id==id){
            setUrl('http://127.0.0.1:8000/api/'+tweet.url+id)
            if(action=="assignReaction"){
                console.log("I am clicked...")
                if (!tweet.likes.includes(userObject.id)) {
                    tweet.likes.push(userObject.id)
                    tweet.count=tweet.count+1
                   
                }
                else{
                    const index=tweet.likes.indexOf(userObject.id)
                    tweet.likes.splice(index,1)
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
             
            if (!item.likes.includes(userObject.id)) {
                item.likes.push(userObject.id)
                item.count=item.count+1
               
            }
            else{
                const index=item.likes.indexOf(userObject.id)
                item.likes.splice(index,1)
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
return (<IonRow  key={`${item._id}`} className="mx-auto"><TweetItem  userObject={userObject} tweet={item} onCalculate={function (): void {
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
        <div className=' grid grid-cols-1 md:grid-cols-3 '><IonRow  key={`${tweet._id}`} className="mx-auto"><TweetItem userObject={userObject} tweet={tweet} onCalculate={function (): void {
        throw new Error('Function not implemented.');
    } } onReset={function (): void {
        throw new Error('Function not implemented.');
    } } changeTweet={changeTweet}/></IonRow></div>
) 
}

  const {tweetId}=useParams<any>();
     console.log("Id found ",tweetId)
 const renderTweets=(tweet:any)=>{

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
        }
    setIsHide(false)
 }

 
const getSingleTweet=(token:string,tweetId:string)=>{
    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/tweets/'+tweetId,
        headers: { 
          'Authorization': 'Bearer '+token
        }
      };
      axios(config)
      .then((response:any)=>{
        const tweet:any=response.data
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
    renderTweets(tweet)
   // setTweetList(tweet)
       
      }).catch(error=>{
        console.log("error>>>",error)
        window.location.assign("/home")
    })
}

useEffect(()=>{
    console.log("Id found:: ",tweetId)
    const token:string=localStorage.getItem("token")||""
    let userObject:any=parseJwt(token)
    setUserObject(userObject)
    setProfileImage(userObject.profile_image)
     setToken(token)
     getSingleTweet(token,tweetId)
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
        
        <div className=" mb-2">
          {!isHide ? getTweetCard(): null}
        {/* <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges}/> */}
        </div>
       <div  className="">
        {!isHide ? getTweetReplies(): null}
       </div>
     <div className=" mx-auto w-48 flex justify-self-center" ><RepliesCard tweet={tweet} addReplies={addReplies} /></div> 
    
        </IonContent>
        <IonFooter>
				{/* <IonGrid className="ion-no-margin ion-no-padding">
          </IonGrid> */}
          <Wave />
          </IonFooter>
        </IonPage>
    )
}

export default TweetWithReplies;