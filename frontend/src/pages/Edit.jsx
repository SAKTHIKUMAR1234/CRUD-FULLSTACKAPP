import { TbBackspaceFilled } from 'react-icons/tb'
import '../App.css'
import logo from '../assets/vite.svg'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Form, { constructDetails } from '../components/Form'
import { useNavigate } from 'react-router-dom'
import { TiTick } from 'react-icons/ti'
import { updateValue } from '../components/Table'
import { editUser } from '../util/editUser'
import { useState, useEffect } from 'react'
import { emailValidation, nameValidation, mobileValidation, addressValidation, dateValidation } from "../util/Validation"
import axios from 'axios'

const Edit = () => {
    const navigate = useNavigate();

    if (updateValue == undefined) {
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
                </div>

            </>
        );
    }


    const data = (updateValue.dob).split('-');


    const email = updateValue.email;
    const fname = updateValue.fname;
    const lname = updateValue.lname;
    const mno = updateValue.mobile;
    const dob = data[2] + '-' + data[1] + '-' + data[0];
    const address = updateValue.address;



    const [disabled, setDisabled] = useState(false);
    const [photoPath, setPhotoPath] = useState();
    const [photoFile, setPhotoFile] = useState(null);
    const [prevFileName,setPrevFileName] = useState('');

    useEffect(()=>{getPhoto('http://localhost:5000/auth/'+updateValue.profilepicname,updateValue.profilepicname)},[])

    const getPhoto = (url,filename) => {
        axios.get(url, { responseType: 'arraybuffer',withCredentials:true })
        .then(response => {
            const blob=new Blob([response.data],{type:'image/jpg'})
            const file=new File([blob],filename,{type:'image.jpg'});
            setPhotoFile(file);
            setPrevFileName(filename);
            setPhotoPath(URL.createObjectURL(file));
        })
        .catch(error => {
          console.error('Error file:', error);
        });
    }


    const changeImage = (e) => {
        setPhotoFile(e.target.files[0]);
        setPhotoPath(URL.createObjectURL(e.target.files[0]));
    }


    const upDateData = async () => {

        setDisabled(true);

        const data = constructDetails();
        data.append('photo', photoFile);
        data.append('prevName',prevFileName);
        if (photoFile === null) {
            alert("Photo is required");
            setDisabled(false);
            return;
        }
        if (emailValidation(data.get('email')) && nameValidation(data.get('fname')) && nameValidation(data.get('lname')) && mobileValidation(data.get('mobile')) && addressValidation(data.get('address')) && dateValidation(data.get('dob')) ) {
            try {
                const res = await editUser(data);
                if (res === true) {
                    alert("Data Updated Successfully");
                    setDisabled(false);
                    navigate('/home');
                }
                else {
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                setDisabled(false);
            }
        }
        else {
            alert("Please Check All Values");
            setDisabled(false);
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
                    <Form email={email} fname={fname} lname={lname} address={address} mno={mno} dob={dob} disabled={true}></Form>
                </div>
                <div className='main-form-div'>
                    <div></div>
                    <div style={{ alignItems: 'center', marginTop: '3%' }}>
                        <Button type='button' text='SUBMIT' className='btn' icon={TiTick} isDisabled={disabled} onclick={
                            upDateData
                        }></Button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Edit;