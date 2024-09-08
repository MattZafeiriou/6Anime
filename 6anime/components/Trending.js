import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function Trending({ id, data, title, link }) {
    const { t } = useTranslation();
    let offset = 0;
    let startX = 0;
    let dragging = false;
    let state = {
        firstCard: 1,
        lastCard: 20,
        maxCards: 20,
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

                bar.value = (diff / max) * 500;

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

            const max = cardWidth * (state.maxCards - bruh);

            bar.value = (diff / max) * 500;
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
                        {/* add for loop for card1 to card10 */}

                        {
                            data.slice(1, 21).map((item, index) => {
                                return (
                                    <Card key={index} id={"card" + (index)} img={item.imgUrl} href={item.vlink} title={item.vname} year={item.year} time={item.duration} tag1={item.tag1} tag2={item.tag2} episodes={item.vep} />
                                );
                            })
                        }

                        <Card id={"card1"} img={data[0].imgUrl} href={data[0].vlink} title={data[0].vname} year={data[0].year} time={data[0].duration} tag1={data[0].tag1} tag2={data[0].tag2} episodes={data[0].vep} />
                    </div>
                </div>
            </div>
        </>
    );
}