import { IonRow,IonLabel,IonGrid,IonCol, IonInput } from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Link, useHistory } from "react-router-dom";

// import { APIservice } from "../services";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [tagNames, setTagNames] = useState([{}]);
  const myInput = useRef();
  const history = useHistory();

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
    console.log(formData.get("attachement"));
  }

  async function getActors() {
    // const res = await APIservice.get(`/users`);
    // Transform the users to what react-mentions expects
    const usersArr = [];
    for(var i=0;i<10;i++){
        usersArr.push({
            id:i+1,
            display:"Kwizera "+i
        })
       // console.log(usersArr)
       
    }

    setUsers(usersArr);
    console.log(asyncTags("stress"))
  }

  async function asyncTags(query,callback) {
    var tagsArray=[{}]
    for(var i=0;i<10;i++){
        tagsArray.push({
            id:i+1,
            display:"stressed "+i
        })
    }
      
        if (!query) return;
        Promise.all(tagsArray)
        .then((res)=>{

            if(res.length){
                var suggestion = { id: query, display: query };
                
                return [...tagsArray,suggestion]
            }
          else
          return [{ id: query, display: query }];
      
        }).then(callback)
    }
       

  async function savePost(e) {
    e.preventDefault();

    let newContent = content;

    newContent = newContent.split("@@@__").join('<a href="/user/');
    newContent = newContent.split("^^^__").join(`">@`);
    newContent = newContent.split("@@@^^^").join("</a>");

    newContent = newContent.split("$$$__").join('<a href="/tag/');
    newContent = newContent.split("~~~__").join(`">#`);
    newContent = newContent.split("$$$~~~").join("</a>");
    if (newContent !== "") {
      let body = newContent.trim();
      console.log(body)
    
    }
  }

  return (
    <>
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
              markup="@@@____id__^^^____display__@@@^^^"
              style={{
                backgroundColor: "#daf4fa",
              }}
              // onAdd={(id) => setActorIds((actorIds) => [...actorIds, id])}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={asyncTags}
              markup="$$$____id__~~~____display__$$$~~~"
              style={{
                backgroundColor: "#daf4fa",
              }}
              onAdd={(display) =>{
                setTagNames((tagNames) => [...tagNames, display])
                console.log(tagNames)
              }
  
              }
              appendSpaceOnAdd={true}
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
             <input type="file" onChange={(ev)=>(uploadPhoto(ev))} />
         </IonCol>
          </IonRow>
          </IonGrid>
        
       
      </form>
    </>
  );
};

export default NewPost;
