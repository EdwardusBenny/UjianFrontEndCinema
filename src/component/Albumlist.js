import React, {Component} from 'react';
import axios from 'axios';
import AlbumDetail from './Albumdetail';

class albumList extends Component{
    state={album:[]}

    componentWillMount(){
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(ini=>{
            console.log(ini);
            this.setState({album:ini.data})
        });
    }
    renderAlbumlist = ()=>{
       return this.state.album.map(albums => <AlbumDetail key={albums.title} albumd={albums}/>);
        //map minta paramenter function
    }
    render()
    {
        console.log(this.state.album);
        return(
            <div>
            <div>ALBUM LIST</div>
            <div className="container-fluid ">
            {this.renderAlbumlist()}
            </div>
            </div>
        );
    }
}
export default albumList;//export si class albumList