import logo from '../assets/vite.svg'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { BiLogIn } from 'react-icons/bi'
import { MdOutlineCreate } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import { constructSignupDetails } from '../components/SignupForm'
import { useState } from 'react'
import { createMainUser, isExist } from '../util/MainUser'
import { emailValidation,nameValidation,mobileValidation,passwordValidation } from '../util/Validation'



const Signup = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const submit = async () => {
        setDisabled(true);
        const details = constructSignupDetails();
        if (emailValidation(details.email) && nameValidation(details.fname) && nameValidation(details.lname) && mobileValidation(details.mobile) && passwordValidation(details.password1,details.password2)) {
            const emailExist=await isExist(details.email);
            if (emailExist) {
                alert("Email Already Exist");
                setDisabled(false);
            }
            else {
                try {
                    const result = await createMainUser(details);
                    if (result instanceof Error) {
                        throw new Error(result);
                    }
                    alert("User Created Successfully");
                    setDisabled(false);

                    navigate('/login');
                } catch (error) {
                    console.log(error);
                    setDisabled(false);
                }
            }
        }else{
            alert("Please Check All the Data!!!");
            setDisabled(false)
        }
    }


    return (
        <>
            <div className="main-div">
                <div className="header">
                    <div className="logo">
                        <Icon src={logo} alt='logo'></Icon>
                    </div>
                    <div className="btn-cls" style={{ float: 'right' }}>
                        <Button type='button' text='Log In' icon={BiLogIn} className='btn' onclick={() => {
                            navigate('/login')
                        }
                        }></Button>
                    </div>
                </div>

                <div className="body">
                    <SignupForm></SignupForm>
                </div>
                <div className='main-form-div'>
                    <div></div>
                    <div style={{ alignItems: 'center' }}>
                        <Button type='button' text='Sign Up' className='btn' icon={MdOutlineCreate} isDisabled={disabled} onclick={async () => {
                            await submit();
                        }}></Button>
                    </div>
                </div>
            </div>

        </>
    );
}




export default Signup;