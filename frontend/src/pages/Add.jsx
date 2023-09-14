import { TbBackspaceFilled } from 'react-icons/tb'
import '../App.css'
import logo from '../assets/vite.svg'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'
import { TiTick } from 'react-icons/ti'
import { constructDetails } from '../components/Form'
import { emailValidation, nameValidation, mobileValidation, addressValidation, dateValidation, imageValidation } from "../util/Validation";
import { isNotExist } from '../util/emailExist'
import { insertUser } from '../util/insertUser'
import { useState } from 'react'





const Add = () => {


    const [disabled, setDisabled] = useState(false);
    const [photoPath, setPhotoPath] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const navigate = useNavigate();



    const insertData = async () => {

        setDisabled(true);

        const data = constructDetails();
        data.append('photo', photoFile);
        if (photoFile === null) {
            alert("Photo is required");
            setDisabled(false);
            return;
        }
        if (emailValidation(data.get('email')) && nameValidation(data.get('fname')) && nameValidation(data.get('lname')) && mobileValidation(data.get('mobile')) && addressValidation(data.get('address')) && dateValidation(data.get('dob'))) {
            const res = await isNotExist(data.get('email'));
            if (res != true && res != false) {
                navigate('/');
            }
            if (!res) {
                alert("Email already Exist");
                setDisabled(false);
            }
            else {
                try {
                    const result = await insertUser(data);
                    if (result === false) {
                        navigate('/');
                    }
                    else {
                        alert("Data Inserted Successfully");
                        setDisabled(false);
                        navigate('/home');
                    }

                } catch (error) {
                    console.log(error);
                    setDisabled(false);
                }
            }
        }
        else {
            alert("Please Check All Values");
            setDisabled(false);
        }

    }

    const changeImage = (e) => {
        setPhotoFile(e.target.files[0]);
        setPhotoPath(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <div className="main-div">
                <div className="header">
                    <div className="logo">
                        <Icon src={logo} alt='logo'></Icon>
                    </div>
                    <div className="btn-cls" style={{ float: 'right' }}>
                        <Button type='button' text='BACK' icon={TbBackspaceFilled} className='btn' onclick={() => {
                            navigate('/home')
                        }
                        }></Button>
                    </div>
                </div>

                <div className="body">
                    <div className='main-form-div'>
                        <div><label htmlFor="Photo">Profile Photo</label></div>
                        <div>
                            <div><input name="photo" className="input" type="file" id="photo" accept="image/*" onChange={changeImage} /></div>
                            <div><img className="profile-img" src={photoPath} alt="profile" /></div>
                        </div>
                    </div>
                    <Form></Form>
                </div>
                <div className='main-form-div'>
                    <div></div>
                    <div style={{ alignItems: 'center', marginTop: '3%' }}>
                        <Button type='button' text='SUBMIT' className='btn' icon={TiTick} onclick={insertData} isDisabled={disabled}></Button>
                    </div>
                </div>
            </div>

        </>
    );
}




export default Add;