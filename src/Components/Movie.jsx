import React,{useState,useCallback, useRef} from 'react'
import '../Styles/App.css'
import YouTubePlayer from 'react-player';
import MovieBriefInfoBox from './MovieBriefInfoBox'
import ImageViewer from "react-simple-image-viewer"


function Movie(props){

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
      
    const openImageViewer = useCallback(index => {
        debugger;

        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);
    
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return(
        <div className="container mt-5 movie">
            <div className="row">
                <div className="col-4">
                    <h2 className="mb-2">{props.movie?.Title}</h2>
                    <img alt="" src={props.movie?.Poster}/>
                </div>
                <div className="col-md-8 col-sm-4">                         
                    <MovieBriefInfoBox movie={props.movie} />   

                    <div className="row h-100">
                        <div className="col h-75 align-self-center">
                        <YouTubePlayer
                            url={props.trailer}
                            controls = {true}
                            key={props.trailer}//in order to reload player with "trailer" state
                            width="100%"
                            height="100%"
                        />
                        </div>
                    </div>                          
                </div>    
            </div>
            {/* Movie Description */}

            <div className="row mt-3">
                <div className="col-7">
                    <p>{props.movie.Plot}</p>
                </div>
            </div>

            <div className="row mt-4">

                <div className="col-12">
                <MovieImages images={props.images} 
                             openImageViewerCallback={openImageViewer}/>


                {
                    isViewerOpen && (
                        <ImageViewer
                            src={props.images.map((img) => img.url)}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                            backgroundStyle={{
                                backgroundColor: "rgba(0,0,0,0.9)"
                            }}
                        />
                    )
                }
                {/* { props.images.map(img => <img  alt="" src={img.url} className="movieImage"/>)} */}

                {/* <img alt="" src={props.movie?.Poster} style={{width:"150px"}}/>
                <img alt="" src={props.movie?.Poster} style={{width:"150px"}}/> */}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-6" style={{fontWeight:"bold",fontSize:"15px"}}>
                    <p>{props.movie.Awards}</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-7">
                    <h6>Director:</h6>
                    <span>{props.movie.Director}</span>
                    <h6 className="mt-2">Actors:</h6>
                    <span>{props.movie.Actors}</span>
                    <h6 className="mt-2">BoxOffice:</h6>
                    <span>{props.movie.BoxOffice}</span>                
                </div>
            </div>
        </div>
        
    );
    
}

const MovieImages = React.memo((props) => {
    return(
            props.images.map((img,index) => <img  alt="" src={img.url} className="movieImage" onClick={() => props.openImageViewerCallback(index)}/>)
    );
})

export default Movie