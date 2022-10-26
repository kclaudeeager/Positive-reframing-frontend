
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
  var axios = require('axios');
  var data = JSON.stringify(tweet);
  
  var config = {
    method: 'put',
    url: 'http://127.0.0.1:8000/api/tweets/63598fb984ddb25ee1817ef2',
    headers: { 
      'Authorization': 'Bearer '+token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response: { data: any; }) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error: any) {
    console.log(error);
  });
  

}
export const getTweets=async(token:string)=>{

    const config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/tweets/',
      headers: { 
        'Authorization': 'Bearer '+token
      }
    };
    
    axios(config)
    .then( async (response: { data: any; })=> {
      response=response.data
      console.log(response)
      return response
    })
    .catch(function (error: any) {
      console.log(error);
      window.location.assign("/")
    });
   
}
