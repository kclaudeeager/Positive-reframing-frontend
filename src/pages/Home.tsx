import { IonAvatar, IonButton, IonButtons, IonChip, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonPopover, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { logInOutline, logoTwitter, logOutOutline, logOutSharp, menu,closeSharp } from 'ionicons/icons'

import './Home.css';
import TweetCard from '../components/TweetCard';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { parseJwt } from "../decodeToken";
import { Wave } from '../components/Wave';
import { useHistory } from 'react-router-dom';
import Menu from '../components/Menu';
import DropChildren from '../components/dropdown';
import { useParams } from 'react-router';

const Home: React.FC = () => {
const [tweetList,setTweetList]=useState<any>([])
const [token,setToken]=useState<any>()
const [profile_image,setProfileImage]=useState<any>()
const [userObject,setUserObject]=useState<any>()
const [showPopover, setShowPopover] = useState(false);
const [user_name,setUsername]=useState<string>('')

const params=useParams()
const history = useHistory();
const addChanges=()=>{
  getTweets(token)
}
const handleLogout = () => {
  // make a request to the logout endpoint using your desired method
  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/api/users/logout',
    headers: { 
      'Authorization': 'Bearer '+token, 
      'Content-Type': 'application/json'
    },
    data :{token:token},
  };
 
  
  axios(config)
  .then((response: { data: any; })=> {
      // redirect to login page on successful logout
      console.log("Logout response: "+response.data)
    localStorage.removeItem("token")
    history.push("/login");
    
  });
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
    console.log(token)
    if(token==null){
      window.location.assign("/")
    }
    fetchTweep(tweets,token)
   
  })
  .catch(function (error: any) {
    console.log(error);
    window.location.assign("/")
  });
}
 useEffect( ()=>{
  const mytoken:string=localStorage.getItem("token")||""
  if(!mytoken){
  window.location.assign("/")
  }
  console.log("My token: ",mytoken)
 const currentHref=window.location.pathname
 localStorage.setItem('prevhref',currentHref)
 setToken(mytoken)
 let userObject:any=parseJwt(mytoken)
 setUserObject(userObject)
//  console.log("userObject >> ",userObject)
 setUsername(userObject.username)
 setProfileImage(userObject.profile_image)
  // console.log(token)
  getTweets(mytoken)
  // console.log(currentHref)
},[params])

const dropdown_children=()=>{
  return(
 
      <IonButtons slot="start"  className=' w-auto px-4 mt-auto'> <IonButton onClick={handleLogout}><IonLabel className=' text-blue-500'>Logout</IonLabel> <IonIcon icon={logOutOutline} className=' text-red-500'/></IonButton> 
       <IonButton><IonIcon icon={closeSharp}></IonIcon>Close</IonButton>
       </IonButtons>
 

  )
}
 
  return (
 
<IonPage>
    <IonHeader>
        <IonToolbar>    
<IonButtons slot="start" className=' w-auto'>
  
  <IonChip>
      <IonAvatar>
          <img src={profile_image|| "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="" />
      </IonAvatar>
      <IonLabel>{user_name}</IonLabel>
  </IonChip> 
</IonButtons>
<IonTitle color='primary'>Home</IonTitle>
<IonButtons slot="end"  className=' w-auto px-4'> <IonButton onClick={handleLogout}><IonLabel className=' text-blue-500'>Logout</IonLabel> <IonIcon icon={logOutOutline} className=' text-red-500'/></IonButton> </IonButtons>
     </IonToolbar>
    </IonHeader>
    <IonContent className='relative'>
        <TweetCard tweetList={tweetList} setTweetList={setTweetList} addChanges={addChanges} userObject={userObject} />
    </IonContent>
    <IonFooter>
        <Wave />
    </IonFooter>
</IonPage>

  );
};

export default Home;
