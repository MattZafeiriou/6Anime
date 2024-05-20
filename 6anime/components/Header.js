import { Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { createRoot } from 'react-dom';

export default function Header () {

    function toggleMenu()
    {
        document.getElementsByClassName("mobile_menu_button")[0].classList.toggle("mobile_menu_button_active");
        document.getElementsByClassName("mobile_menu_content")[0].classList.toggle("mobile_menu_content_active");
    }

    function toggleTopDropdown(string)
    {
        string = JSON.parse(string);
        var x = document.getElementById("searchingtop").value;
        document.getElementById("topdropdown").innerHTML="";
        if (x==="")
        {
            document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>Enter keywords to search</h5>";
        } else if (x.length < 3)
        {
            document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>Enter 3 or more characters</h5>";
        } else {
            for (var i=0; i<string.length; i++) {
                getNameTop(string[i]);
            }
            document.getElementById("topdropdown").classList.remove("inactive-dropdown");
            if (string.length === 0)
                document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>No results found</h5>";
        }
    }

    function getNameTop(string)
    {
        if (foldersnames[string] == null)
        {
            var url = "/getvideo/?id=" + string.split("-")[1];
            var data = "";

            fetch(process.env.NEXT_PUBLIC_API_URL + url)
            .then(res => res.text())
            .then(res => {
                data = JSON.parse(res);
                foldersnames[string] = data;

                var finaldropdown = '<a href="/watch/' + data.folder_name + "-" + data.id + '">' + data.name + '</a>\n';
                document.getElementById("topdropdown").innerHTML+=finaldropdown;
            });
        } else{
            var finaldropdown = '<a href="/watch/' + foldersnames[string].folder_name + "-" + foldersnames[string].id + '">' + foldersnames[string].name + '</a>\n';
            document.getElementById("topdropdown").innerHTML+=finaldropdown;
        }
    }
        
    function encode_utf8(s) {
        return encodeURIComponent(s);
    }

    function sendSearchTop(string)
    {
        var url = "/search?chars=" + encode_utf8(string);
        var data = "";

        fetch(process.env.NEXT_PUBLIC_API_URL + url)
        .then(res => res.text())
        .then(res => {
            data = res;
            toggleTopDropdown(data);
        });

    }


    function addTopDropdown()
    {
        // document.getElementById("searchInput").
        if (document.getElementsByClassName("mobile_menu_button_active")[0] != null)
            toggleMenu();

        if (document.getElementById("topdropdown").innerHTML.trim()==="")
        {
            typingTop();
        }
        document.getElementById("topdropdown").classList.remove("inactive-dropdown");
    }

    function removeTopDropdown()
    {
        document.getElementById("topdropdown").classList.add("inactive-dropdown");
    }

    function typingTop()
    {
        var x = document.getElementById("searchingtop").value;
        if (x.length < 3)
        {
            document.getElementById("topdropdown").innerHTML = "<h5 id='enterkeywords'>Enter 3 or more characters</h5>";
            document.getElementById("topdropdown").classList.remove("inactive-dropdown");
            return;
        }
        sendSearchTop(x);
    }

    function search()
    {
        const searchinput = document.getElementById("searchingtop").value;
        window.location.href = "/search?search=" + encodeURI(searchinput);
    }

    function onload()
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

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function setCookie(name, value, days, global) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=None; Secure";
    }


    function Profile()
    {

        return (
            <a href="/profile">
                <div className='profile'>
                    <img id="profilepic" alt="P"/>
                </div>
            </a>
        );
    }

    async function convertBlobToBase64(blob) {
        var reader = new FileReader();
        let res;
        reader.readAsDataURL(blob); 
        reader.onloadend = function() {
            var base64data = reader.result;                
            res = base64data;
            return;
        }
        return res;
    }

    const foldersnames = [];
    useEffect(async () => {
        // check if user is logged in
        const token = getCookie('token');
        if (token) {
            //alert('You are logged in');
            document.getElementsByClassName("top_right")[0].innerHTML = '';

            const raDiv = document.getElementsByClassName('top_right')[0];
            const newDiv = document.createElement('div');
            raDiv.appendChild(newDiv);
            // Render the component into the new div
            const root = createRoot(newDiv);
            root.render(<Profile/>)


            // const base64img = localStorage.getItem('profilepic');
            // if (base64img)
            // {
            //     const res = await fetch(base64img);
            //     const blob = await res.blob();
            //     document.getElementById("profilepic").src = URL.createObjectURL(blob);
            // } else {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/getprofilepic');
                const data = await response.blob();
                const url = URL.createObjectURL(data);
                document.getElementById("profilepic").src = url;

            //     // save to local storage
            //     const img = convertBlobToBase64(data);
            //     localStorage.setItem('profilepic', img);
            // }
        } else {
            //alert('You are not logged in');
        }

        onload();
    }, []);
    return (
        <>
            <div className="top">
                
                <a id="logo" href="/">
                    <Image alt='Logo Image' src={'/logo.svg'}/>
                </a>
                <div className="top_left">
                    <a className="left_list" href="/"><div id="home">Home</div></a>
                    <a className="left_list" href="/about"><div id="about">About</div></a>
                    <a className="left_list" href="/contact"><div id="contact_us">Contact Us</div></a>
                    <a className="left_list" href="/donate"><div id="donate">Buy us a Coffee</div></a>
                </div>
                <div className="top_right">
                    <a href='/login'>
                        <div className='login_button'>
                            <div id="login">Log In</div>
                        </div>
                    </a>
                </div>

                {/* mobile menu button */}
                <div className='mobile_menu'>
                    <div className='mobile_menu_button' onClick={toggleMenu}>
                        <div className='mobile_menu_button_line'></div>
                        <div className='mobile_menu_button_line'></div>
                        <div className='mobile_menu_button_line'></div>
                    </div>
                    <div className='mobile_menu_content'>
                        <div className='mobile_menu_items'>
                            <a href="/"><div id="homem">Home</div></a>
                            <a href="/about"><div id="aboutm">About</div></a>
                            <a href="/movies"><div id="movies">Movies</div></a>
                            <a href="/series"><div id="series">Series</div></a>
                            <a href="/contact"><div id="contact_usm">Contact Us</div></a>
                            <a href="/donate"><div id="donatem">Buy us a Coffee</div></a>
                            <a href="/login"><div id="loginm">Log In</div></a>
                        </div>
                    </div>
                </div>
                <div className="searchtop">
                    <input type="text" autoComplete="off" id="searchingtop" onFocus={addTopDropdown} onBlur={removeTopDropdown} placeholder="Find Anime Series, Movies and more" onInput={typingTop}/>
                    <button onClick={search} id="searchButton" type="submit"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg></button>
                    <div className="dropdown-content-top inactive-dropdown" id="topdropdown"></div>
                </div>
            </div>
        </>
    );
}