import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'
import {connect} from 'react-redux';
import EventPage from './pages/EventPage';
import EventList from './pages/EventList';
import EventPost from './pages/EventPostPage';



function App(props) {

  return (
    <>
    <Router>
      <Switch>
        <>
        <Route path='/' exact component={EventPost}/>
        <Route path='/eventlist' exact component={EventList}/>
        <Route path='/dashboard' exact component={EventPage}/>
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
