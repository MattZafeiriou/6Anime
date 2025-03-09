import { useTranslation } from 'react-i18next';

export default function Sponsored({ data }) {
    const { t } = useTranslation();
    return (
        <>
            <div className='sponsored'> {/* spon_sored for adblockers */}
                <a href='https://mp3convert.tech/' target='_blank' rel='nofollow'>
                    <img src='https://mp3convert.tech/android-chrome-192x192.png' alt='Sponsor Logo' />
                </a>
                <div className='sponsored-text'>
                    <a href='https://mp3convert.tech/' target='_blank' rel='nofollow'>
                        <h4>mp3convert.tech</h4>
                    </a>
                    <h5>{t('sponsor_text')}</h5>
                </div>

                <h3>{t('sponsored')}</h3>
            </div>
        </>
    );

}