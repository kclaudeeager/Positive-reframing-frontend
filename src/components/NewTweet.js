import { IonRow,IonLabel,IonGrid,IonCol, IonInput, IonItem, IonTextarea, IonContent,IonPage } from "@ionic/react";
import { useEffect, useState, useRef,useCallback, createContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Link, useHistory } from "react-router-dom";
import parse from 'html-react-parser';

// import { APIservice } from "../services";
import $ from "jquery"
export const TweetListContext = createContext();

const NewPost = () => {
  const [tweetList,setTweetList]=useState([]);
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [tagNames, setTagNames] = useState([{}]);
  const myInput = useRef();
  const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;
  const [image,setImage]=useState({})
 

  // const [addedTweet,setAdded]=useState();

  useEffect(() => {
    getActors();
  
  }, []);


  function addContent(input) {
    if (input.length <= 350) {
    
      setContent(input);
    }
  }
  const uploadPhoto=(fileChamgeEvent)=>{
    const photo=fileChamgeEvent.target.files[0];
  
    let formData=new FormData();
    formData.append('attachement',photo,photo.name);
    const path = (window.URL || window.webkitURL).createObjectURL(photo);
    console.log(path)
    setImage({
      src:path
      ,caption:"This is a caption",
      name:photo.name
    });
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


  async function asyncTags(querry) {
  if (!querry)
  return
   
    if(tagNames.length==0)
     return {id:querry,display:querry}
     else{
      
      return tagNames
     }

  }

    async function savePost(e) {
      e.preventDefault();
       console.log("contents:  ",content)
      let newContent = content;
      newContent = newContent.split("m@@@__").join('<a href="/user/');
      newContent = newContent.split("^^^__").join(`">`);
      newContent = newContent.split("m@@@^^^").join("</a>");
      newContent = newContent.split("t$$$__").join('<a href="/tag/');
      newContent = newContent.split("~~~__").join(`">#`);
      newContent = newContent.split("t$$$~~~").join("</a>");
      var tweet={ 
        mentions:[],
        message:'',
        images:[{}],
        hashtags:[],
        tweep:{tweepName:'',tweepPhoto:''},
        timeLeft:'',
        isreacted:false,
        count:0,
        displayReplies:false,
        replies:[{}],
        retweets:0,
        id:makeId(30)
      };
      var hashtagList=[];
      var mentionList=[];
       
      if(newContent.match(/#[a-z0-9_]+/gi)){
       
        newContent.match(/#[a-z0-9_]+/gi).forEach((hashtag,index)=>{
          hashtag= hashtag.substring(1)
          hashtagList.push(hashtag)

         });
         tweet.hashtags=hashtagList;
      }
    if( newContent.match(/@[a-z0-9_]+/gi)){
     newContent.match(/@[a-z0-9_]+/gi).forEach((mention,index)=>{
      mention= mention.substring(1)
      console.log("mention: ",mention)
      mentionList.push(mention)
     
     });
     tweet.mentions=mentionList;
    }
      if (newContent !== "") {
        let body = newContent.trim();
        tweet.message=body;
       
        var tweep={
          tweepName:"Bonnie",
           tweepPhoto:"https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
        };
        tweet.tweep=tweep;
        tweet.images.push(image);
      addTweet(tweet);
    
      }
    }
  //   :{
     
  // }
    const addTweet=(tweet)=>{
      console.log(tweet)
      const listTOtest=JSON.parse(localStorage.getItem("tweets")|| "[]")
      localStorage.setItem("tweets", JSON.stringify([tweet,...listTOtest]))
      console.log([tweet,...tweetList])
      setTweetList(prev => [tweet,...prev]);

      //  setTweetList([...tweetList,tweet])
      window.location="/home";
    }
    // useEffect(()=>{
    //   localStorage.setItem("tweets", JSON.stringify(tweetList))
    // },tweetList)
    const makeId=(length)=>{
      var result='';
      var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charatersLength=characters.length
      for(var i=0;i<length;i++){
          result+=characters.charAt(Math.random()*charatersLength)
      }
      return result
      }
  

  return (
    <IonPage>
      <IonContent>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
        
      </div>
      <form
      encType="multipart/form-data"
        onSubmit={savePost}
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
     
         <IonGrid >
          <IonRow>
          <IonCol>
          <Link
            to="/"
            className=""
          >
            <IonLabel>
            Cancel
            </IonLabel>
         
          </Link>
          </IonCol>
          <IonCol>
          <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 rounded-full py-1">
            Tweet
          </button>
          </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <div className="description outline-none">
           
          <MentionsInput
            className="mentions"
            inputRef={myInput}
            spellCheck="false"
            placeholder="What's happening?"
            value={content}
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
              // onAdd={(id) => setActorIds((actorIds) => [...actorIds, id])}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={asyncTags}
              markup="h$$$____id__~~~____display__h$$$~~~"
              style={{
                backgroundColor: "#daf4fa",
             
              }}
              onAdd={(display) =>{
                setTagNames((tagNames) => [...tagNames, display]);
              }
               
              }
              appendSpaceOnAdd={true}
            />
            

        <Mention
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={useCallback((...args) => {
            console.log(...args);
          }, [])}
          style={{ backgroundColor: "#d1c4e9" }}
        />
          
          </MentionsInput>
        </div>

        <div className="icons flex text-gray-500 m-2">
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "@");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
            @
          </div>
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "#");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
            #
          </div>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {350 - content.length}/350
          </div>
       
        </div>
    
            </IonCol>
         
          </IonRow>
          <IonRow>
            <IonCol>
             <IonLabel>Add attachement</IonLabel>
             <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(ev)=>(uploadPhoto(ev))} />
         </IonCol>
          </IonRow>
        
          </IonGrid>
        
       
      </form>
      </IonContent>
    </IonPage>
  );
};

export default NewPost;
