export interface login{
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