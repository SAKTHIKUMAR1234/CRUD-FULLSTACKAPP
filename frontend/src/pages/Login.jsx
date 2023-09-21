import logo from '../assets/vite.svg'
import Button from '../components/Button'
import { BiLogIn } from 'react-icons/bi'
import Icon from '../components/Icon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { getLoginDetails } from '../components/LoginForm'
import { emailValidation } from '../util/Validation'
import { isExist, regenerateURL, validateMainUser } from '../util/MainUser'


const Login = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const submit=async ()=>{
        setDisabled(true);
        const details=getLoginDetails();
        if(details[0]==null || details[1]==null){
            alert("Please Fill All the Data");
            setDisabled(false);
            return;
        }
        if(!emailValidation(details[0])){
            alert("Enter Valid Email");
            setDisabled(false);
            return;
        }
        else{
            if(await isExist(details[0])){
                await validateMainUser(details).then(async (res)=>{
                    if(res.status===200){
                        setDisabled(false);
                        navigate('/home');
                    }
                    else{

                        if(res.response.status===305){
                            alert("The User Id is not confirmed! An regenerated confirm mail is sent to you !!!");
                            const response =await regenerateURL(details[0]);
                            if(response){
                                alert("Mail Sended Successfully Check Your Mail");
                            }
                            else{
                                alert("Unable To send the email");
                            }
                            setDisabled(false);
                        }
                        else{
                            alert("Wrong Password");
                            setDisabled(false);
                        }
                       
                    }
                });
            }
            else{
                alert("The Email id not exit");
                setDisabled(false);
            }
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
                        <Button type='button' text='SignUp' icon={BiLogIn} className='btn' onclick={() => {
                            navigate('/signup')
                        }
                        }></Button>
                    </div>
                </div>

                <div className="body">
                    <LoginForm></LoginForm>

                </div>
                <div className='main-form-div'>
                    <div>

                    </div>
                    <div style={{ alignItems: 'center' }}>
                        <Button type='button' text='Log In' className='btn' icon={BiLogIn} isDisabled={disabled} onclick={async () => {
                            await submit();
                        }}></Button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Login;