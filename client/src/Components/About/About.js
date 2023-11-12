import React from 'react';
import './About.css'
import { Accordion } from 'react-bootstrap';

class Header extends React.Component {
  
  constructor(proms)
  {
    super(proms);
  }

  componentDidMount() {
    document.getElementById("about").classList.add("active");
  }

  render() {
    return (
      <>
          <div className="gradient"></div>
          <div className="aboutmain">
              <h1>About Us</h1>
              <p>We are a group of 4 students who made this project as a school final term project.</p>
              <p>This website took us over 6 months to create and since the deployment of the website</p>
              <p>we have been working on it to make it better and better.</p>
              <br/>
              <p>If you want to support our work and keep the website running you may donate through our <a href='/contact'>contact page</a></p>
              <p>Thank you for preferring us!</p>
              <br/>
              <br/>
              <h1>Frequently Asked Questions</h1>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is the purpose of this website?</Accordion.Header>
                <Accordion.Body>
                  This website was created as a school project for the course of Web Development.
                  It was created by a group of 4 students, who are currently studying at the University of Macedonia.
                  All the data that is used in this website are NOT stored in a database. Instead, we use a .txt file to store the URLs of the videos.
                  <br/>
                  This website was created using React.js, Node.js, Express.js and Bootstrap.
                  Anything else you see here is just HTML, CSS and JavaScript.
                  <br/>
                  All the content stored in our servers is ours and we have the right to use it.
                  The videos are not stored in our servers, but instead we use APIs to embed them in our website through the client side.
                  <br/>
                  You can contact us through our <a href='/contact'>contact page</a>.
                  <br/>
                  This website is not for commercial use and it is only for educational purposes and therefore we do not have any ads.
                  The only way we can make money is through donations.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>I am a creator and I want to get my content off of this website. What do I do?</Accordion.Header>
                <Accordion.Body>
                  It is fairly easy to get your content off of this website. All you have to do is contact us through our <a href='/contact'>contact page</a> and we will remove your content as soon as possible.
                  As we are a group of students, we do not have the time to check our website every day, so it might take a while for us to remove your content.
                  <br/>
                  We are sorry for any inconvenience this might cause.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>How can I upload my own Anime series/movie here as its creator?</Accordion.Header>
                <Accordion.Body>
                  We are happy to hear that you want to upload your own content here. All you have to do is contact us through our <a href='/contact'>contact page</a> and we will get back to you as soon as possible.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Is this website for sale?</Accordion.Header>
                <Accordion.Body>
                  No, this website is not for sale. We are not interested in selling this website yet.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
      </>
    );
  };
}
export default Header;