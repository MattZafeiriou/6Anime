import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from './Components/Footer.js'
import Home from './Components/Main/MainP.js';
import About from './Components/About/About.js';
import Player from './Components/Player/Player.js';
import NotFound from './Components/NotFound.js';
import Contact from './Components/Contact/Contact.js';
import Header from './Components/Header.js'
import SubmitSuccess from './Components/Submit_Success/Submit_success.js'
import Donate from './Components/Donate/Donate.js'
import AddVideo from './Components/AddVideo/AddVideo.js'
import Movies from './Components/Movies/Movies.js'
import Series from './Components/Series/Series.js'
import Search from './Components/Search/Search.js'
import RecentlyAdded from './Components/RecentlyAdded/RecentlyAdded.js'
import Trending from './Components/Trending/Trending.js'

const Main = () => {
  return (
    <>
      <div className='mainpage'>
        <Header/>
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/submit_success' component={SubmitSuccess}/>
          <Route exact path='/watch/*' component={Player}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/donate' component={Donate}/>
          <Route exact path='/create' component={AddVideo}/>
          <Route exact path='/movies' component={Movies}/>
          <Route exact path='/recently_added' component={RecentlyAdded}/>
          <Route exact path='/trending' component={Trending}/>
          <Route exact path='/series' component={Series}/>
          <Route exact path='/search' component={Search}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </div> {/* This div is used to make the footer stick to the bottom of the page */}
      <Footer/>
    </>
  );
}

export default Main;