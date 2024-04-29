import React from 'react';
import './Footer.css'

class Footer extends React.Component
{

  render()
  {
    return (
      <div className="footer">
          <div className="footertext">
              <div className='footerside'>
                <h5>Copyright 6Anime<span>&#169;</span></h5>
                <h5><a href="/tos">Terms Of Service</a></h5>
                <h5><a href="/dmca">DMCA</a></h5>
              </div>
              <h5>Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.</h5>
          </div>
      </div>
    );
  }
}
export default Footer;