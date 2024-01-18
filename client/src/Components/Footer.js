import React from 'react';
import './Footer.css'

class Footer extends React.Component
{

  render()
  {
    return (
      <div className="footer">
          <div className="footertext">
              <h5>Copyright 6Anime<span>&#169;</span> 2023</h5>
              <h5>Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.</h5>
          </div>
      </div>
    );
  }
}
export default Footer;