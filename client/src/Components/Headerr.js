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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="top">
                
                <a id="logo" href="/">
                    <Image roundedCircle src={logoImg}/>
                </a>
                
                <div className="searchtop">
                    <form>
                        <input type="text" autoComplete="off" id="searchingtop" onFocus={this.addTopDropdown} onBlur={this.removeTopDropdown} placeholder="Anime name.." onInput={this.typingTop}/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>

                </div>
                <div className="dropdown-content-top" id="topdropdown" visibility="hidden">
                </div>
                <div className="top_right">
                    <a className="anime_list" href="/contact"><div id="contact_us">Contact Us</div></a>
                    <a className="anime_list" href="/about"><div id="about">About</div></a>
                    <a className="anime_list" href="/most_recent"><div id="most_recent">Most Recent</div></a>
                </div>
            </div>
        </>
        );
    }
}

export default Header;