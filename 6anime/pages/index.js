import {React, useEffect, useState} from 'react';
import { Carousel, Image, Placeholder } from 'react-bootstrap';
import Sponsored from '../components/Sponsored';
import Trending from '../components/Trending';
import RandomVideo from '../components/RandomVideo';
import Head from 'next/head'

function Tag(props) {
  return (
      <div className='anime_tag'>
          <a href={"/search?genre=" + props.name}>
              <p>{props.name}</p>
          </a>
      </div>
  );
}

function WatchButton(props) {
  return (
      <a href={props.href}><button className='watch_button'>Watch Now!</button></a>
  );
}

function CarouselImg(props) {
  return (
      <>
          <Image id="top_img" src={props.srcImg} fluid/>
          <Carousel.Caption>
              <div className='carouselCaption'>
                  <h1>{props.name}<loading/></h1>
                  <h3>{props.description}<loading/></h3>
                  <div className='anime_tags'>
                      <Tag name={props.tag1}/>
                      <Tag name={props.tag2}/>
                      <Tag name={props.tag3}/>
                  </div>
                  <WatchButton href={props.href}/>
              </div>
          </Carousel.Caption>
      </>
  );
}

export default function Page({ data, trendingdata }) {
  
  useEffect(() => {
    document.title = "6Anime";
    document.getElementById("home").classList.add("active");
  }, []);

  const carouselItem1 = {
    href: "/watch/" + data[1].folder_name,
    tag1: data[1].tags[0],
    tag2: data[1].tags[1],
    tag3: data[1].tags[2],
    srcImg: data[1].img,
    name: data[1].name,
    description: data[1].description
  };
  const carouselItem2 = {
    href: "/watch/" + data[2].folder_name,
    tag1: data[2].tags[0],
    tag2: data[2].tags[1],
    tag3: data[2].tags[2],
    srcImg: data[2].img,
    name: data[2].name,
    description: data[2].description
  };
  const carouselItem3 = {
    href: "/watch/" + data[3].folder_name,
    tag1: data[3].tags[0],
    tag2: data[3].tags[1],
    tag3: data[3].tags[2],
    srcImg: data[3].img,
    name: data[3].name,
    description: data[3].description
  };

  return (
      <>
      <Head>
          <title>6Anime - Watch free anime</title>
      </Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <div className='main_page'>
          <div className='main_page_content'>
              <Carousel className='carouselItems'>
                  <Carousel.Item>
                      <CarouselImg href={carouselItem1.href} tag1={carouselItem1.tag1} tag2={carouselItem1.tag2} tag3={carouselItem1.tag3} srcImg={carouselItem1.srcImg} name={carouselItem1.name} description={carouselItem1.description}/>
                  </Carousel.Item>
                  <Carousel.Item>
                      <CarouselImg href={carouselItem2.href} tag1={carouselItem2.tag1} tag2={carouselItem2.tag2} tag3={carouselItem2.tag3} srcImg={carouselItem2.srcImg} name={carouselItem2.name} description={carouselItem2.description}/>
                  </Carousel.Item>
                  <Carousel.Item>
                      <CarouselImg href={carouselItem3.href} tag1={carouselItem3.tag1} tag2={carouselItem3.tag2} tag3={carouselItem3.tag3} srcImg={carouselItem3.srcImg} name={carouselItem3.name} description={carouselItem3.description}/>
                  </Carousel.Item>
              </Carousel>
          </div>
          
          <div className='main_page_sponsor'>
              <Sponsored/>
          </div>
          <Trending data={trendingdata}/>
          <RandomVideo/>
      </div>
      </>
  );
}

async function getAnimeInfo(data)
{
    let animeInfo = [];
    for (let i = 0; i < data.length; i++)
    {
        const url = "/getvideo/?id=" + data[i];
        await fetch(process.env.NEXT_PUBLIC_SS_API_URL + url)
        .then(res => res.text())
        .then(async (data) => {
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
            animeInfo.push({
                id: id,
                imgUrl: imgUrl,
                vname: vname,
                vep: vep,
                year: year,
                duration: duration,
                tag1: tag1,
                tag2: tag2,
                vlink: vlink
            });
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }
    return animeInfo;
}
let info = [];
let recommendations = [];

export async function getServerSideProps(){
  if (recommendations.length === 0) {
    const res = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getrecommendations');
    const data = await res.json();
    recommendations = data;
  }

  if (info.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getpopular?max=10');
    const data_ = await res_.json();
    const animeInfo = await getAnimeInfo(data_);
    info = animeInfo;
  }
  return {
    props: {
      data: recommendations,
      trendingdata: info
    }
  }
}