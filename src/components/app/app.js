import React,{Component} from 'react';

import Header from '../header';

import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import {PeoplePage,
        PlanetsPage,
        StarshipsPage,
        LoginPage,
        SecretPage } from '../pages';

import {SwapiServiceProvider} from '../swapi-service-context';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService : new SwapiService(),
    isLoggedIn:false
  };

  onLogin = ()=> {
    this.setState({
      isLoggedIn:true
    });
  };

  onServiceChange =()=>{
    this.setState( ({swapiService})=>{
      const Service = swapiService instanceof SwapiService?
                      DummySwapiService:SwapiService;
      console.log('switched to ', Service.name);
      return{
        swapiService: new Service()
      }
    })
  };

  componentDidCatch() {
    this.setState({hasError:true});  
  }

  render(){

    const {isLoggedIn} = this.state; 

    if(this.state.hasError) {
      return <ErrorIndicator/>
    };

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className ="stardb-app"> 
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet/>
              <Route path="/" 
                     exact 
                     render={()=><h2>Welcome to StarDB</h2>}/>
              <Route path="/people/:id?" component ={PeoplePage}/>
              <Route path="/planets" component ={PlanetsPage}/>
              <Route path="/starships" exact component ={StarshipsPage}/>
              <Route path="/starships/:id" 
                      render={({match})=>{
                        return <StarshipDetails itemId={match.params.id}/>
                      }}/>
              <Route path="/login" render={()=>(
                  <LoginPage
                  isLoggedIn={isLoggedIn}
                  onLogin={this.onLogin}
                  />
              )}/>
              <Route path="/secret" render={()=>(
                  <SecretPage isLoggedIn={isLoggedIn}/>
              )}/>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>

      
    );
  }
}
//<RandomPlanet />
//<PeoplePage />