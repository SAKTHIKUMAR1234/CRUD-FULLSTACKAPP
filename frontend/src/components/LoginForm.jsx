import { useState } from "react";

let details=new Array(2);

const LoginForm=()=>{

    const [email,changeEmail]=useState('');
    const [pwd,changePwd]=useState('');


    const changeValues=(e)=>{
        switch(e.target.name){
            case 'email':
                details[0]=e.target.value;
                changeEmail(e.target.value);
                break;
            case 'pwd':
                details[1]=e.target.value;
                changePwd(e.target.value);
                break;
        }
    }
    return (
        <div className="main-form">
                <div className='main-form-div'>
                    <div><label htmlFor="email">Email</label></div>
                    <div><input type="email" name="email" id="email" required={true} value={email} placeholder="Enter Email Id" onChange={changeValues} autoComplete="off" autoCorrect="off"/></div>
                </div>
                <div className='main-form-div'>
                    <div><label htmlFor="pwd">Password</label></div>
                    <div><input type="password" name="pwd" id="pwd" required={true} value={pwd} onChange={changeValues} autoComplete="off" autoCorrect="off"/></div>
                </div>
        </div>
    );
}

export const getLoginDetails=()=>{
    return details;
}

export default LoginForm;