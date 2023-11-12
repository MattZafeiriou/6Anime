import {React, Component} from 'react';
import './MainP.css'
import './index.css'
import logoImg from '../logo.png'
import { Image } from 'react-bootstrap';

class MainP extends Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "", foldersnames: [] };

        this.addTopDropdown = this.addTopDropdown.bind(this);
        this.typingTop = this.typingTop.bind(this);
        this.sendSearchTop = this.sendSearchTop.bind(this);
        document.body.classList.add('main');
    }

    encode_utf8(s) {
        return encodeURIComponent(s);
    }

    toggleTopDropdown(string)
    {
        string = JSON.parse(string);
        var x = document.getElementById("searching").value;
        document.getElementById("dropdown").innerHTML="";
        if (x==="")
            document.getElementById("dropdown").style.visibility="hidden";
        else {
            for (var i=0; i<string.length; i++) {
                this.getNameTop(string[i]);
            }
            document.getElementById("dropdown").style.visibility="visible";
        }

    }

    removeTopDropdown()
    {
        document.getElementById("dropdown").style.visibility="hidden";
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
        var x = document.getElementById("searching").value;
        this.sendSearchTop(x);
    }

    addTopDropdown()
    {
        if (document.getElementById("dropdown").innerHTML.trim()==="")
        {
            this.typingTop();
        }
        document.getElementById("dropdown").style.visibility="visible";
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
                document.getElementById("dropdown").innerHTML+=finaldropdown;
            });
        } else{
            var epNum = this.getCookie(this.state.foldersnames[string]);
            if (!epNum) // if user has no cookie of that anime, make the episode number of it 1
                epNum = 1;
            var finaldropdown = '<a href="/p/' + this.state.foldersnames[string] + '/ep' + epNum + '">' + string + '</a>\n';
            document.getElementById("dropdown").innerHTML+=finaldropdown;
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

    Qna(props) {
        return (
            <div style={{
                width:"270px"
            }}>
                <h2>{props.q}</h2>
                <h4>{props.a}</h4>
            </div>
        );
    }

    render() {
        return (
            <>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div align="center" className="search">
                    <Image align="center" id="logo_mid" src={logoImg}/>
                    <br/><br/>
                    <form>
                        <input type="text" autocomplete="off" id="searching" onFocus={this.addTopDropdown} onBlur={this.removeTopDropdown} placeholder="Search Anime Series" onInput={this.typingTop}/>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="dropdown-content" id="dropdown">
                </div>
                <div align="center" className="info">
                    <this.Qna q="What is this website?" a="This website is for anime bruh lol xD Idc if you watch anime or not xDDDDD"/>
                    <br/><br/>
                    <this.Qna q="How can I make this sh*t too?" a="IDK man just do it - Adidas or smth"/>
                </div>
                <div className="space"><br/></div>
            </>
        );
    }
}

export default MainP