import React, {Component, useState} from 'react';
import './Header.css'
import logoImg from '../logo.svg'
import { Image } from 'react-bootstrap';
import { API_URL } from '../Constants';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = { apiResponse: "", foldersnames: [] };

      this.addTopDropdown = this.addTopDropdown.bind(this);
      this.typingTop = this.typingTop.bind(this);
      this.sendSearchTop = this.sendSearchTop.bind(this);
      this.search = this.search.bind(this);
    }
    
    encode_utf8(s) {
        return encodeURIComponent(s);
    }

    toggleTopDropdown(string)
    {
        string = JSON.parse(string);
        var x = document.getElementById("searchingtop").value;
        document.getElementById("topdropdown").innerHTML="";
        if (x==="")
        {
            document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>Enter keywords to search</h5>";
        
        } else {
            for (var i=0; i<string.length; i++) {
                this.getNameTop(string[i]);
            }
            document.getElementById("topdropdown").classList.remove("inactive-dropdown");
            if (string.length === 0)
                document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>No results found</h5>";
        }

    }

    componentDidMount()
    {
        document.getElementById("searchingtop").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("searchButton").click();
            }
        });

        document.body.addEventListener('click', function(e) {
            const content = document.getElementsByClassName("mobile_menu_content")[0];
            const button = document.getElementsByClassName("mobile_menu_button")[0];

            if (content.classList.contains("mobile_menu_content_active") && !content.contains(e.target) && !button.contains(e.target)) {
                content.classList.remove("mobile_menu_content_active");
                button.classList.remove("mobile_menu_button_active");
            }

        });

        window.addEventListener("resize", (event) => {
            const content = document.getElementsByClassName("mobile_menu_content")[0];
            const button = document.getElementsByClassName("mobile_menu_button")[0];

            if (window.innerWidth > 900)
            {
                content.classList.remove("mobile_menu_content_active");
                button.classList.remove("mobile_menu_button_active");
            }
        });
    }


    removeTopDropdown()
    {
        document.getElementById("topdropdown").classList.add("inactive-dropdown");
    }
    
    sendSearchTop(string)
    {
        var url = "/search?chars=" + this.encode_utf8(string);
        var data = "";

        fetch(API_URL + url)
        .then(res => res.text())
        .then(res => {
            data = res;
            this.toggleTopDropdown(data);
        });

    }

    typingTop()
    {
        var x = document.getElementById("searchingtop").value;
        this.sendSearchTop(x);
    }

    addTopDropdown()
    {
        // document.getElementById("searchInput").
        if (document.getElementsByClassName("mobile_menu_button_active")[0] != null)
            this.toggleMenu();

        if (document.getElementById("topdropdown").innerHTML.trim()==="")
        {
            this.typingTop();
        }
        document.getElementById("topdropdown").classList.remove("inactive-dropdown");
    }

    getNameTop(string)
    {
        if (this.state.foldersnames[string] == null)
        {
            var url = "/get_video/?name=" + string;
            var data = "";

            fetch(API_URL + url)
            .then(res => res.text())
            .then(res => {
                data = JSON.parse(res);
                this.state.foldersnames[string] = data;

                var finaldropdown = '<a href="/watch/' + data.folder_name + "-" + data.id + '">' + data.name + '</a>\n';
                document.getElementById("topdropdown").innerHTML+=finaldropdown;
            });
        } else{
            var finaldropdown = '<a href="/watch/' + this.state.foldersnames[string].folder_name + "-" + this.state.foldersnames[string].id + '">' + this.state.foldersnames[string].name + '</a>\n';
            document.getElementById("topdropdown").innerHTML+=finaldropdown;
        }
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    search()
    {
        const searchinput = document.getElementById("searchingtop").value;
        window.location.href = "/search?search=" + encodeURI(searchinput);
    }

    toggleMenu()
    {
        document.getElementsByClassName("mobile_menu_button")[0].classList.toggle("mobile_menu_button_active");
        document.getElementsByClassName("mobile_menu_content")[0].classList.toggle("mobile_menu_content_active");
    }
    
    render()
    {
        return (
        <>
            <div className="top">
                
                <a id="logo" href="/">
                    <Image src={logoImg}/>
                </a>
                <div className="top_left">
                    <a className="left_list" href="/"><div id="home">Home</div></a>
                    <a className="left_list" href="/about"><div id="about">About</div></a>
                    <a className="left_list" href="/movies"><div id="movies">Movies</div></a>
                    <a className="left_list" href="/series"><div id="series">Series</div></a>
                    <a className="left_list" href="/recently_added"><div id="recently_added">Recently Added</div></a>
                    <a className="left_list" href="/contact"><div id="contact_us">Contact Us</div></a>
                </div>
                <div className="top_right">
                    <a href='/donate'>
                        <div className='donate_button'>
                            <div id="donate">Support Us</div>
                        </div>
                    </a>
                </div>

                {/* mobile menu button */}
                <div className='mobile_menu'>
                    <div className='mobile_menu_button' onClick={this.toggleMenu}>
                        <div className='mobile_menu_button_line'></div>
                        <div className='mobile_menu_button_line'></div>
                        <div className='mobile_menu_button_line'></div>
                    </div>
                    <div className='mobile_menu_content'>
                        <div className='mobile_menu_items'>
                            <a href="/"><div id="home">Home</div></a>
                            <a href="/about"><div id="about">About</div></a>
                            <a href="/movies"><div id="movies">Movies</div></a>
                            <a href="/series"><div id="series">Series</div></a>
                            <a href="/recently_added"><div id="recently_added">Recently Added</div></a>
                            <a href="/contact"><div id="contact_us">Contact Us</div></a>
                            <a href="/donate"><div id="donate">Support Us</div></a>
                        </div>
                    </div>
                </div>
                <div className="searchtop">
                    <input type="text" autoComplete="off" id="searchingtop" onFocus={this.addTopDropdown} onBlur={this.removeTopDropdown} placeholder="Find Anime Series, Movies and more" onInput={this.typingTop}/>
                    <button onClick={this.search} id="searchButton" type="submit"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg></button>
                    <div className="dropdown-content-top inactive-dropdown" id="topdropdown" visibility="hidden"></div>
                </div>
            </div>
        </>
        );
    }
}

export default Header;