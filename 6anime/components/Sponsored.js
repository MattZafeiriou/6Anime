import { useTranslation } from 'react-i18next';

export default function Sponsored({ data }) {
    const { t } = useTranslation();
    return (
        <>
            <div className='sponsored'> {/* spon_sored for adblockers */}
                <a href='https://yt2mp3.tv/' target='_blank' rel='nofollow'>
                    <img src='https://yt2mp3.tv/android-chrome-192x192.png' alt='Sponsor Logo' />
                </a>
                <div className='sponsored-text'>
                    <a href='https://yt2mp3.tv/' target='_blank' rel='nofollow'>
                        <h4>yt2mp3.tv</h4>
                    </a>
                    <h5>{t('sponsor_text')}</h5>
                </div>

                <h3>{t('sponsored')}</h3>
            </div>
        </>
    );

}