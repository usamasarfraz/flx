import React,{Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './carousel.css';
 
class AdCarousel extends Component {
    render() {
        var imagesArray = this.props.images.filter((image)=>{
            if(image !== "undefined" && image !== undefined){
                return image;
            }
        })
        return (
            <div className="carouselMainDiv">
            <Carousel>
                {
                    imagesArray.map((image,index)=>{
                        if(image){
                        return <div key={index}>
                            <img src={'/'+image} alt={index}/>
                        </div>
                        }
                    })
                }
            </Carousel>
            </div>
        );
    }
};

export default AdCarousel;