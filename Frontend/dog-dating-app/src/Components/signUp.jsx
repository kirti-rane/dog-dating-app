import Navbar from "./Navbar"
import './signUp.css'


function signUp() {

    return (
        <>
            <Navbar />
            <form>
                <label for="dogName">Dog Name:</label>
                <input type="text" id="dogName" name="username" />

                <label for="email">Owner's Email:</label>
                <input type="email" id="email" name="email" />

                <label for="age">Dog's Age:</label>
                <input type="number" id="age" name="age" />

                <label for="breed">Breed:</label>
                <input type="text" id="breed" name="breed" />

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" />

                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" />

                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default signUp