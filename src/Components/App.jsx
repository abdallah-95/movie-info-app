import React from 'react'
import MovieAppHeader from './MovieAppHeader'
import Movie from './Movie'
import FooterMovie from './FooterMovie'

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            movie:null,
            trailer:null,
            previousMovies:[]
        }
    }

    // async componentDidMount(){
    //     debugger;
    //     var response = await fetch("http://www.omdbapi.com/?apikey=457a95d2&t='Guardians of the Galaxy Vol. 2'",{
    //             method:"Get"
    //         });
    //     var json = await response.json();
    //     this.setState({movie:json});
    //     console.log(json);
    // }

    updateMovieState = (movieData,trailerVideoID) => {
        debugger;

        let prevMovies = this.state.previousMovies;
        if(movieData.Response !== "False"){
        prevMovies.unshift({
           movie:movieData,
           trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
           });
        }
        this.setState({movie:movieData,
                       trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
                       previousMovies: prevMovies
                    })
    }

    onPrevMovieClick = (prevMovie, trailer) => {
        debugger;
        this.setState({movie:prevMovie,
                       trailer:trailer
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
                <MovieAppHeader updateMovieState = {this.updateMovieState}/>
                {
                      this.state.movie != null && this.state.movie?.Response === "True" &&
                        <Movie movie={this.state.movie} trailer={this.state.trailer}/>
                }
                {/* <MovieAppFooter currentMovie={this.state.movie}/> */}
                
                {
                this.state.movie != null && this.state.movie?.Response === "True" &&
                    <div className="container previous-movies-group m-5">
                    <div className="row">
                        {this.state.previousMovies.map(prevMovie => 
                        <div className="col-1 mr-5">
                        <FooterMovie moviePoster = {prevMovie.movie?.Poster} 
                                     movieTrailer = {prevMovie.trailer}
                                     movie = {prevMovie.movie}
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


export default App