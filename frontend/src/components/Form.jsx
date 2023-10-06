import { useState } from "react";
import { emailValidation, nameValidation, mobileValidation, addressValidation, dateValidation, currentDateString } from "../util/Validation";


let details=new Array(7);

const Form = (props) => {

    const currentDate = currentDateString();

    const [email, changeEmail] = useState(props.email || '');
    const [fname, changefname] = useState(props.fname || '');
    const [lname, changelname] = useState(props.lname || '');
    const [mno, changeMno] = useState(props.mno || '');
    const [dob, changeDate] = useState(props.dob || '');
    const [addr, changeAddress] = useState(props.address || '');

    details=[email,fname,lname,mno,dob,addr];


    const changeValues = (e) => {
        switch (e.target.name) {

            case 'email':
                changeEmail(e.target.value);
                if (!emailValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[0] = e.target.value;
                break;

            case 'fname':
                changefname(e.target.value);
                if (!nameValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[1] = e.target.value;
                break;

            case 'lname':
                changelname(e.target.value);
                if (!nameValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[2] = e.target.value;
                break;

            case 'mno':
                changeMno(e.target.value);
                if (!mobileValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[3] = e.target.value;
                break;

            case 'dob':
                changeDate(e.target.value);
                if (!dateValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[4] = e.target.value;
                break;

            case 'address':
                changeAddress(e.target.value);
                if (!addressValidation(e.target.value)) {
                    e.target.className = 'input error';
                }
                else {
                    e.target.className = 'input ';
                }
                details[5] = e.target.value;
                break;
        }




    }




    return (

        <div className="main-form">
            <div className='main-form-div'>
                <div><label htmlFor="email">Email</label></div>
                <div><input type="email" className="input" name="email" id="email" required={true} disabled={props.disabled} value={props.email || email} placeholder="Enter Email Id" onChange={changeValues} onFocus={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>

            <div className='main-form-div'>
                <div><label htmlFor="fname">First Name</label></div>
                <div><input type="text" className="input" name="fname" id="fname" required={true} value={fname} placeholder="Enter Your First Name" onChange={changeValues} onFocus={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="lname">Last Name</label></div>
                <div><input type="text" className="input" name="lname" id="lname" required={true} value={lname} placeholder="Enter Your Last Name" onChange={changeValues} onFocus={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="mno">Mobile Number</label></div>
                <div><input type="number" className="input" name="mno" id="mno" required={true} value={mno} placeholder="Enter Your Mobile Number" onChange={changeValues} onFocus={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="dob">Date Of Birth</label></div>
                <div><input type="date" name="dob" id="dob" className="input" value={dob} onChange={changeValues} onFocus={changeValues} max={currentDate} /></div>
            </div>
            <div className='main-form-div'>
                <div><label htmlFor="address">Address</label></div>
                <div><textarea name="address" className="input" id="addresss" required={true} value={addr} placeholder="Enter Your Address" onChange={changeValues} onFocus={changeValues} autoComplete="off" autoCorrect="off" /></div>
            </div>
        </div>

    );
}

export const constructDetails = () => {


    const formData = new FormData();
    formData.append('email', details[0]);
    formData.append('fname', details[1]);
    formData.append('lname', details[2]);
    formData.append('mobile', details[3]);
    formData.append('dob', details[4]);
    formData.append('address', details[5]);

    return formData;
}


export default Form;