import React from 'react'
import MovieAppHeader from './MovieAppHeader'
import Movie from './Movie'

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            movie:null,
            trailer:null
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
        this.setState({movie:movieData,trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`})
    }

    render(){
        return(
            <div className="app">
                <MovieAppHeader updateMovieState = {this.updateMovieState}/>
                {
                      this.state.movie != null && this.state.movie?.Response == "True" &&
                        <Movie movie={this.state.movie} trailer={this.state.trailer}/>
                }
            </div>
        );
    }
}


export default App