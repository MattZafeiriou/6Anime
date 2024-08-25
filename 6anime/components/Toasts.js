import { useEffect } from "react";

function Toasts() {
    // css is at main.css
    function removeToast() {
        document.querySelector('.donate_toast').classList.add("donate_toast_disable");
        setTimeout(() => {
            document.querySelector('.donate_toast').style.display = 'none';
        }, 300);
    }
    useEffect(() => {
        setTimeout(() =>
        {
            document.querySelector('.donate_toast').classList.remove('donate_toast_disable');
        }, 10000);
    }, []);

    return (
        <>
            <div className='donate_toast donate_toast_disable'>
                <div className='donate_toast_text'>
                    <p>Support 6Anime by donating via <a href="https://paypal.me/6anime" rel="noreferrer nofollow" target="_blank">PayPal</a></p>
                    <button onClick={removeToast}><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div >
        </>
    );
}

export default Toasts;