import { useTranslation } from 'react-i18next';

export default function Footer({ data }) {
    const {t} = useTranslation();
    return (
        <footer>
            <div className="footer">
                <div className="footertext">
                    <div className='footerside'>
                        <h5>{t("copyright")} 6Anime<span>&#169;</span> 2024</h5>
                        <h5><a href="/tos">{t("termsofservice")}</a></h5>
                        <h5><a href="/disclaimer">{t("disclaimer")}</a></h5>
                    </div>
                    <h5>{t("disclaimertxt")}</h5>
                </div>
            </div>
        </footer>
    );
}