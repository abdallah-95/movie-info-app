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

        if(this.state.movieName == null)
            return null;

        this.props.handleLoadingState(true);

        var response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${this.state.movieName}&y=${this.state.movieYear}`,{
            method:"Get"
        }).then(response => response.json());

        var trailerVideoID = null;
        let movieImages = null;
        if(response.Response === "False"){
            this.setState({movieFound:false})
        }
        else{
            this.setState({movieFound:true})
            trailerVideoID = await this.getMovieTrailerVideoID(response.Title,this.state.movieYear);
            movieImages =  await this.getMovieImages(response.imdbID);
        }
        this.props.updateMovieState(response,trailerVideoID,movieImages);

        this.props.handleLoadingState(false);
    }

    getMovieTrailerVideoID = async (movieName, releaseDate) => {
        let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_Google_API_KEY}&q=${movieName} trailer ${releaseDate != null ? releaseDate : ''}`,{
                                    method:"Get"
                                    }).then(response => response.json());
        
        return response.error == null ? response.items[0].id.videoId : null;
    }

    async getMovieImages(imdbID){
        debugger;

        let response = await fetch(`https://imdb8.p.rapidapi.com/title/get-images?limit=7&tconst=${imdbID}`, {
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                                        "x-rapidapi-key": process.env.REACT_APP_x_rapidapi_key
                                    }
                                })
                                .then(response => response.json())
                                .catch(err => {
                                    console.log(err);
                                });
        
        return response?.images;
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
                        <h3 className="col-12 p-1">Search movies</h3>
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