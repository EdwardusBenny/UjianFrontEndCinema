import React,{Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../support/api-url/apiurl';
import '../support/css/component/book.css';
import image3 from '../support/img/tes3.jpg';


class Book3 extends Component{
    state ={data:[],page:"",bookID:0,slot:[]};
    componentWillMount(){
        if(this.state.page===""){
        this.doGet();
        }
        else if(this.state.page==="detail"){
        this.doPage();
        }
        
    }
    
    doGet = ()=>{
      axios.get(API_URL+'/book3')
        .then(scs=>{
            this.setState({data:scs.data});
            console.log(scs.data);
        }).catch(err=>{
            alert("error");
        })
    }
    renderPage =()=>
    {   
        return (this.state.data.map(map => {
            const {id,nama}= map;
            if(this.state.page==="")
            {   
                return (<div className="col-xs-6" >
                        <input type="button" className="btn btn-success" value={nama} onClick={()=>this.doPage(id)}/>
                        </div>)
            }}
        ))
    }

    renderPageDetail=()=>
        {
            
            return(
          this.state.slot.map(val => {
            const {id,sit,status}= val;
                if(status==="available")
                {
                    return (<div className="col-xs-6" >
                        <input type="checkbox" ref={"cb"+id} value={id}/>{sit}
                        </div>);  
                }
                else if(status==="sold")
                {
                    return (<div className="col-xs-6" >
                    <input type="checkbox"  value={sit} disabled/>{sit}
                    </div>);     
                }
                else{
                    return (<div className="col-xs-6" >
                    <input type="checkbox"  value={sit} checked disabled/>{sit}
                    </div>);   
        
                }
            
        })//map
    );
    }//renderPageDetail

    doBook=(a)=>{
     
        var data=this.state.data;
        var sit=[];
        console.log(data.slot);
        for( var i in a)
        {
            if(this.refs[i].checked)
            {
                data.slot[this.refs[i].value-1].status="sold"
                
            sit.push(data.slot[this.refs[i].value-1].sit);
            }
            
            
        }   
        
        if(sit.length!==0){
                axios.put(API_URL +'/book3/'+this.state.bookID,{
                            id:data.id,
                            nama:data.nama,
                            harga:data.harga,
                            slot:data.slot
                          }).then((scs)=>{
                            console.log(scs);        
                          }).catch((err)=>{
                            console.log(err);
                            alert("fail");
                          })
              var totalHarga=sit.length*data.harga;
              alert("TOTAL HARGANYA : Rp." + totalHarga);
                axios.post(API_URL + "/transaction", {
                    username:this.props.auth.username,
                    namaBioskop:data.nama,
                    totalHarga:totalHarga,
                    slot:sit,
                  }).then((res) => {
                    alert("success");
                    console.log(res);  
                  }).catch((err) => {
                      alert("Add Error!");
                      console.log(err);
                  });   
                
                  
        this.doRedirect();
                }else{
                    alert("pls input");
                }
    }
    doRedirect(){
        axios.get(API_URL+'/book3')
        .then(scs=>{
            this.setState({data:scs.data,page:"done",bookID:0,slot:[]});
            
        }).catch(err=>{
            alert("error");
        })
    }
    doPage(no){
        axios.get(API_URL+'/book3/'+no)
        .then(scs=>{ 
            this.setState({data:scs.data, page:"detail",bookID:no,slot:scs.data.slot});
        });
        
    }
    doBack=()=>{
        axios.get(API_URL+'/book3')
        .then(scs=>{
            this.setState({data:scs.data,page:"",bookID:0,slot:[]});
            
        }).catch(err=>{
            alert("error");
        })
    }
    render(){
        if(this.state.page==="")
        {
            return (

                <div className="container">
                <div className="col-xs-4"><img src={image3} width="100%" height="100%" /></div>
                <div className="col-xs-8">
                <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                            <th>Nama Film : </th>
                            <th><center>Equalizer 2</center></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Sinopsis</td>
                            <td>Robert McCall bekerja sebagai sopir Lyft dan dia membantu yang kurang beruntung melalui temannya Susan Plummer. Salah satu pelanggan setia Lyft yaitu Sam yang sedang mencari lukisan saudara perempuannya yang telah terpisah dari dirinya. McCall meminta susan mencari informasi mengenai lukisan tersebut.</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>IMDB score:</td>
                            <td>7</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>Schedule</td>
                            <td>{this.renderPage()}</td>
                        </tr>
                        </tbody>
                        </table>
                      </div>
                </div>    
                    </div>);
        }//if
        else if(this.state.page==="detail"){
            return (

                <div className="container">
                <div className="col-xs-4">
                <div className="row">
                {this.renderPageDetail()}
                </div>
                <p/><input type="button" className="btn btn-success"  value="Add" onClick={()=>this.doBook(this.refs)}/>
                <input type="button" className="btn btn-success"  value="Back" onClick={this.doBack}/>
                </div>
                <div className="col-xs-8">
                <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                              <th>Icon</th>
                              <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>available</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"  disabled/></td>
                            <td>sold</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"  checked/></td>
                            <td>choosing</td>
                        </tr>
                        </tbody>
                             
                        </table>
                      </div>
                </div>    
                    </div>);
            }//else if
            return <Redirect to="/transaction" />;
        
    }
}
const mapStateToProps = (state) =>{
    const auth = state.auth;
    // return{usersAlgo:users};
    return {auth};
}
export default connect(mapStateToProps)(Book3);