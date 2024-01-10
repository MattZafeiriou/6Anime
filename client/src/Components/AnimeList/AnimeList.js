import React from 'react';
import './AnimeList.css'

class AnimeList extends React.Component {

    constructor(proms)
    {
        super(proms);
        this.filters = {
            genre: '',
            country: '',
            season: '',
            year: '',
            type: '',
            status: '',
            language: '',
            sort: ''
        };
        this.setCheck = [];
        this.addFilter = this.addFilter.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.addRadio = this.addRadio.bind(this);
        this.filter = this.filter.bind(this);
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

    filter(props)
    {
        const items = props.options.split(',');
        // toggle off when clicked outside
        document.addEventListener('click', function(e) {
            const animeListFilterItem = document.querySelector("#" + props.id);
            if (e.target.id !== props.id + "_button" && e.target.id !== props.id && !animeListFilterItem.contains(e.target)) {
                animeListFilterItem.classList.remove('anime-list-filter-item-active');
            }
        });

        const rows = (100 / props.rows) + "%";
        const maxWidth = (props.maxWidth) ? props.maxWidth : "0";
        return(
        <>
            <div className='anime-list-filter'>
                <button id={props.id + "_button"} onClick={() => {
                    document.querySelector("#" + props.id).classList.toggle('anime-list-filter-item-active');
                }}>
                    <span>{props.name}</span> <b id={props.id + "_text"}>All</b> <i className="fa fa-angle-down" aria-hidden="true"></i>
                </button>
                <div style={{maxWidth: maxWidth}} className='anime-list-filter-item' id={props.id}>
                    {items.map((option) => {
                        return(
                            <div style={{width: rows}} className='anime-list-filter-item-option'>
                                <input onClick={() => {
                                    const checkbox = document.querySelector('#anime-list-filter-item-' + option.replaceAll(' ', '-'));
                                    if (props.radio)
                                    {
                                        if (checkbox.checked) {
                                            this.setFilter(props.name, props.id, option);
                                        } else {
                                            this.setFilter(props.name, props.id, option);
                                        }
                                    } else
                                    {
                                        if (checkbox.checked) {
                                            this.addFilter(props.name, props.id, option);
                                        } else {
                                            this.removeFilter(props.name, props.id, option);
                                        }
                                    }
                                }} type={props.radio ? this.addRadio('anime-list-filter-item-' + option.replaceAll(' ', '-'), option == props.selected, props.id) : 'checkbox'} id={'anime-list-filter-item-' + option.replaceAll(' ', '-')} name={'anime-list-filter-item-' + props.name} value={'anime-list-filter-item-' + option}/>
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
                        <input type='text' placeholder='Search...'/>
                        <button><i className="fa fa-search" aria-hidden="true"></i> Filter</button>
                    </div>
                </div>
                <div className='anime-list-container'>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 1</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 2</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 3</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 4</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 5</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 6</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 7</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 8</h3>
                    </div>
                </div>
            </div>
        </>
    );
    };
}
export default AnimeList;