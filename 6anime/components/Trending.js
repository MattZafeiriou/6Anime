import { useEffect } from "react";
import {createRoot} from 'react-dom/client';

export default function Trending({ id, data, title, link }) {
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
                            //alert("Im gonna touch you lil nigga");
                        }} className="trending_card_addtolist">
                            <h3>Add to my list</h3>
                        </button>
                        <img id="img" src={props.img} alt='anime poster'/>
                    </a>
                </div>
                <div className='trending_card_info'>
                    <h3><a href={props.href} id="title">{props.title}</a></h3>
                    <p><span id="year">{props.year}</span> <span>&#183;</span> <span id="time">{props.time}</span> <span>&#183;</span> <span id="card_episodes">{props.episodes}</span> episodes</p>
                    <p><span id="tag1">{props.tag1}</span> <span>&#183;</span> <span id="tag2">{props.tag2}</span></p>
                </div>
            </div>
        );
    }

    function stopDragging(event) {
        if (!dragging) return;
        dragging = false;
        offset = startX - event.clientX;
        document.getElementsByClassName('trending_cards')[id].style.pointerEvents = '';

        if (offset < 0)
        {
            offset = 0;
            document.getElementsByClassName('trending_list')[id].classList.add('fullyLeft');
        }
        const lastCard = document.getElementById('card1');
        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
        const divWidth = window.innerWidth * .9; // 90% of window width
        const bruh = divWidth / cardWidth;

        const max = cardWidth * (state.maxCards - bruh) - 16; // 16px margin
        if (offset > max)
        {
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

            if (dragging)
            {
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;

                const max = cardWidth * (state.maxCards - bruh);
                if (diff < max && diff > 0)
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
                else if (diff >= max)
                {
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
        const list = document.getElementsByClassName('trending_list')[id];

        list.addEventListener('touchmove', (event) => {
            const x = event.targetTouches[0].pageX;
            if (!dragging)
            {
                if (window.innerWidth < 800) return;

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

            const max = cardWidth * (state.maxCards - bruh);
            if (diff < max && diff > 0)
                document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + diff + 'px)';
            else if (diff >= max)
            {
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
            if (dragging)
            {
                const x = event.changedTouches[0].pageX;
                dragging = false;
                offset = startX - x;
        
                if (offset < 0)
                {
                    offset = 0;
                    document.getElementsByClassName('trending_list')[id].classList.add('fullyLeft');
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(' + 0 + 'px)';
                }
                const lastCard = document.getElementById('card1');
                const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                const divWidth = window.innerWidth * .9; // 90% of window width
                const bruh = divWidth / cardWidth;
        
                const max = cardWidth * (state.maxCards - bruh) - 16; // 16px margin
                if (offset > max)
                {
                    offset = max;
                    document.getElementsByClassName('trending_list')[id].classList.add('fullyRight');
                    document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + offset + 'px)';
                }
            }
        });
    }, []);

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
        <div className='trending_page'>
            <div className='trending_header'>
                <h1>{title}</h1>
                <a href={link}>View all <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className='trending_list' draggable="true" onDragStart={startDragging} onMouseUp={stopDragging} onDragEnd={stopDragging}>
                <div className='trending_cards'>
                <Card id={"card1"} img={data[0].imgUrl} href={data[0].vlink} title={data[0].vname} year={data[0].year} time={data[0].duration + " mins/ep"} tag1={data[0].tag1} tag2={data[0].tag2} episodes={data[0].vep}/>
                <Card id={"card2"} img={data[1].imgUrl} href={data[1].vlink} title={data[1].vname} year={data[1].year} time={data[1].duration + " mins/ep"} tag1={data[1].tag1} tag2={data[1].tag2} episodes={data[1].vep}/>
                <Card id={"card3"} img={data[2].imgUrl} href={data[2].vlink} title={data[2].vname} year={data[2].year} time={data[2].duration + " mins/ep"} tag1={data[2].tag1} tag2={data[2].tag2} episodes={data[2].vep}/>
                <Card id={"card4"} img={data[3].imgUrl} href={data[3].vlink} title={data[3].vname} year={data[3].year} time={data[3].duration + " mins/ep"} tag1={data[3].tag1} tag2={data[3].tag2} episodes={data[3].vep}/>
                <Card id={"card5"} img={data[4].imgUrl} href={data[4].vlink} title={data[4].vname} year={data[4].year} time={data[4].duration + " mins/ep"} tag1={data[4].tag1} tag2={data[4].tag2} episodes={data[4].vep}/>
                <Card id={"card6"} img={data[5].imgUrl} href={data[5].vlink} title={data[5].vname} year={data[5].year} time={data[5].duration + " mins/ep"} tag1={data[5].tag1} tag2={data[5].tag2} episodes={data[5].vep}/>
                <Card id={"card7"} img={data[6].imgUrl} href={data[6].vlink} title={data[6].vname} year={data[6].year} time={data[6].duration + " mins/ep"} tag1={data[6].tag1} tag2={data[6].tag2} episodes={data[6].vep}/>
                <Card id={"card8"} img={data[7].imgUrl} href={data[7].vlink} title={data[7].vname} year={data[7].year} time={data[7].duration + " mins/ep"} tag1={data[7].tag1} tag2={data[7].tag2} episodes={data[7].vep}/>
                <Card id={"card9"} img={data[8].imgUrl} href={data[8].vlink} title={data[8].vname} year={data[8].year} time={data[8].duration + " mins/ep"} tag1={data[8].tag1} tag2={data[8].tag2} episodes={data[8].vep}/>
                <Card id={"card10"} img={data[9].imgUrl} href={data[9].vlink} title={data[9].vname} year={data[9].year} time={data[9].duration + " mins/ep"} tag1={data[9].tag1} tag2={data[9].tag2} episodes={data[9].vep}/>
                </div>
            </div>
                    <a onClick={() => {
                        const lastCard = document.getElementById('card1');
                        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                        const previous = Math.ceil(offset / cardWidth - 1); // get previous card number (eg 3 cards)
                        if (previous < 0) return;
                        document.getElementsByClassName('trending_list')[id].classList.remove('fullyLeft');
                        document.getElementsByClassName('trending_list')[id].classList.remove('fullyRight');
                        const difference = previous - (offset / cardWidth); // how much of the next card is visible (eg 0.5 cards)

                        let card = document.getElementById('card' + (previous + 1));
                        if (card == null) return;

                        document.getElementsByClassName('trending_list')[id].style.transition = '.3s';
                        document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + (offset + difference * cardWidth) + 'px)';
                        offset += difference * cardWidth;
                        setTimeout(()=> {
                            document.getElementsByClassName('trending_list')[id].style.transition = '';
                        }
                        ,300);
                    }}
                    >
                        <div className='trending_back'>
                            <i className="fa-solid fa-less-than"></i>
                        </div>
                    </a>
                    <a onClick={() => {
                        document.getElementsByClassName('trending_list')[id].classList.remove('fullyLeft');
                        document.getElementsByClassName('trending_list')[id].classList.remove('fullyRight');
                        const lastCard = document.getElementById('card1');
                        const cardWidth = lastCard.offsetWidth + 16; // 16px margin
                        const divWidth = window.innerWidth * .9; // 90% of window width
                        const bruh = divWidth / cardWidth; // how many cards fit inside the div (eg 2.5 cards)
                        const next = Math.ceil(bruh + Math.ceil(offset / cardWidth)); // get next card number (eg 3 cards)
                        const difference = next - (bruh + offset / cardWidth); // how much of the next card is visible (eg 0.5 cards)
                        let card = document.getElementById('card' + next);
                        if (card == null) return;

                        document.getElementsByClassName('trending_list')[id].style.transition = '.3s';
                        document.getElementsByClassName('trending_list')[id].style.transform = 'translateX(-' + (offset + difference * cardWidth) + 'px)';
                        offset += difference * cardWidth;
                        setTimeout(()=> {
                            document.getElementsByClassName('trending_list')[id].style.transition = '';
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