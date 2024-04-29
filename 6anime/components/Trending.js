import { useEffect } from "react";
import {createRoot} from 'react-dom/client';

export default function Trending({ data }) {
    let offset = 0;
    let startX = 0;
    let dragging = false;
    let state = {
        firstCard: 1,
        lastCard: 10,
        maxCards: 10,
    };
    function startDragging(event) {
        if (window.innerWidth < 800) return;
        if (dragging) return;
        startX = event.clientX + offset;
        dragging = true;
        document.getElementsByClassName('trending_cards')[0].style.pointerEvents = 'none';
        document.getElementsByClassName('trending_list')[0].classList.remove('fullyLeft');
        document.getElementsByClassName('trending_list')[0].classList.remove('fullyRight');
        document.getElementsByClassName('trending_list')[0].style.transform = '';
        event.preventDefault();
    }

    function Card(props) {
        return (
            <div id={props.id} className='trending_card'>
                <div className="trending_card_img">
                    <a href={props.href}>
                        <div className="trending_card_play_button">
                            <i className="fa-solid fa-play"></i>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            //alert("Im gonna touch you lil nigga");
                        }} className="trending_card_addtolist">
                            <h3>Add to my list</h3>
                        </button>
                        <img src={props.img} alt='anime poster'/>
                    </a>
                </div>
                <div className='trending_card_info'>
                    <h3><a href={props.href}>{props.title}</a></h3>
                    <p>{props.year} <span>&#183;</span> {props.time} <span>&#183;</span> {props.episodes} episodes</p>
                    <p>{props.tag1} <span>&#183;</span> {props.tag2}</p>
                </div>
            </div>
        );
    }

    function stopDragging(event) {
        if (!dragging) return;
        dragging = false;
        offset = startX - event.clientX;
        document.getElementsByClassName('trending_cards')[0].style.pointerEvents = '';

        if (offset < 0)
        {
            offset = 0;
            document.getElementsByClassName('trending_list')[0].classList.add('fullyLeft');
        }
        const lastCard = document.getElementById('card1');
        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
        const divWidth = window.innerWidth * .9; // 90% of window width
        const bruh = divWidth / cardWidth;

        const max = cardWidth * (state.maxCards - bruh) - 16; // 16px margin
        if (offset > max)
        {
            offset = max;
            document.getElementsByClassName('trending_list')[0].classList.add('fullyRight');
            document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + offset + 'px)';
        }
        event.preventDefault();
    }

    function setPopularAnime()
    {
        const url = "/getpopular/?max=10"; // returns an array of 10 most popular anime folder_names
        fetch(process.env.NEXT_PUBLIC_API_URL + url)
        .then(res => res.text())
        .then(data => {
            const _info = JSON.parse(data);
            state.maxCards = _info.length;
            setPopularAnimeTitle(_info, 1);
        });
    }

    function setPopularAnimeTitle(props, cardNo)
    {
        if (Object.keys(props).length === 0)
        {
            let lastCard = document.getElementById('card1');
            let cardWidth = lastCard.offsetWidth + 16; // 16px margin
            let listWidth = window.innerWidth * .9; // 90% of window width
            let bruh = listWidth / cardWidth;
            let next = Math.ceil(bruh);
            state.lastCard = next;
            return;
        }

        const url = "/getvideo/?id=" + props[0];
        fetch(process.env.NEXT_PUBLIC_API_URL + url)
        .then(res => res.text())
        .then(data => {
            const info = JSON.parse(data);
            const id = info.id;
            const imgUrl = info.poster;
            const vname = info.name;
            const vep = info.episodes;
            const premiered = info.premiered;
            const duration = info.duration;
            const genre = info.genre;
            const tag1 = genre[0];
            const tag2 = genre[1];
            const year = premiered.split('-')[0];
            const vlink = "/watch/" + info.folder_name + "-" + id;
            fetch(process.env.NEXT_PUBLIC_API_URL + "/getviews/?id=" + props[0])
            .then(res => res.text())
            .then(res => {
                const views = parseInt(res);
                const raDiv = document.getElementsByClassName('trending_cards')[0];
                const newDiv = document.createElement('div');
                raDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<Card href={vlink} id={"card" + cardNo} year={year} time={duration + " mins/ep"} tag1={tag1} tag2={tag2} img={imgUrl} title={vname} episodes={vep}/>)

                // Remove first element from array
                props.shift();
                // Call function again
                setPopularAnimeTitle(props, cardNo + 1);
            });
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }

    useEffect(() => {
        setPopularAnime();
        // Add event listener for mouse move
        document.body.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            let diff = startX - x;

            if (dragging)
            {
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;

                const max = cardWidth * (state.maxCards - bruh);
                if (diff < max && diff > 0)
                    document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + diff + 'px)';
                else if (diff >= max)
                {
                    const a = 300;
                    diff = max + a * Math.atan((diff - max) / a); // Smooth transition i made it myself and didnt steal this code for once :)
                    document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + diff + 'px)';
                } else {
                    const a = 300;
                    diff = a * Math.atan(-diff / a); // Smooth transition i made it myself and didnt steal this code for once :)
                    document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(' + diff + 'px)';
                }
            }
        });

        document.body.addEventListener('mouseup', (event) => {
            if (dragging)
            {
                stopDragging(event);
            }
        });

        document.body.addEventListener('mouseleave', (event) => {
            if (dragging)
            {
                stopDragging(event);
            }
        });

        // mobile support
        const list = document.getElementsByClassName('trending_list')[0];

        list.addEventListener('touchmove', (event) => {
            const x = event.targetTouches[0].pageX;
            if (!dragging)
            {
                if (window.innerWidth < 800) return;

                startX = x + offset;
                dragging = true;
                document.getElementsByClassName('trending_list')[0].classList.remove('fullyLeft');
                document.getElementsByClassName('trending_list')[0].classList.remove('fullyRight');
                document.getElementsByClassName('trending_list')[0].style.transform = '';
            }
            let diff = startX - x;

            const lastCard = document.getElementById('card1');
            const cardWidth = lastCard.offsetWidth + 16; // 16px margin
            const divWidth = window.innerWidth * .9; // 90% of window width
            const bruh = divWidth / cardWidth;

            const max = cardWidth * (state.maxCards - bruh);
            if (diff < max && diff > 0)
                document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + diff + 'px)';
            else if (diff >= max)
            {
                const a = 200;
                diff = max + a * Math.atan((diff - max) / a); // Smooth transition i made it myself and didnt steal this code for once :)
                document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + diff + 'px)';
            } else {
                const a = 200;
                diff = a * Math.atan(-diff / a); // Smooth transition i made it myself and didnt steal this code for once :)
                document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(' + diff + 'px)';
            }

            if ((diff - offset) > 10)
                event.preventDefault();
        }, { passive: false });

        list.addEventListener('touchend', (event) => {
            if (dragging)
            {
                const x = event.changedTouches[0].pageX;
                dragging = false;
                offset = startX - x;
        
                if (offset < 0)
                {
                    offset = 0;
                    document.getElementsByClassName('trending_list')[0].classList.add('fullyLeft');
                    document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(' + 0 + 'px)';
                }
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;
        
                const max = cardWidth * (state.maxCards - bruh) - 16; // 16px margin
                if (offset > max)
                {
                    offset = max;
                    document.getElementsByClassName('trending_list')[0].classList.add('fullyRight');
                    document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + offset + 'px)';
                }
            }
        });
    }, []);

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
        <div className='trending_page'>
            <div className='trending_header'>
                <h1>Trending Anime</h1>
                <a href='/trending'>View all <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className='trending_list' draggable="true" onDragStart={startDragging} onMouseUp={stopDragging} onDragEnd={stopDragging}>
                <div className='trending_cards'>
                </div>
            </div>
                    <a onClick={() => {
                        const lastCard = document.getElementById('card1');
                        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                        const previous = Math.ceil(offset / cardWidth - 1); // get previous card number (eg 3 cards)
                        if (previous < 0) return;
                        document.getElementsByClassName('trending_list')[0].classList.remove('fullyLeft');
                        document.getElementsByClassName('trending_list')[0].classList.remove('fullyRight');
                        const difference = previous - (offset / cardWidth); // how much of the next card is visible (eg 0.5 cards)

                        let card = document.getElementById('card' + (previous + 1));
                        if (card == null) return;

                        document.getElementsByClassName('trending_list')[0].style.transition = '.3s';
                        document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + (offset + difference * cardWidth) + 'px)';
                        offset += difference * cardWidth;
                        setTimeout(()=> {
                            document.getElementsByClassName('trending_list')[0].style.transition = '';
                        }
                        ,300);
                    }}
                    >
                        <div className='trending_back'>
                            <i className="fa-solid fa-less-than"></i>
                        </div>
                    </a>
                    <a onClick={() => {
                        document.getElementsByClassName('trending_list')[0].classList.remove('fullyLeft');
                        document.getElementsByClassName('trending_list')[0].classList.remove('fullyRight');
                        const lastCard = document.getElementById('card1');
                        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                        const divWidth = window.innerWidth * .9; // 90% of window width
                        const bruh = divWidth / cardWidth; // how many cards fit inside the div (eg 2.5 cards)
                        const next = Math.ceil(bruh + Math.ceil(offset / cardWidth)); // get next card number (eg 3 cards)
                        const difference = next - (bruh + offset / cardWidth); // how much of the next card is visible (eg 0.5 cards)
                        let card = document.getElementById('card' + next);
                        if (card == null) return;

                        document.getElementsByClassName('trending_list')[0].style.transition = '.3s';
                        document.getElementsByClassName('trending_list')[0].style.transform = 'translateX(-' + (offset + difference * cardWidth) + 'px)';
                        offset += difference * cardWidth;
                        setTimeout(()=> {
                            document.getElementsByClassName('trending_list')[0].style.transition = '';
                        }
                        ,300);
                    }} 
                    >
                        <div className='trending_next'>
                            <i className="fa-solid fa-greater-than"></i>
                        </div>
                    </a>
        </div>
        </>
    );
}