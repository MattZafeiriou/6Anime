import { React, useEffect } from 'react';
import { Carousel, Image, Placeholder } from 'react-bootstrap';
import Sponsored from '../components/Sponsored';
import Trending from '../components/Trending';
import RandomVideo from '../components/RandomVideo';
import Head from 'next/head'
import repeatTasks from '../lib/repeatTasks';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Tag(props) {
  return (
    <div className='main_anime_tag'>
      <a href={"/search?genre=" + props.name}>
        <p>{props.name}</p>
      </a>
    </div>
  );
}

function WatchButton(props) {
  const { t } = useTranslation();

  return (
    <a href={props.href} className='watch_button'>{t('watch_now').toUpperCase()}</a>
  );
}

function CarouselImg(props) {
  return (
    <>
      <Image id="top_img" loading='lazy' src={props.srcImg} alt="Carousel Image" fluid />
      <Carousel.Caption>
        <div className='carouselCaption'>
          <h2>{props.name}</h2>
          <h3>{props.description}</h3>
          <div className='anime_tags'>
            <Tag name={props.tag1} />
            <Tag name={props.tag2} />
            <Tag name={props.tag3} />
          </div>
          <WatchButton href={props.href} />
        </div>
      </Carousel.Caption>
    </>
  );
}

export default function Page({ data, trendingdata, genredata, moviesdata, seriesdata, tag, latestdata }) {
  useEffect(() => {
    document.getElementById("home").classList.add("active");
    document.getElementById("homem").classList.add("active");
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
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>6Anime - Watch free anime</title>
        <meta property="og:title" content="6Anime - Watch free anime" />
        <meta
          property="og:description"
          content="6Anime: The best 9anime and aniwave alternative. Watch free anime online with competitive streaming and access to any anime you desire."
        />
        <meta name="6a97888e-site-verification" content="9e546de5dabc0ef6e7fe0048a624cd82"/>
        <meta
          name="description"
          content="6Anime: The best 9anime and aniwave alternative. Watch free anime online with competitive streaming and access to any anime you desire."
        />
      </Head>
      <div className='main_page'>
        <h1 style={{ display: 'none' }}>6Anime.tv Main Page</h1>
        <div className='main_page_content'>
          <div className='main_page_fade'></div>
          <div className='main_page_fade2'></div>
          <Carousel className='carouselItems' interval={3000} controls={false} indicators={false}>
            <Carousel.Item>
              <CarouselImg href={carouselItem1.href} tag1={carouselItem1.tag1} tag2={carouselItem1.tag2} tag3={carouselItem1.tag3} srcImg={carouselItem1.srcImg} name={carouselItem1.name} description={carouselItem1.description} />
            </Carousel.Item>
            <Carousel.Item>
              <CarouselImg href={carouselItem2.href} tag1={carouselItem2.tag1} tag2={carouselItem2.tag2} tag3={carouselItem2.tag3} srcImg={carouselItem2.srcImg} name={carouselItem2.name} description={carouselItem2.description} />
            </Carousel.Item>
            <Carousel.Item>
              <CarouselImg href={carouselItem3.href} tag1={carouselItem3.tag1} tag2={carouselItem3.tag2} tag3={carouselItem3.tag3} srcImg={carouselItem3.srcImg} name={carouselItem3.name} description={carouselItem3.description} />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='main_page_fit'>
          <div className='main_page_sponsor'>
            <Sponsored />
          </div>
          <Trending title={t('trending_anime')} link="/trending" id="0" data={trendingdata} featured="1" />
          <Trending title={t('movies')} link="/movies" id="1" data={moviesdata} featured="0" />
          <Trending title={t('series')} link="/series" id="2" data={seriesdata} featured="2" />
          <Trending title={t('latest_releases')} link="/search" id="3" data={latestdata} featured="3" />
          <Trending title={t('genre') + `: ${tag}`} link={`/search?genre=${tag}`} id="4" data={genredata} featured="0" />
          <RandomVideo />
        </div>
        {/* <ins class="eas6a97888e6" data-zoneid="5391318"></ins> */}
      </div>
    </>
  );
}

async function getAnimeInfo(data) {
  let animeInfo = [];
  for (let i = 0; i < data.length; i++) {
    const url = "/getvideo/?id=" + data[i];
    await fetch(process.env.NEXT_PUBLIC_SS_API_URL + url)
      .then(res => res.text())
      .then(async (data) => {
        const info = JSON.parse(data);
        const id = info.id;
        const imgUrl = info.poster;
        const banner = info.banner;
        const vname = info.name;
        const vep = info.episodes;
        const premiered = info.premiered;
        const duration = info.duration;
        const genre = info.genre;
        const tag1 = genre[0];
        const tag2 = genre[1];
        const year = premiered.split('-')[0];
        const vlink = "/watch/" + info.folder_name + "-" + id;
        const description = info.description
        animeInfo.push({
          id: id,
          imgUrl: imgUrl,
          banner: banner,
          vname: vname,
          vep: vep,
          year: year,
          duration: duration,
          tag1: tag1,
          tag2: tag2,
          vlink: vlink,
          description: description
        });
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }
  return animeInfo;
}
let genre = [];
let movies = [];
let series = [];
let latest = [];
let info = [];
let recommendations = [];
const date = new Date();
let lastUpdate = date.getDate();

export async function getServerSideProps(context) {
  const tag = repeatTasks.todayTag;
  if (lastUpdate !== date.getDate()) // Update every day
  {
    genre = [];
    movies = [];
    series = [];
    latest = [];
    info = [];
    recommendations = [];
    lastUpdate = date.getDate();
  }

  if (recommendations.length === 0) {
    const res = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getrecommendations');
    const data = await res.json();
    recommendations = data;
  }

  if (info.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getpopular?max=20');
    const data_ = await res_.json();
    const animeInfo = await getAnimeInfo(data_);
    info = animeInfo;
  }

  if (genre.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/search?genre=' + tag + '&sort=Score&chars=&limit=20');
    const data_ = await res_.json();
    let _data = [];
    for (let i = 0; i < data_.length; i++) {
      _data.push(Number(data_[i].split("-")[data_[i].split("-").length - 1]));
    }
    const animeInfo = await getAnimeInfo(_data);
    genre = animeInfo;
  }

  if (movies.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/search?type=movie&sort=Score&chars=&limit=20');
    const data_ = await res_.json();
    let _data = [];
    for (let i = 0; i < data_.length; i++) {
      _data.push(Number(data_[i].split("-")[data_[i].split("-").length - 1]));
    }
    const animeInfo = await getAnimeInfo(_data);
    movies = animeInfo;
  }

  if (series.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/search?type=series&sort=Score&chars=&limit=20');
    const data_ = await res_.json();
    let _data = [];
    for (let i = 0; i < data_.length; i++) {
      _data.push(Number(data_[i].split("-")[data_[i].split("-").length - 1]));
    }
    const animeInfo = await getAnimeInfo(_data);
    series = animeInfo;
  }

  if (latest.length === 0) {
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/search?sort=Release%20Date&chars=&limit=20');
    const data_ = await res_.json();
    let _data = [];
    for (let i = 0; i < data_.length; i++) {
      _data.push(Number(data_[i].split("-")[data_[i].split("-").length - 1]));
    }
    const animeInfo = await getAnimeInfo(_data);
    latest = animeInfo;
  }

  const languageHandler = require('../lib/languageHandler');

  return {
    props: {
      data: recommendations,
      trendingdata: info,
      genredata: genre,
      moviesdata: movies,
      seriesdata: series,
      tag: tag,
      latestdata: latest,
      ...(await serverSideTranslations(languageHandler.getLanguage(context), ['common'])),
    }
  }
}