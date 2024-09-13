import React from 'react';
import "./Sponsor.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo1 from "../../assets/logo1.jpg"
import logo2 from "../../assets/logo2.jpg"
import logo3 from "../../assets/logo3.jpg"
import logo4 from "../../assets/logo4.jpg"
import logo5 from "../../assets/logo5.jpg"
import logo6 from "../../assets/logo6.jpg"
import logo7 from "../../assets/logo7.jpg"
import logo8 from "../../assets/logo8.jpg"
import logo9 from "../../assets/logo9.jpg"
import logo10 from "../../assets/logo10.jpg"


const Sponsor = () => {

    // Slick slider settings 
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className='sponsor-container'>
            <div className='sponsor-text'>
                <h2>Our Trusted Affiliates</h2>
                <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
            <div className='my-slick-sider'>
                <Slider {...settings}>
                    <div>
                        <img src={logo1} alt="image" />
                    </div>
                    <div>
                        <img src={logo2} alt="image" />
                    </div>
                    <div>
                        <img src={logo5} alt="image" />
                    </div>
                    <div>
                        <img src={logo3} alt="image" />
                    </div>
                    <div>
                        <img src={logo8} alt="image" />
                    </div>
                    <div>
                        <img src={logo4} alt="image" />
                    </div>
                    <div>
                        <img src={logo6} alt="image" />
                    </div>
                    <div>
                        <img src={logo7} alt="image" />
                    </div>
                    <div>
                        <img src={logo8} alt="image" />
                    </div>
                    <div>
                        <img src={logo9} alt="image" />
                    </div>
                    <div>
                        <img src={logo10} alt="image" />
                    </div>
                </Slider>
            </div>
            <hr />
        </div>
    );
};

export default Sponsor;