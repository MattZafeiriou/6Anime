import Head from 'next/head'
import { useEffect } from 'react';

function addBitcoinPopup(e) {
  e.preventDefault();
  document.getElementById('bitcoinaddress').style.display = 'block';
}

function addEthereumPopup(e) {
  e.preventDefault();
  document.getElementById('ethereumaddress').style.display = 'block';
}

function PaymentMethod(props) {
  return (
    <div className="paymentMethod">
      <a href={props.href} target="_blank">
        <img src={props.src} alt={props.text} />
      </a>
      <a href={props.href} target="_blank"><button onClick={props.onClick}>{props.text}</button></a>
    </div>
  );
}

export default function Donate({ data }) {

  useEffect(() => {
    document.getElementById('donate').classList.add('active');
    document.getElementById('donatem').classList.add('active');
  });

  return (
    <>
      <Head>
        <title>6Anime - Donate</title>
        <meta property="og:title" content="6Anime - Donate" />
        <meta
          property="og:description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
        <meta
          name="description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
        <meta
          name="keywords"
          content="anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english"
        />
      </Head>
      <div className="donatemain">
        <h1>Buy us a coffee</h1>
        <h5>Help us keep the site running</h5>
        <p>6Anime is a free service that relies on ads to keep the site running. If you enjoy the site, please consider supporting us by disabling your adblocker or donating to us. We greatly appreciate your support!</p>
        <h3>Donation methods</h3>
        <div className='paymentMethods'>
          <PaymentMethod href="https://www.patreon.com/6AnimeOfficial" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Patreon_logo.svg/2048px-Patreon_logo.svg.png" text="Donate through Patreon" />
          <PaymentMethod href="" onClick={addBitcoinPopup} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" text="Donate with Bitcoin" />
          <PaymentMethod href="" onClick={addEthereumPopup} src="https://cryptologos.cc/logos/ethereum-eth-logo.png" text="Donate with Ethereum" />
        </div>
      </div>
      <div id="bitcoinaddress" className='popupdonate'>
        <div className='popupcontent'>
          <h2>Bitcoin wallet address</h2>
          <p>bc1q69cavjjkydv63pd3xq00v2du5327sgcshw06yt</p>
          <img src={'./bitcoin.png'} alt='Bitcoin QR code' />
          <button onClick={() => document.getElementById('bitcoinaddress').style.display = 'none'}>Close</button>
        </div>
      </div>
      <div id="ethereumaddress" className='popupdonate'>
        <div className='popupcontent'>
          <h2>Ethereum wallet address</h2>
          <p>0x07e2867D516F83B43ea9fb9F0637A81D94f467B5</p>
          <img src={'./ethereum.png'} alt='Ethreum QR code' />
          <button onClick={() => document.getElementById('ethereumaddress').style.display = 'none'}>Close</button>
        </div>
      </div>

    </>

  );
}
