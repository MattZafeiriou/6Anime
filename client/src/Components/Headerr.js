import React, {Component, useState} from 'react';
import './Headerr.css'
import logoImg from '../logo.png'
import { Image } from 'react-bootstrap';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = { apiResponse: "", foldersnames: [] };

      this.addTopDropdown = this.addTopDropdown.bind(this);
      this.typingTop = this.typingTop.bind(this);
      this.sendSearchTop = this.sendSearchTop.bind(this);
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
            document.getElementById("topdropdown").style.visibility="hidden";
        else {
            for (var i=0; i<string.length; i++) {
                this.getNameTop(string[i]);
            }
            document.getElementById("topdropdown").style.visibility="visible";
        }

    }

    removeTopDropdown()
    {
        document.getElementById("topdropdown").style.visibility="hidden";
    }
    
    sendSearchTop(string)
    {
        var url = "search/?chars=" + this.encode_utf8(string);
        var data = "";

        fetch("http://localhost:9000/" + url)
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
        if (document.getElementById("topdropdown").innerHTML.trim()==="")
        {
            this.typingTop();
        }
        document.getElementById("topdropdown").style.visibility="visible";
    }

    getNameTop(string)
    {
        if (this.state.foldersnames[string] == null)
        {
            var url = "getfolder/?name=" + string;
            var data = "";

            fetch("http://localhost:9000/" + url)
            .then(res => res.text())
            .then(res => {
                data = res;
                this.state.foldersnames[string] = data;
                var epNum = this.getCookie(this.state.foldersnames[string]);
                if (!epNum) // if user has no cookie of that anime, make the episode number of it 1
                    epNum = 1;
                var finaldropdown = '<a href="/p/' + data + '/ep' + epNum + '">' + string + '</a>\n';
                document.getElementById("topdropdown").innerHTML+=finaldropdown;
            });
        } else{
            var epNum = this.getCookie(this.state.foldersnames[string]);
            if (!epNum) // if user has no cookie of that anime, make the episode number of it 1
                epNum = 1;
            var finaldropdown = '<a href="/p/' + this.state.foldersnames[string] + '/ep' + epNum + '">' + string + '</a>\n';
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
                    <a className="left_list" href="/films"><div id="films">Films</div></a>
                    <a className="left_list" href="/series"><div id="series">Series</div></a>
                    <a className="left_list" href="/recently_added"><div id="recently_added">Recently Added</div></a>
                    <a className="left_list" href="/contact"><div id="contact_us">Contact Us</div></a>
                </div>
                <div className="top_right">
                    <a href='/donate'>
                        <div className='donate_button'>
                            <div id="donate">Donate</div>
                        </div>
                    </a>
                </div>
                <div className="searchtop">
                    <form>
                        <input type="text" autoComplete="off" id="searchingtop" onFocus={this.addTopDropdown} onBlur={this.removeTopDropdown} placeholder="Find Anime Series, Movies and more" onInput={this.typingTop}/>
                        <button id="searchButton" type="submit" style={{fill: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg></button>
                    </form>
                    <div className="dropdown-content-top" id="topdropdown" visibility="hidden"></div>
                </div>

            </div>
        </>
        );
    }
}

export default Header;