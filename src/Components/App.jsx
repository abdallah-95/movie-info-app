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
        prevMovies.push({
            movie:movieData,
           trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
           });

        this.setState({movie:movieData,
                       trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
                       previousMovies: prevMovies
                    })
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

                <div className="container testimonial-group m-5">
                <h3>{this.state.footer}</h3>
                <div className="row">
                    {this.state.previousMovies.map(prevMovie => 
                    <div className="col-3">
                    <FooterMovie moviePoster={prevMovie.movie?.Poster} 
                                movieTrailer={prevMovie.trailer}
                    />
                    </div>)
                    }
                </div>
            </div>
            </div>
        );
    }
}


export default App