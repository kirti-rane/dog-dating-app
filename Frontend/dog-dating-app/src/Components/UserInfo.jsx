import { useSelector, useDispatch } from 'react-redux';
import './UserInfo.css'
import { Link, useNavigate } from 'react-router-dom'
import {logout} from '../Store/userSlice'
import Footer from './Foooter';
import Chat from './Chat'


function UserInfo() {

    const { userData, isLoggedIn } = useSelector((state) => state.user)
    console.log(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout= async ()=>{

        await navigate('/')
        await dispatch(logout())
        
    }

    return (
        <>

            <div className='logoTitle'>

                <Link to="/" className='link-style'><h3>tindog</h3></Link>
                <Link to="/aboutus" className='link-style about'>About Us</Link>
            
                <div className="logout" onClick={handleLogout}>
                    logout
                </div>
            </div>
            <div className='userPhoto'>
                <div>   
                <div className='profilePhotoWrapper1'>
                    {isLoggedIn ? (
                        <img
                            src={userData.photoUrl}
                            alt="Profile"
                            className="profilePhoto1"
                        />
                    ) : (
                        <div className="profilePhoto1"><i class="bi bi-person-circle fs-2"></i></div>
                    )}
                </div>
                </div>
                <div className='details'>
                    {
                        userData?(
                            <div>

                    <p>Name:   {userData.userDetails.dogName}</p>
                    <p>Email:  {userData.userDetails.ownerEmail}</p>
                    <p>Gender: {userData.userDetails.gender}</p>
                    <p>Age:    {userData.userDetails.age}</p>
                    <p>Breed:  {userData.userDetails.breed}</p>
                    </div>
                        ):<div>user not found!!</div>
                    }
                    
                </div>
                </div>

                <Chat/>
                
                <Footer/>

        </>
    )
}

export default UserInfo