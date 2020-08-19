import React from 'react'
import '../Styles/App.css'


class MovieAppHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            movieName:null,
            movieYear:null,
            movieFound:null
        }
    }
    handleOnSubmit = async (e) => {
        debugger;
        e.preventDefault();   

        // var response = await fetch("http://www.omdbapi.com/?apikey=457a95d2&t='Guardians of the Galaxy Vol. 2'",{
        //         method:"Get"
        //     });
        // var json = await response.json();
        // this.setState({movie:json});
        // console.log(json);
        if(this.state.movieName == null)
            return null;

        var response = await fetch(`http://www.omdbapi.com/?apikey=457a95d2&t=${this.state.movieName}&y=${this.state.movieYear}`,{
            method:"Get"
        }).then(response => response.json());

        if(response.Response === "False"){
            this.setState({movieFound:false})
        }else
            this.setState({movieFound:true})


        var trailerVideoID = await this.getMovieTrailerVideoID(response.Title,this.state.movieYear);
        this.props.updateMovieState(response,trailerVideoID);
    }

     getMovieTrailerVideoID = async (movieName, releaseDate) => {
        let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCzkXD6Mo9bs4Rmc_baZ9QADnW9_8afNCI&q=${movieName} trailer ${releaseDate != null ? releaseDate : ''}`,{
                                    method:"Get"
                                    }).then(response => response.json());
        
        return response.error == null ? response.items[0].id.videoId : null;
    }

    handleMovieNameTextBoxOnChange = (e) => {
        this.setState({
            movieName: e.target.value
        });
    }

    handleMovieYearTextBoxOnChange = (e) => {
        this.setState({
            movieYear: e.target.value
        });
    }

    render(){
        return(
            <div className="ml-5 mt-3 MovieAppHeader">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-inline">
                        <h3 className="col-12 p-1">What is this movie?</h3>
                        <div className="input-group">
                            <input type="text" placeholder="Title" className={`col-12 form-control  ${this.state.movieFound === true ? 'is-valid'  : this.state.movieFound === false ? 'is-invalid':''}`} onChange={this.handleMovieNameTextBoxOnChange} required/><br/>
                            <input type="text" placeholder="Year" className="col-3 form-control" onChange={this.handleMovieYearTextBoxOnChange}/><br/>
                        </div>
                        <input type="submit" value="Search" id="sub1" className="form-control col-sm-1 ml-3 btn btn-primary"/>
                        <div className="invalid-feedback" style={this.state.movieFound === false ? {display:"block"} : {display:"none"} }>
                          Movie Not Found!
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MovieAppHeader