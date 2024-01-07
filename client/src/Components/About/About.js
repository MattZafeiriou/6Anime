import React from 'react';
import './About.css'
import { Accordion } from 'react-bootstrap';

class Header extends React.Component {

  componentDidMount() {
    document.getElementById("about").classList.add("active");
  }

  render() {
    return (
      <>
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
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is the purpose of this website?</Accordion.Header>
                <Accordion.Body>
                  The purpose of this website is to provide a free and easy way to watch Anime series and movies.
                  We are not the creators of the content on this website, we are just a platform that provides the content.
                  <br/>
                  We do not own any of the content on this website, all of the content is owned by their respective owners.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>I am a creator and I want to get my content off of this website. What do I do?</Accordion.Header>
                <Accordion.Body>
                  We are sorry to hear that you want to get your content off of this website. All you have to do is contact us through our <a href='/contact'>contact page</a> and we will get back to you as soon as possible.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>How can I upload my own Anime series/movie here as its creator?</Accordion.Header>
                <Accordion.Body>
                  We are sorry to inform you that we do not accept any content from creators. We only provide the content that is already available on the internet.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Is this website for sale?</Accordion.Header>
                <Accordion.Body>
                  Yes, this website is for sale. If you are interested in buying this website please contact us through our <a href='/contact'>contact page</a>.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
      </>
    );
  };
}
export default Header;