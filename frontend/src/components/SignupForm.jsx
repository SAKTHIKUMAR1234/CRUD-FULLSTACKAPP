import { useState } from "react";
import { emailValidation, nameValidation, mobileValidation} from "../util/Validation";



let details;
const SignupForm = () => {

    const [email, changeEmail] = useState('');
    const [fname, changefname] = useState('');
    const [lname, changelname] = useState('');
    const [mno, changeMno] = useState('');
    const [password1, changePwd1] = useState('');
    const [password2, changePwd2] = useState('');
    details = [email, fname, lname, mno, password1, password2];


    const changeValues = (e) => {
        if (e.target.name === 'email') {
            changeEmail(e.target.value);
            if (!emailValidation(e.target.value)) {
                e.target.className = 'error';
            }
            else {
                e.target.className = '';
            }
            details[0] = e.target.value;

        }

        if (e.target.name === 'fname') {
            changefname(e.target.value);
            if (!nameValidation(e.target.value)) {
                e.target.className = 'error';
            }
            else {
                e.target.className = '';
            }
            details[1] = e.target.value;

        }

        if (e.target.name === 'lname') {
            changelname(e.target.value);
            if (!nameValidation(e.target.value)) {
                e.target.className = 'error';
            }
            else {
                e.target.className = '';
            }
            details[2] = e.target.value;

        }

        if (e.target.name === 'mno') {
            changeMno(e.target.value);
            if (!mobileValidation(e.target.value)) {
                e.target.className = 'error';
            }
            else {
                e.target.className = '';
            }
            details[3] = e.target.value;

        }

        if (e.target.name === 'pwd1') {
            changePwd1(e.target.value);
            details[4] = e.target.value;
            if (password2 === e.target.value) {
                document.querySelector('#pwd1').classList.remove('error');
                document.querySelector('#pwd2').classList.remove('error');
            }
            else {
                document.querySelector('#pwd1').classList.add('error');
                document.querySelector('#pwd2').classList.add('error');
            }

        }

        if (e.target.name === 'pwd2') {
            changePwd2(e.target.value);
            details[5] = e.target.value;
            if (password1 === e.target.value) {
                document.querySelector('#pwd1').classList.remove('error');
                document.querySelector('#pwd2').classList.remove('error');
            }
            else {
                document.querySelector('#pwd1').classList.add('error');
                document.querySelector('#pwd2').classList.add('error');
            }

        }
    }

    return (
        <div className="main-form">
            <div className='main-form-div'>
                <div><label htmlFor="email">Email</label></div>
                <div><input type="email" name="email" id="email" required={true} value={email} placeholder="Enter Email Id" onChange={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="fname">First Name</label></div>
                <div><input type="text" name="fname" id="fname" required={true} value={fname} placeholder="Enter Your First Name" onChange={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="lname">Last Name</label></div>
                <div><input type="text" name="lname" id="lname" required={true} value={lname} placeholder="Enter Your Last Name" onChange={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="mno">Mobile Number</label></div>
                <div><input type="number" name="mno" id="mno" required={true} value={mno} placeholder="Enter Your Mobile Number" onChange={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="pwd1">Password</label></div>
                <div><input type="password" name="pwd1" id="pwd1" required={true} value={password1} onChange={changeValues} /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="pwd2">Re-Enter Password</label></div>
                <div><input type="password" name="pwd2" id="pwd2" required={true} value={password2} onChange={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
        </div>
    );
}

export const constructSignupDetails = () => {

    const result = {
        "email": details[0],
        "fname": details[1],
        "lname": details[2],
        "mobile": details[3],
        "password1": details[4],
        "password2": details[5]
    }
    return result;
}



export default SignupForm;
