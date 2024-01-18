import React from 'react';
import './AnimeList.css'
import {createRoot} from 'react-dom/client';

class AnimeList extends React.Component {

    constructor(proms)
    {
        super(proms);
        this.filters = {
        };
        this.startOptions = proms.startOptions === undefined ? "" : proms.startOptions;
        const url = window.location.href;
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const genre = urlParams.get('genre');
        this.startOptions = genre === null ? this.startOptions : decodeURI(genre);
        this.startInput = (proms.startInput === undefined || proms.startInput === "null") ? "" : proms.startInput;
        this.setCheck = [];
        this.addFilter = this.addFilter.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.addRadio = this.addRadio.bind(this);
        this.filter = this.filter.bind(this);
        this.search = this.search.bind(this);
    }

    search()
    {
        this.deleteAllAnime();
        const filters = this.filters;
        
        const genre = (filters["Genre"] === undefined || filters["Genre"] === "") ? "" : "&genre=" + encodeURIComponent(filters["Genre"]);
        const country = (filters["Country"] === undefined || filters["Country"] === "") ? "" : "&country=" + encodeURIComponent(filters["Country"]);
        const season = (filters["Season"] === undefined || filters["Season"] === "") ? "" : "&season=" + encodeURIComponent(filters["Season"]);
        const year = (filters["Year"] === undefined || filters["Year"] === "") ? "" : "&year=" + encodeURIComponent(filters["Year"]);
        const type = (filters["Type"] === undefined || filters["Type"] === "") ? "" : "&type=" + encodeURIComponent(filters["Type"]);
        const status = (filters["Status"] === undefined || filters["Status"] === "") ? "" : "&status=" + encodeURIComponent(filters["Status"]);
        const language = (filters["Language"] === undefined || filters["Language"] === "") ? "" : "&language=" + encodeURIComponent(filters["Language"]);
        const sort = (filters["Sort"] === undefined || filters["Sort"] === "") ? "" : "&sort=" + encodeURIComponent(filters["Sort"]);
        const search = "&chars=" + encodeURIComponent(document.querySelector('.anime-list-header-search input').value);

        let url = genre + country + season + year + type + status + language + sort + search;
        url = url.replace("&", "?");
        url = "search" + url;
        
        fetch("http://localhost:9000/" + url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                this.addAnime(element)
            });
        })
    }

    deleteAllAnime()
    {
        const raDiv = document.getElementsByClassName('anime-list-container')[0];
        while (raDiv.firstChild) {
            raDiv.removeChild(raDiv.firstChild);
        }
    }

    addAnime(folder_name)
    {
        const id = folder_name.split("-")[folder_name.split("-").length - 1];
        const raDiv = document.getElementsByClassName('anime-list-container')[0];
        const newDiv = document.createElement('div');
        raDiv.appendChild(newDiv);
        // Render the component into the new div
        const root = createRoot(newDiv);
        root.render(
            <div className='anime-list-item'>
                <a href={"/watch/" + folder_name}>
                    <img id={'anime-list-item-img-' + id} src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952nax7rrdq9hygozntkwjelge6fizv2gunp4r3xgoj&ep=v1_gifs_search&rid=200w.gif&ct=g'/>
                    <h3 id={'anime-list-item-name-' + id}></h3>
                </a>
            </div>
        )

        // get the folder name
        fetch("http://localhost:9000/get_video?name=" + id)
        .then(res => res.text())
        .then(data => {
            const anime = JSON.parse(data);
            const img = document.querySelector('#anime-list-item-img-' + id);
            img.src = anime.poster;
            const name = document.querySelector('#anime-list-item-name-' + id);
            name.innerHTML = anime.name;
        })

    }

    componentDidMount()
    {
        this.setCheck.forEach(element => {
            const el = element.split(" ")[0];
            document.querySelector('#' + el).checked = true;
            const button = document.querySelector('#' + element.split(" ")[1] + '_text');
            const name = el.split("-")[element.split("-").length - 1].replaceAll("-", " ");
            button.innerHTML = name;
        });

        const start = this.startOptions.split(",");
        start.forEach(element => {
            document.querySelector('#anime-list-filter-item-' + element.replaceAll(' ', '-')).click();
        });

        if (this.startInput !== undefined)
        {
            document.querySelector('#searchanimeinput').value = this.startInput;
        }

        document.getElementById("searchanimeinput").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("searchanimebutton").click();
            }
        });
    }

    addRadio(id, checked, buttonid)
    {
        if (checked)this.setCheck.push(id + " " + buttonid);
        return "radio";
    }

    setFilter(name, id, value)
    {
        const button = document.querySelector('#' + id + '_text');

        let filters = this.filters;
        filters[name] = value;

        this.filters = filters;
        button.innerHTML = filters[name];
    }

    addFilter(name, id, value)
    {
        const button = document.querySelector('#' + id + '_text');

        let filters = this.filters;
        if (filters[name] === undefined || filters[name] === "")
            filters[name] = value;
        else 
            filters[name] += "," + value;
        this.filters = filters;
        const filter = this.filters[name].split(',');

        if (filter.length == 1)
        {
            button.innerHTML = filter[0];
        } else
        {
            button.innerHTML = filter.length + ' selected';
        }
    }

    removeFilter(name, id, value)
    {
        const button = document.querySelector('#' + id + '_text');

        let filters = this.filters;
        if (filters[name] === undefined)
            filters[name] = "";
        else 
            filters[name] = filters[name].split(',').filter(genre => genre !== value).join(',');
        this.filters = filters;
        const filter = this.filters[name].split(',');
        if (filters[name].length == 0)
        {
            button.innerHTML = "All";
        } else if (filter.length == 1)
        {
            button.innerHTML = filter[0];
        } else
        {
            button.innerHTML = filter.length + ' selected';
        }
    }

    filter(proms)
    {
        const items = proms.options.split(',');
        // toggle off when clicked outside
        document.addEventListener('click', function(e) {
            const animeListFilterItem = document.querySelector("#" + proms.id);
            if (e.target.id !== proms.id + "_button" && e.target.id !== proms.id && !animeListFilterItem.contains(e.target)) {
                animeListFilterItem.classList.remove('anime-list-filter-item-active');
            }
        });

        const rows = (100 / proms.rows) + "%";
        const maxWidth = (proms.maxWidth) ? proms.maxWidth : "0";
        return(
        <>
            <div className='anime-list-filter'>
                <button id={proms.id + "_button"} onClick={() => {
                    document.querySelector("#" + proms.id).classList.toggle('anime-list-filter-item-active');
                }}>
                    <span>{proms.name}</span> <b id={proms.id + "_text"}>All</b> <i className="fa fa-angle-down" aria-hidden="true"></i>
                </button>
                <div style={{maxWidth: maxWidth}} className='anime-list-filter-item' id={proms.id}>
                    {items.map((option) => {
                        return(
                            <div style={{width: rows}} className='anime-list-filter-item-option'>
                                <input onClick={() => {
                                    const checkbox = document.querySelector('#anime-list-filter-item-' + option.replaceAll(' ', '-'));
                                    if (proms.radio)
                                    {
                                        if (checkbox.checked) {
                                            this.setFilter(proms.name, proms.id, option);
                                        } else {
                                            this.setFilter(proms.name, proms.id, option);
                                        }
                                    } else
                                    {
                                        if (checkbox.checked) {
                                            this.addFilter(proms.name, proms.id, option);
                                        } else {
                                            this.removeFilter(proms.name, proms.id, option);
                                        }
                                    }
                                }} type={proms.radio ? this.addRadio('anime-list-filter-item-' + option.replaceAll(' ', '-'), option == proms.selected, proms.id) : 'checkbox'} id={'anime-list-filter-item-' + option.replaceAll(' ', '-')} name={'anime-list-filter-item-' + proms.name} value={'anime-list-filter-item-' + option}/>
                                <label htmlFor={'anime-list-filter-item-' + option.replaceAll(' ', '-')}>{option}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
        );
    }

    render() {
        return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className='anime-list'>
                <div className='anime-list-header'>
                    <div className='anime-list-header-filters'>
                        <this.filter name="Genre" rows="3" maxWidth="500px" id="genrefilter" options="Action,Adventure,Cars,Comedy,Dementia,Demons,Drama,Ecchi,Fantasy,Game,Harem,Historical,Horror,Isekai,Josei,Kids,Magic,Martial Arts,Mecha,Military,Music,Mystery,Parody,Police,Psychological,Romance,Samurai,School,Sci-Fi,Seinen,Shoujo,Shoujo Ai,Shounen,Shounen Ai,Slice of Life,Space,Sports,Super Power,Supernatural,Thriller,Vampire"/>
                        <this.filter name="Country" rows="1" id="countryfilter" options=""/>
                        <this.filter name="Season" rows="1" id="seasonfilter" options="Spring,Summer,Autumn,Winter"/>
                        <this.filter name="Year" rows="4" maxWidth="350px" id="yearfilter" options="2024,2023,2022,2021,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001"/>
                        <this.filter name="Type" rows="1" id="typefilter" options="Movie,Series"/>
                        <this.filter name="Status" selected="All" radio rows="1" id="statusfilter" options="All"/>
                        <this.filter name="Language" rows="1" id="languagefilter" options="Subbed,Dubbed"/>
                        <this.filter name="Sort" selected="Default" radio rows="1" id="sortfilter" options="Default,Recently Updated,Recently Added,Name A-Z,Most Watched,Score,Release Date"/>
                    </div>
                    <div className='anime-list-header-search'>
                        <input id="searchanimeinput" type='text' placeholder='Search...'/>
                        <button id="searchanimebutton" type='submit' onClick={this.search}><i className="fa fa-search" aria-hidden="true"></i> Filter</button>
                    </div>
                </div>
                <div className='anime-list-container'>
                </div>
            </div>
        </>
    );
    };
}
export default AnimeList;