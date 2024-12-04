import Navbar from './Navbar';
import Reviews from './Reviews';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css'

function Home() {

    return (
        <>
            <Navbar />
            <Carousel className='date_review_carousel' indicators={false}>
                <Carousel.Item>
                    <Reviews image="/Assets/images-4.jpeg" name="Alice" review="My dog has found a new Love" />
                </Carousel.Item>
                <Carousel.Item>
                    <Reviews image="/Assets/images-4.jpeg" name="Kirti" review="My dog has found a new Love" />
                </Carousel.Item>
                <Carousel.Item>
                    <Reviews image="/Assets/images-4.jpeg" name="John" review="Such a wonderful experience!" />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Home