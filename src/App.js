import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'
import {connect} from 'react-redux';
import EventPage from './pages/EventPage';
import EventList from './pages/EventList';



function App(props) {

  return (
    <>
    <Router>
      <Switch>
        <>
        <Route path='/' exact component={EventPage}/>
        <Route path='/eventlist' exact component={EventList}/>
        </>
      </Switch>
    </Router>
    </>
  );
}
const mapStateToProps = state =>({
  user : state.auth 
})
export default connect(mapStateToProps)(App);
