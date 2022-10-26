
import axios from "axios";
export const createTweet= async( token:string, tweet:{
    mentions:Array<string>,
    message:string,
    attachements:any, 
    hashtags:Array<string>,
    timeLeft:string;
    isreacted:boolean,
    count:number,
    displayReplies:boolean,
    replies:any,
    retweets:number,
    tweetId:''

})=>{
  console.log("Started with ",tweet)
    const data = JSON.stringify(tweet);
    const config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/tweets/',
      headers: { 
        'Authorization': 'Bearer '+token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response: { data: any; }) {
      console.log(JSON.stringify(response.data));
     window.location.assign("/home");
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
export const updateTweet= async( token:string, tweet:{
    mentions:Array<string>,
    message:string,
    images:any, 
    hashtags:Array<string>,
    tweep:{tweepName:string,tweepPhoto:string;},
    timeLeft:string;
    isreacted:boolean,
    count:number,
    displayReplies:boolean,
    replies:any,
    retweets:number,
    id:string,
    tweetId:''

})=>{
    
}
export const getTweets=(token:string)=>{

    const config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/tweets/',
      headers: { 
        'Authorization': 'Bearer '+token
      }
    };
    
    axios(config)
    .then( (response: { data: any; })=> {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
