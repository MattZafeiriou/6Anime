import React from 'react';
import './Sponsored.css'
import SponsorImg from './sponsor.svg'

class Sponsored extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div className='spon_sored'> {/* spon_sored for adblockers */}
            <a href='https://mp3convert.tech' target='_blank' rel='noreferrer noopener'>
                <img src={SponsorImg} alt='Sponsor Logo' />
            </a>
            <div className='spon_sored-text'>
                <a href='https://mp3convert.tech' target='_blank' rel='noreferrer noopener'>
                    <h4>mp3convert.tech</h4>
                </a>
                <h5>Ads-free, lightning-fast YouTube converter, respecting your privacy. Experience the speed you deserve!</h5>
            </div>

            <h3>Sponsored</h3>
        </div>
      </>
    );
  };
}
export default Sponsored;