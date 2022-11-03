import { useFormInput } from "./utils";

export const useSignupFields = () => {

    return [
        {
            id: "name",
            label: "Username",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "UserName"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    
                    type: "email",
                    placeholder: "useremail@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    
                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    type: "email",
                    placeholder: "useremail@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}