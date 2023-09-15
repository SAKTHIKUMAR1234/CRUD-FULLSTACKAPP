import Button from "./Button";
import { AiTwotoneEdit } from 'react-icons/ai'
import { FaDownload } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import '../index.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteUser } from "../util/deleteUser";
import { getAllUser } from "../util/getAllUser";
import { downloadImage } from "../util/downloadImage";
import LodingSpinner from './LoadingSpinner'

export var updateValue;

const Table = () => {
    const navigate = useNavigate();
    const [disabled, setDisable] = useState(false);
    const [loading,isLoading] = useState(true);
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        const data = await getAllUser();
        if (data === false) {
            navigate('/')
        }
        else {
            setUsers(data);
           isLoading(false);
        }
    }


    useEffect(() =>getUsers, []);


    const removeUser = async (email) => {
        setDisable(true);
        if (confirm("Are You want to Delete ?")) {
            const res = await deleteUser(email);
            if (res === true) {
                getUsers();
                setDisable(false);
            }
            else{
                navigate('/');
            }

        }
        else {
            setDisable(false);
        }
    }


    return (
        <>
            {loading?

            <LodingSpinner />
            :
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile No</th>
                        <th>Date Of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((e) => {
                        return (
                            <tr key={e.email}>
                                <td>
                                    <img src={'http://localhost:5000/'+e.profilepath}  className="profile-img" alt="profile" />
                                </td>
                                <td>{e.email}</td>
                                <td>{e.fname}</td>
                                <td>{e.lname}</td>
                                <td>{e.mobile}</td>
                                <td>{e.dob}</td>
                                <td>
                                    <div className="action-cls">
                                        <div><Button type='button' text='Edit' icon={AiTwotoneEdit} className='btn' onclick={() => {
                                            updateValue = e
                                            navigate('/edit')
                                        }}></Button></div>
                                        <div><Button type='button' text='Delete' icon={MdDelete} className='btn' onclick={() => {
                                            removeUser(e.email)
                                        }} isDisabled={disabled}></Button></div>
                                        <div><Button type='button' text='Download' icon={FaDownload} className='btn' onclick={() => {
                                            downloadImage(e.profilepath);
                                        }} isDisabled={disabled}></Button></div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            }
        </>
    );
}



export default Table;