import { IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonRow }  from '@ionic/react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import {send} from 'ionicons/icons';

import './RepliesCard.css';
import { MentionsInput, Mention } from 'react-mentions';

const RepliesCard: React.FC<{tweet:{
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
    id:string
}
addReplies:()=>void
}> = props => {
    const [reply, setReply] = useState<any>();
    const [users, setUsers] = useState<any>([]);
    const [tagNames, setTagNames] = useState<any>([{}]);
    const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;
    const myInput = useRef<any>();
    useEffect(()=>{
        getActors();
    },[])
    const makeId=(length: number)=>{
        var result='';
        var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charatersLength=characters.length
        for(var i=0;i<length;i++){
            result+=characters.charAt(Math.random()*charatersLength)
        }
        return result
        }
 const addReply=(e:any)=>{
   
    e.preventDefault();
    console.log("Just clicked")
    console.log("Repy",reply)
    let newReply={ 
        tweetId:'',
        mentions:[],
        message:'',
        images:[],
        hashtags:[],
        tweep:{},
        timeLeft:'',
        isreacted:false,
        count:0,
        displayReplies:false,
        replies:[],
        retweets:0,
        id:makeId(30)
      };
    if(reply?.length){
        let newContent = reply;
        newContent = newContent.split("m@@@__").join('<a href="/user/');
        newContent = newContent.split("^^^__").join(`">`);
        newContent = newContent.split("m@@@^^^").join("</a>");
        newContent = newContent.split("t$$$__").join('<a href="/tag/');
        newContent = newContent.split("~~~__").join(`">#`);
        newContent = newContent.split("t$$$~~~").join("</a>");
        console.log(newContent)
        const hashtagList:any=[];
        const mentionList:any=[];
         
        if(newContent.match(/#[a-z0-9_]+/gi)){
         
          newContent.match(/#[a-z0-9_]+/gi).forEach((hashtag: string,index: any)=>{
            hashtag= hashtag.substring(1)
            hashtagList.push(hashtag)
  
           });
           newReply.hashtags=hashtagList;
        }
      if( newContent.match(/@[a-z0-9_]+/gi)){
       newContent.match(/@[a-z0-9_]+/gi).forEach((mention: string,index: any)=>{
        mention= mention.substring(1)
        console.log("mention: ",mention)
        mentionList.push(mention)
       
       });
       newReply.mentions=mentionList;
      }
      const tweep={
        tweepName:"Bonnie",
         tweepPhoto:"https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
      };
      newReply.tweep=tweep;
      let body = newContent.trim();
      newReply.message=body;
      newReply.tweetId=props.tweet.id;
      props.tweet.replies.push(newReply)
      console.log( props.tweet)
    //   props.tweet.count+=1;
      props.addReplies();
    }
 }
 const addContent=(inputValue:any)=>{
    console.log(" changed")
   
            if (inputValue.length <= 350) {
                setReply(inputValue);
              }
     
 }
 async function getActors() {
    const usersArr = [];
    for(var i=0;i<10;i++){
        usersArr.push({
            id:i+1,
            display:"@Kwizera"+i
        })
    
    }
    setUsers(usersArr);
    var hashtags=[{}]
    for(var i=0;i<10;i++){
      hashtags.push({
          id:i+1,
          display:"#stressed"+i
      })
      
    }
    setTagNames(hashtags)
  
  }

    return (

        <>
        <form onSubmit={addReply}>
        <IonRow >
            <IonItem>
              
                {/* <IonInput type="text" value={reply} onIonChange={e=>{
                    if(e.detail.value===undefined) return;
                    addContent(e.detail.value!)
                }}></IonInput> */}
                  <div className="description outline-none w-44 md:max-lg:flex lg:w-48  text-black sm:text-center"> 
           <MentionsInput
             className="mentions"
             inputRef={myInput}
             spellCheck="false"
             placeholder="your comment"
             value={reply}
             onChange={(event) => addContent(event.target.value)}
           >
             <Mention
               trigger="@"
               data={users}
               markup="m@@@____id__^^^____display__m@@@^^^"
               style={
                 {
                 backgroundColor: "#daf4fa",
                 
                 }
               }
               appendSpaceOnAdd={true}
             />
             <Mention
               trigger="#"
               markup="h$$$____id__~~~____display__h$$$~~~"
            data={(search:string) => [{ id: search, display: ""+search }]}
            onAdd={useCallback((...args: any) => {
                console.log(...args);
            }, [])}
                appendSpaceOnAdd={true}
                />
             
 
         <Mention
           trigger={emailRegex}
           data={(search:string) => [{ id: search, display: search }]}
           onAdd={useCallback((...args: any) => {
             console.log(...args);
           }, [])}
           style={{ backgroundColor: "#d1c4e9" }}
         />
           
           </MentionsInput>
         </div>
            </IonItem>
            <button  style={{ all: "unset" }} type="submit"><IonIcon className='' color='primary' icon={send}></IonIcon></button>
        </IonRow>
        </form>
        </>


    );
};

export default RepliesCard;