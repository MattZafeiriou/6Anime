import Head from 'next/head'

function PaymentMethod(props)
{
  return (
    <div className="paymentMethod">
      <a href={props.href}>
        <img src={props.src} alt={props.text} />
      </a>
      <a href={props.href}><button>{props.text}</button></a>
    </div>
  );
}

export default function Donate({ data }) {

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
                <h1>Thank You For Supporting Us!</h1>
                <h4>We accept the following payment methods</h4>
                <div className='paymentMethods'>
                  <PaymentMethod href="../donate_paypal" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" text="Donate with PayPal" />
                  <PaymentMethod href="../donate_bitcoin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/1200px-Bitcoin_logo.svg.png" text="Donate with Bitcoin" />
                  <PaymentMethod href="../donate_ethereum" src="https://altcoinsbox.com/wp-content/uploads/2023/01/full-ethereum-logo-grey.png" text="Donate with Ethereum" />
                </div>
            </div>
        </>
      );
}
