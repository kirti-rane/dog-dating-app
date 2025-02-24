import Footer from "./Foooter"
import Navbar from "./Navbar"
import ProfileCard from "./ProfileCard"
import './SwipeRight.css'
import axios from "axios"
import { useState,useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';

function SwipeRight(){

    const [users, setUsers] = useState([])//for the loaded users
    const limit = 5; 
    const [offset,setOffset] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const loggedInUserData = useSelector((state) => state.user.userData)
    const dogName = loggedInUserData.userDetails.dogName
    const ownerEmail = loggedInUserData.userDetails.ownerEmail
    console.log("sakjdgasjd",loggedInUserData)

    useEffect(()=>{

        loadMoreUsers()

    },[])

    const loadMoreUsers= async()=>{

      console.log(users,"initial users")
      console.log("loadmore")

       try{

        const response = await axios.get("http://localhost:4000/dogUser/swipeRight",{params: { limit, offset, dogName, ownerEmail}})

        setUsers(users => [...users, ...response.data.allUsers]);

        setOffset(prevOffset => prevOffset + limit);

        console.log("hehlloo",users)

       }catch(error){

         console.log(error)

       }

    }

    const handleNext = () => {
        if (currentIndex < users.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          loadMoreUsers(); // Load more users when reaching the end
        }
      };
    
      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
      };
    

    return(
        <>
            <Navbar/>
                <div className='profileCardContainer' >
                    <i class="bi bi-arrow-left-circle fs-1 icon-clickable" onClick={handlePrev}></i>

                    {users.length > 0 ? (
                        <ProfileCard user={users[currentIndex]} />
                        ) : (
                        <p>Loading...</p>
                    )}                 
                    <i class="bi bi-arrow-right-circle fs-1 icon-clickable" onClick={handleNext}></i>
                </div>
            
            <Footer/>

        </>
    )
}

export default SwipeRight