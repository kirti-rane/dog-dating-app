
import './ProfilePhoto.css'


function ProfilePhoto({onPhotoChange,setProfilePhoto, profilePhoto}) {

  const handlePhotoChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Set the uploaded image preview
        if (onPhotoChange) {
          onPhotoChange(file); // Pass the file to the parent component or Formik
        }
      };
      reader.readAsDataURL(file);
    }
  };

    return (

        <div className='container'>
            <label htmlFor="photoInput" >
                <div className="profilePhotoWrapper">
                    {profilePhoto ? (
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="profilePhoto"
                        />
                    ) : (
                        <div className="profilePhoto"><i class="bi bi-person-circle"></i></div>
                    )}
                </div>
                <label>Profile Picture</label>
            </label>
            <input
                type="file"
                id="photoInput"
                name="profilePhoto"
                accept="image/*"
                className='fileInput'
                onChange={handlePhotoChange}
            />
        </div>
    )

}

export default ProfilePhoto