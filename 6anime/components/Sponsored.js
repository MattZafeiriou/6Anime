export default function Sponsored({ data }) {
    return (
        <>
        <div className='spon_sored'> {/* spon_sored for adblockers */}
            <a href='https://yt2mp3.tv/' target='_blank' rel='noopener'>
                <img src='https://yt2mp3.tv/android-chrome-192x192.png' alt='Sponsor Logo' />
            </a>
            <div className='spon_sored-text'>
                <a href='https://yt2mp3.tv/' target='_blank' rel='noopener'>
                    <h4>yt2mp3.tv</h4>
                </a>
                <h5>Ads-free, lightning-fast YouTube converter, respecting your privacy. Experience the speed you deserve!</h5>
            </div>

            <h3>Sponsored</h3>
        </div>
      </>
    );

}
