function signUp(){

    return(
        <>
            <form>
                dogName: <input type="text" name="username"/>
                email: <input type="email" name="email"/>
                dog's Age: <input type="number" name="age"/>
                breed: <input type="text" name="breed"/>
                <submit>Submit</submit>
            </form>
        </>
    )
}

export default signUp