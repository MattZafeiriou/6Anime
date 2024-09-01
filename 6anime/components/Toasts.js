import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function Toasts() {
    const {t, i18n } = useTranslation();
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
        }, 1000);
    }, []);

    return (
        <>
            <div className='donate_toast donate_toast_disable'>
                <div className='donate_toast_text'>
                    {i18n.language === 'en' ? <p>{t('support')} <a href="https://paypal.me/6anime" rel="noreferrer nofollow" target="_blank">PayPal</a></p> : <p><a href="https://paypal.me/6anime" rel="noreferrer nofollow" target="_blank">PayPal</a>{t('support')}</p>}
                    <button onClick={removeToast}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div >
        </>
    );
}

export default Toasts;