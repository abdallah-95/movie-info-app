import React from 'react'

export default class FooterMovie extends React.Component{

    render(){
        return(
            <div>
                <img src={this.props.moviePoster} alt=""/>
                <h5>{this.props.movieTrailer}</h5>
            </div>
            
        );
    }
}