import React, {Component} from 'react';
class AlbumDetail extends Component{
    render(){
       const {title,url,image} = this.props.albumd;
       
        return(
       
            <div className="playout">
            <a target="blank"href={url}>
            <img className="img-responsive gbulat"src={image} alt={image}/>
            </a>{title}
       
            </div> 
          
        );
    }
}

export default AlbumDetail;