import React, {Component} from 'react'

export default class MovieBriefInfoBox extends Component {

    render(){
        return(
            <div className="container w-100 MovieBriefInfoBox">
              <div className="row">
                  <div className="col-1 mr-2 pl-1">
                      <img src={require('../images/star.png')} alt="star"/>
                  </div>
                  <div className="col-2 pl-1">
                  <span>{this.props.movie.imdbRating}/10</span>  
                  <div>
                  <span style={{fontSize:"10px"}}>{this.props.movie.imdbVotes}</span>
                      </div>   
                  </div>

                  {/* <div className="col-2">
                  <span>{this.props.movie.Released}</span>  
                  </div> */}
               </div>
               <div className="row mt-3 MovieBriefInfoSubBox">
                   <div className="col pl-1">
                       <span>{this.props.movie.Rated}</span>
                       <span>|</span>
                       <span>{this.props.movie.Genre}</span>
                       <span>|</span>
                       <span>{this.props.movie.Runtime}</span>
                       <span>|</span>
                       <span>{this.props.movie.Released}</span>  
                   </div>
               </div>
            </div>
        );
    }
}