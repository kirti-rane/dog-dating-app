//import { useSelector, useDispatch } from 'react-redux';
import './ProfileCard.css'

function ProfileCard({user}){

    console.log(user)
    //const { userData, isLoggedIn } = useSelector((state) => state.user)
    

    return (
        <div >
            <div className='profileCard'>
                <img src = {user.profilePhotoUrl}
                alt='error in loading the picture'
                />
                <div className='cardDetails'>
                    <p>Dog Name: {user.dogName}</p>
                    <p>Age: {user.age}</p>
                    <p>Breed: {user.breed}</p>
                    <p>Gender: {user.gender}</p>
                </div>

                <div>
                    <i class="bi bi-x-circle fs-1 swipeLeft"></i>
                    <i class="bi bi-check-circle fs-1 swipeRight"></i>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard