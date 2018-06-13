export interface User{
    uid:string,
    username:string,
    mobile:string,
    email:string,
    password:string
}

export interface signup{
    username:string,
    email:string,
    password:string,
    mobile:string
}

export interface forgetpassword{
    email:string,
    newPassword:string
}   