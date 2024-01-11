import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from './Components/Footer.js'
import Home from './Components/Main/MainP.js';
import About from './Components/About/About.js';
import Player from './Components/Player/Player.js';
import NotFound from './Components/NotFound.js';
import Contact from './Components/Contact/Contact.js';
import Headerr from './Components/Headerr.js'
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
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}>
        <Headerr/>
        <Home/>
        <Footer/>
      </Route>
      <Route exact path='/about' component={About}>
        <Headerr/>
        <About/>
        <Footer/>
      </Route>
      <Route exact path='/submit_success' component={SubmitSuccess}>
        <Headerr/>
        <SubmitSuccess/>
        <Footer/>
      </Route>
      <Route exact path='/watch/*' component={Player}>
        <Headerr/>
        <Player/>
        <Footer/>
      </Route>
      <Route exact path='/contact' component={Contact}>
        <Headerr/>
        <Contact/>
        <Footer/>
      </Route>
      <Route exact path='/donate' component={Donate}>
        <Headerr/>
        <Donate/>
        <Footer/>
      </Route>
      <Route exact path='/create' component={AddVideo}>
        <AddVideo/>
      </Route>
      <Route exact path='/movies' component={Movies}>
        <Headerr/>
        <Movies/>
        <Footer/>
      </Route>
      <Route exact path='/recently_added' component={RecentlyAdded}>
        <Headerr/>
        <RecentlyAdded/>
        <Footer/>
      </Route>
      <Route exact path='/trending' component={Trending}>
        <Headerr/>
        <Trending/>
        <Footer/>
      </Route>
      <Route exact path='/series' component={Series}>
        <Headerr/>
        <Series/>
        <Footer/>
      </Route>
      <Route exact path='/search' component={Search}>
        <Headerr/>
        <Search/>
        <Footer/>
      </Route>
      <Route path='*' component={NotFound}>
        <Headerr/>
        <NotFound/>
        <Footer/>
      </Route>
    </Switch>
  );
}

export default Main;