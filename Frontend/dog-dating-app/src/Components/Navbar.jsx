import { Link } from 'react-router-dom'
import './Navbar.css'
// import './ProfilePhoto.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar({profilePhoto}) {

    return (
        <div className='navbar'>
            <div className="logo">
                <Link to="/" className='link-style'><h3>tindog</h3></Link>
                <h1>Find a Perfect Match !!
                    <br></br>
                    <div className='download-button'>
                        <button type="button" class="btn btn-dark btn-lg"><i class="bi bi-google-play"></i> Download</button>
                        <button type="button" class="btn btn-light btn-lg"><i class="bi bi-apple"></i>  Download</button>
                    </div>

                </h1>

            </div>
            <div>

            </div>
            <div className="sidebar_links">
                
                <Link to="/signUp">SignUp</Link>
                <Link to="/login">Login</Link>
                <Link to="/aboutus">About Us</Link>
                
                <div className="profilePhotoWrapper">
                    {profilePhoto ? (
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            // className="profilePhoto"
                        />
                    ) : (
                        <div className="profilePhoto"><i class="bi bi-person-circle fs-2"></i></div>
                    )}
                </div>



            </div>


        </div>
    )
}
export default Navbar
