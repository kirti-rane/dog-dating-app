
function Reviews(props){

    return(
        <div>
            <img src={props.image}></img>
            <h3>{props.name}</h3>
            <h3>{props.review}</h3>
        </div>
    );
}

export default Reviews