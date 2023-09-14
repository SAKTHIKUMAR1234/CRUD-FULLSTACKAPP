import Table from '../components/Table'
import '../App.css'
import logo from '../assets/vite.svg'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { IoIosPersonAdd } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutMainUser } from '../util/MainUser'


function Home() {

  const [disabled,setDisabled] = useState(false);

  const navigate = useNavigate()

  const logout =async () =>{
    setDisabled(true);
    const responce =await logoutMainUser();
    if(responce===true){
      alert("User Logout Success");
    }
    else{
      alert("Error");
    }
    navigate('/');
  }

  return (
    <>
      <div className="main-div">
        <div className="header">
          <div className="logo">
            <Icon src={logo} alt='logo'></Icon>
          </div>
          <div className="btn-cls">
            <div>
              <Button type='button' text='Add' icon={IoIosPersonAdd} className='btn' onclick={() => {
                navigate('/add');
              }}></Button>
            </div>
            <div>
            <Button type='button' text='Logout' icon={TbLogout2} className='btn' isDisabled={disabled} onclick={logout}></Button>
            </div>
          </div>
        </div>

        <div className="body">
          <div>
            <Table disabled={disabled}></Table>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;