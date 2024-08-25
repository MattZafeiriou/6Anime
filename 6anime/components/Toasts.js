function Toasts() {
    // css is at main.css
    return (
        <>
            <div className='donate_toast'>
                <div className='donate_toast_text'>
                    <p>Support 6Anime by donating via <a href="https://paypal.me/6anime" rel="noreferrer nofollow" target="_blank">PayPal</a></p>
                    <button onClick={() => document.querySelector('.donate_toast').style.display = 'none'}><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div >
        </>
    );
}

export default Toasts;