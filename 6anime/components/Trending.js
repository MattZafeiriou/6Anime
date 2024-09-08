import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function Trending({ id, data, title, link, featured = 2 }) {
    const { t } = useTranslation();
    let offset = 0;
    let startX = 0;
    let dragging = false;

    let state = {
        firstCard: 1,
        lastCard: 20 - featured,
        maxCards: 20 - featured,
    };
    function startDragging(event) {
        if (dragging) return;
        startX = event.clientX + offset;
        dragging = true;
        document.getElementsByClassName('trending_cards')[id].style.pointerEvents = 'none';
        document.getElementsByClassName('trending_list')[id].classList.remove('fullyLeft');
        document.getElementsByClassName('trending_list')[id].classList.remove('fullyRight');
        document.getElementsByClassName('trending_list')[id].style.transform = '';
        event.preventDefault();
    }

    function Card(props) {
        return (
            <div id={props.id} className='trending_card'>
                <div className="trending_card_img">
                    <a id="button" href={props.href}>
                        <div className="trending_card_play_button">
                            <i className="fa-solid fa-play"></i>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                        }} className="trending_card_addtolist">
                            <h3>{t('add_to_list')}</h3>
                        </button>
                        <img id="img" loading="lazy" src={props.img} alt='anime poster' />
                    </a>
                </div>
                <div className='trending_card_info'>
                    <h3><a href={props.href} id="title">{props.title}</a></h3>
                    <p><span id="year">{props.year}</span> <span>&#183;</span> <span id="card_episodes">{props.episodes}</span> {t('episodes')}</p>
                </div>
            </div>
        );
    }

    function FeaturedCard(props) {
        return (
            <div className="featuredtrending_card">
                <div className="featuredtrending_card_img">
                    <a id="button" href={props.href}>
                        <img id="img" loading="lazy" src={props.img} alt='anime poster' />
                    </a>
                </div>
                <div className='featuredtrending_card_info'>
                    <h2>{props.title}</h2>
                    <p id="info"><span>{props.year}</span> <span>&#183;</span> <span>{props.episodes} {t('episodes')}</span></p>
                    <p>{props.desc}</p>
                    <div style={{marginBottom:"2em"}}></div>
                    <a href={props.href} className="featuredtrending_card_watch_button"><i class="fa-solid fa-play"></i>{t('watch_now').toUpperCase()}</a>
                </div>
            </div>
        )
    }

    function stopDragging(event) {
        if (!dragging) return;
        dragging = false;
        offset = startX - event.clientX;
        document.getElementsByClassName('trending_cards')[id].style.pointerEvents = '';

        if (offset < 0) {
            offset = 0;
            document.getElementsByClassName('trending_list')[id].classList.add('fullyLeft');
        }
        const lastCard = document.getElementById('card1');
        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
        const divWidth = window.innerWidth * .9; // 90% of window width
        const bruh = divWidth / cardWidth;

        const max = cardWidth * (state.maxCards - bruh) - 16; // 16px margin
        if (offset > max) {
            offset = max;
            document.getElementsByClassName('trending_list')[id].classList.add('fullyRight');
            document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + offset + 'px)';
        }
        event.preventDefault();
    }

    useEffect(() => {
        //setPopularAnime();
        // Add event listener for mouse move
        document.body.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            let diff = startX - x;

            if (dragging) {
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;

                const bar = document.getElementsByClassName('trending_range')[id];

                const max = cardWidth * (state.maxCards - bruh);

                const currentPercentage = (diff / max) * 100;
                bar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;

                if (diff < max && diff > 0)
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
                else if (diff >= max) {
                    const a = 300;
                    diff = max + a * Math.atan((diff - max) / a); // Smooth transition i made it myself and didnt steal this code for once :)
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
                } else {
                    const a = 300;
                    diff = a * Math.atan(-diff / a); // Smooth transition i made it myself and didnt steal this code for once :)
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(' + diff + 'px)';
                }
            }
        });

        document.body.addEventListener('mouseup', (event) => {
            if (dragging) {
                stopDragging(event);
            }
        });

        document.body.addEventListener('mouseleave', (event) => {
            if (dragging) {
                stopDragging(event);
            }
        });

        // mobile support
        const list = document.getElementsByClassName('trending_list')[id];

        list.addEventListener('touchmove', (event) => {
            const x = event.targetTouches[0].pageX;
            if (!dragging) {
                startX = x + offset;
                dragging = true;
                document.getElementsByClassName('trending_list')[id].classList.remove('fullyLeft');
                document.getElementsByClassName('trending_list')[id].classList.remove('fullyRight');
                document.getElementsByClassName('trending_list')[id].style.transform = '';
            }
            let diff = startX - x;

            const lastCard = document.getElementById('card1');
            const cardWidth = lastCard.offsetWidth + 16; // 16px margin
            const divWidth = window.innerWidth * .9; // 90% of window width
            const bruh = divWidth / cardWidth;

            const bar = document.getElementsByClassName('trending_range')[id];

            const max = cardWidth * (state.maxCards - bruh) - 10;

            const currentPercentage = (diff / max) * 100;
            bar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;

            if (diff < max && diff > 0)
                document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
            else if (diff >= max) {
                const a = 200;
                diff = max + a * Math.atan((diff - max) / a); // Smooth transition i made it myself and didnt steal this code for once :)
                document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
            } else {
                const a = 200;
                diff = a * Math.atan(-diff / a); // Smooth transition i made it myself and didnt steal this code for once :)
                document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(' + diff + 'px)';
            }

            if ((diff - offset) > 10)
                event.preventDefault();
        }, { passive: false });

        list.addEventListener('touchend', (event) => {
            if (dragging) {
                const x = event.changedTouches[0].pageX;
                dragging = false;
                offset = startX - x;

                if (offset < 0) {
                    offset = 0;
                    document.getElementsByClassName('trending_list')[id].classList.add('fullyLeft');
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(' + 0 + 'px)';
                }
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 10; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;

                const max = cardWidth * (state.maxCards - bruh) - 10; // 16px margin
                if (offset > max) {
                    offset = max;
                    document.getElementsByClassName('trending_list')[id].classList.add('fullyRight');
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + offset + 'px)';
                }
            }
        });
    }, []);

    return (
        <>
            <div className='trending_page'>
                <div className='trending_header'>
                    <h2>{title}</h2>
                    <a href={link}>{t('view_all')} <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="trending_bar">
                    <input type="range" min="0" max="500" value="0" className="trending_range" readOnly id="trending_range" />
                </div>
                <div className='trending_list' draggable="true" onDragStart={startDragging} onMouseUp={stopDragging} onDragEnd={stopDragging}>
                    <div className='trending_cards'>
                        {
                            data.slice(state.firstCard - 1 + featured, state.maxCards + featured).map((item, index) => {
                                return (
                                    <Card id={"card" + (index)} img={item.imgUrl} href={item.vlink} title={item.vname} year={item.year} time={item.duration} tag1={item.tag1} tag2={item.tag2} episodes={item.vep} />
                                );
                            })
                        }
                    </div>
                </div>

                <div className="featuredtrending">
                    {
                        data.slice(state.firstCard - 1, featured).map((item, index) => {
                            return (
                                <FeaturedCard id={"card" + (index)} desc={item.description} img={item.banner} href={item.vlink} title={item.vname} year={item.year} time={item.duration} tag1={item.tag1} tag2={item.tag2} episodes={item.vep} />
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}