export const parseJwt =(token: string) =>{
    const bigObj= JSON.parse(atob(token.split('.')[1]));
    let userObject:string=bigObj['sub']
    userObject=userObject.replaceAll("'", '"');
    userObject=JSON.parse(userObject)
    return userObject
    }