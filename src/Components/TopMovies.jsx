import React from 'react'
import TopMoviesItem from './TopMoviesItem'

export default class TopMovies extends React.Component{

    state = {
        topMovies: [],
        currentPageMovies: [],
        currentPageMoviesData: [],
        currentPage:1,
        pageCount:5,
        pages:null,
        maxRight:null,
        maxLeft:null,
        maxNumberOfPages:5,
        Loading:true
    }

    async getMovieData(id){
        let movie = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`)
        .then(response => response.json());  

        return movie;
    }

    async componentDidMount(){
        debugger;
        
        await fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_x_rapidapi_key
            }
        })
        .then(response => response.json())
        .then(async function(topMoviesResult){
            
            let currentTopMovies = this.state.topMovies;

            topMoviesResult.forEach(movie => currentTopMovies.push(movie));

            let trimStart = (this.state.currentPage - 1) * this.state.pageCount;
            let trimEnd = trimStart + this.state.pageCount;

            let trimmedData = currentTopMovies.slice(trimStart,trimEnd);
            let currentMovies = trimmedData;

            let totalPagesCount = Math.ceil(topMoviesResult.length / this.state.pageCount);

            let currentPageMoviesData = [];
            let response;

            for(let i=0; i<currentMovies.length ; i++){  
                response = await this.getMovieData(currentMovies[i].id.replace('/title/','').replace('/',''));
                currentPageMoviesData.push({movie:response,
                                            rating:currentMovies[i].chartRating,
                                            ranking:currentTopMovies.findIndex((e) => e.id === currentMovies[i].id) + 1
                                           })              
            }

            this.setState({
                topMovies: currentTopMovies,
                currentPageMovies: trimmedData,
                currentPageMoviesData: currentPageMoviesData,
                pages: totalPagesCount,
                maxRight:this.state.maxNumberOfPages,
                maxLeft:1,
                Loading:false
            })
            
        }.bind(this))
        .catch(err => {
            console.log(err);
        });
    }

    onPageClick = async (e) => {

        debugger;

        let currentPage = parseInt(e.target.dataset.value);
        let currentMaxLeft,currentMaxRight;

        if(e.target.dataset.value === 'f'){
            currentPage = 1
        }else if(e.target.dataset.value === 'l'){
            currentPage = this.state.pages
        }

        currentMaxLeft = currentPage - Math.floor(this.state.maxNumberOfPages / 2);
        currentMaxRight = currentPage + Math.floor(this.state.maxNumberOfPages / 2);
    

        if(currentMaxLeft < 1){
            currentMaxLeft = 1;
            currentMaxRight = this.state.maxNumberOfPages;
        }

        if(currentMaxRight > this.state.pages){
            currentMaxLeft = this.state.pages - (this.state.maxNumberOfPages - 1);
            currentMaxRight = this.state.pages;
        }

        let currentTopMovies = this.state.topMovies;

        let trimStart = (currentPage - 1) * this.state.pageCount;
        let trimEnd = trimStart + this.state.pageCount;

        let trimmedData = currentTopMovies.slice(trimStart,trimEnd);
        let response;
        let currentPageMoviesData = [];

        this.setState({
            Loading:true
        });

        for(let i=0; i<trimmedData.length ; i++){  
            response = await this.getMovieData(trimmedData[i].id.replace('/title/','').replace('/',''));
            currentPageMoviesData.push({movie:response,
                                        rating:trimmedData[i].chartRating,
                                        ranking:currentTopMovies.findIndex((e) => e.id === trimmedData[i].id) + 1
                                       })              
        }

        this.setState({
            currentPageMovies: trimmedData,
            currentPageMoviesData: currentPageMoviesData,
            maxRight:currentMaxRight,
            maxLeft:currentMaxLeft,
            currentPage:currentPage,
            Loading:false
        });
    }

    render(){
        const listItems = [];

        for(let i=this.state.maxLeft; i<=this.state.maxRight ;i++){
            listItems.push(<li key={i} class="page-item"><a class="page-link" href="#" data-value={i} onClick={this.onPageClick}>{i}</a></li>)       
        }

        return(
            <div className="ml-5 mt-3 TopMovies">
                <h2>Top Rated Movies</h2>
                    
                    {
                    this.state.Loading === true ?
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                        :
                        
                        <div>
                            <div className="container m-1">
                                <div className="row header">

                                    <div className="col-4 offset-1">
                                    <span>Rank & Title</span>
                                    </div>

                                    <div className="col-1">
                                    <span>Rating</span>
                                    </div>
                                </div>
                                {
                                    this.state.currentPageMoviesData.map(movieData => <div><TopMoviesItem location={this.props.location} movieData={movieData}/> <hr/></div>)
                                    // this.state.currentPageMovies.map(movie => 
                                    // <li>{movie.id} {'=>'} {movie.chartRating}</li>
                                    // )
                                }
                            </div>

                    <ul className="pagination">
                        <li key="f" className="page-item">
                        <a href="#" className="page-link" data-value={'f'} onClick={this.onPageClick}>First</a>
                        </li>

                        {listItems}            
                        {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li> */}


                        <li key="l" className="page-item">
                        <a href="#" className="page-link" data-value={'l'} onClick={this.onPageClick}>Last</a>
                        </li>
                    </ul>
                </div>
                }
            </div>
        );
    }
}