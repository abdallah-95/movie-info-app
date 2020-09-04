import React from 'react'
import MovieAppHeader from './MovieAppHeader'
import Movie from './Movie'
import FooterMovie from './FooterMovie'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import * as actions from '../redux/Actions'


class Home extends React.Component{

     constructor(props){
        super(props);

        this.state = {
            movie:null,
            trailer:null,
            // previousMovies:[],
            movieImages: [],
            Loading: null
        }
    }

    getMovieTrailerVideoID = async (movieName, releaseDate) => {
        debugger;
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

    async componentWillMount(){
        debugger;

        // passing state between components using react router 
        // let trailer = null;
        // if(this.props.location?.state != null){
        //     trailer = await this.getMovieTrailerVideoID(this.props.location?.state.Title,this.props.location?.state.Year);
        //     trailer = `https://www.youtube.com/watch?v=${trailer}`;

        // }

        // this.setState({
        //     movie:this.props.location?.state != null ? this.props.location?.state : null,
        //     trailer:trailer
        // })

        // handling passed movies from topMovies component

        this.setState({
            Loading: true
        });

        let trailer = null;
        let images = null;
        // let prevMovies = this.state.previousMovies;

        if(this.props.topMovie != null){
            trailer = await this.getMovieTrailerVideoID(this.props.topMovie.Title,this.props.topMovie.Year);
            trailer = `https://www.youtube.com/watch?v=${trailer}`;

            images = await this.getMovieImages(this.props.topMovie.imdbID)
           
            this.props.addMovieToHistory(this.props.topMovie, trailer, images);

            // prevMovies.unshift({
            //     movie:this.props.topMovie,
            //     trailer,
            //     movieImages:images
            //     });
        }

        this.setState({
            movie:this.props.topMovie != null ? this.props.topMovie : null,
            trailer:trailer,
            movieImages: images,
            Loading:false
            // previousMovies: prevMovies
        })

        this.props.displayTopMovie(null);
    }

    changeLoadingState = (isLoading) =>{
        this.setState({
            Loading: isLoading
        })
    }

    updateMovieState = (movieData, trailerVideoID, movieImages) => {
        debugger;

        // let prevMovies = this.state.previousMovies;
        // if(movieData.Response !== "False"){
        // prevMovies.unshift({
        //    movie:movieData,
        //    trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
        //    movieImages
        //    });
        // }

        this.props.addMovieToHistory(movieData,`https://www.youtube.com/watch?v=${trailerVideoID}`, movieImages);

        this.setState({movie:movieData,
                       trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
                    //    previousMovies: prevMovies,
                       movieImages
                    })
    }

    onPrevMovieClick = (prevMovie, trailer, movieImages) => {
        debugger;
        this.setState({movie:prevMovie,
                       trailer:trailer,
                       movieImages
                      });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

    }

    render(){
        debugger;

        return(
            <div className="app">
                <MovieAppHeader updateMovieState = {this.updateMovieState} handleLoadingState ={this.changeLoadingState}/>
                {
                    this.state.Loading === true ?
                    <div className="d-flex loading">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    
                    :
                      this.state.movie != null && this.state.movie?.Response === "True" &&
                        <Movie movie={this.state.movie} trailer={this.state.trailer} images={this.state.movieImages}/>
                }
                
                {
                this.state.movie != null && this.state.movie?.Response === "True" && !this.state.Loading &&
                    <div className="container previous-movies-group m-5">
                        <h5>History</h5>
                    <div className="row">
                        {this.props.history.map(prevMovie => 
                        <div className="col-1 mr-5">
                        <FooterMovie moviePoster = {prevMovie.movie?.Poster} 
                                     movieTrailer = {prevMovie.trailer}
                                     movie = {prevMovie.movie}
                                     images = {prevMovie.movieImages}
                                     onPrevMovieClickHandler = {this.onPrevMovieClick}
                        />
                        </div>)
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}


// export default withRouter(Home)

const mapStateToProps = (state) => {
    debugger;
    // console.log('Home top movie');
    // console.log(state);

    return {
      topMovie: state.displayTopMovie?.topMovie,
      history: state.addMovieToHistory?.movieBrowsingHistory
    };
}

const mapDispatchToProps = (dispatch) => {
    debugger;
    // console.log('Home top movie');
    // console.log(state);

    return {
      addMovieToHistory: (movie,trailer,movieImages) => { dispatch(actions.addMovieToHistory(movie,trailer,movieImages))},
      displayTopMovie: (movie) => {dispatch(actions.displayTopMovie(movie))} 
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)