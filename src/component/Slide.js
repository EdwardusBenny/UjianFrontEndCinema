import React, {Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import image1 from '../support/img/tes1.jpg';
import image2 from '../support/img/tes2.jpg';
import image3 from '../support/img/tes3.jpg';
import {Link} from 'react-router-dom';


class Carousels extends Component{
    kucing = ()=> {
        if(this.props.muncul)
        {
            return(<h1>{this.props.textnya}</h1>)
        }
    }
    render(){
        return(
            <div>
            <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showIndicators={false} className="container kucing">
            <div className="merdeka"><Link to="/Book">
                <img src={image1} />
                <p className="legend">Pesan Tiket Sekarang</p> 
                </Link>
            </div>
            <div className="merdeka">
                <img src={image2} /><Link to="/Book2">
                <p className="legend">Pesan Tiket Sekarang</p>
                </Link>
            </div>
            <div className="merdeka">
                <img src={image3} /><Link to="/Book3">
                <p className="legend">Pesan Tiket Sekarang</p>
                </Link>
            </div>
        </Carousel>
        {this.kucing()}
        </div>
        )
    }
}

export default Carousels;