import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import TopMovies from './TopMovies'
import Navbar from './Navbar'

export default class App extends React.Component{

    render(){
        return(
            <div>
                <main>
                    <Navbar />
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/top_movies" component={TopMovies}/>
                        <Route path="/:movieName" render={(props) => <Home />}/>
                    </Switch>
                </main>
            </div>
        );
    }
} 