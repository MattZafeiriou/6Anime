import { useEffect } from "react";
import {Form, Button, Toast, ToastContainer} from 'react-bootstrap';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Head from 'next/head'

export default function Contact({ data }) {
    useEffect(() => {
        document.getElementById("contact_us").classList.add("active");
        document.getElementById("contact_usm").classList.add("active");
        fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => state.ipAddress = data.IPv4)
        .catch(error => console.log(error))
    }, []);

    function SubmitForm (event)
    {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            let url = "/sendform";

            fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementsByClassName('contact_name')[0].value,
                    email: document.getElementsByClassName('contact_email')[0].value,
                    subject: document.getElementsByClassName('contact_subject')[0].value,
                    text: document.getElementsByClassName('contact_text')[0].value,
                    ip: state.ipAddress
                })
            })
            .then(res => res.arrayBuffer())
            .then(data => {

                window.location.replace("/submit_success");

            })
            .catch(error => {
                toggleShowToast();
                console.error('Error:', error);
            });
        }
        state.validated = true;
    }

    function toggleShowToast() {
        state.showToast = !state.showToast;
    }

    function onVerifyCaptcha(token) {
        //alert("Verified: " + token);
    }

    let state = {
        validated: false,
        showToast: false,
        ipAddress: ''
    }

    return (
        <>
        <Head>
            <title>6Anime - Contact Us</title>
            <meta property="og:title" content="6Anime - Contact Us" />
            <meta
              property="og:description"
              content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
            />
            <meta
              name="description"
              content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
            />
            <meta
              name="keywords"
              content="anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english"
            />
        </Head>
            <div className="contact_main">
                <div className='container'>
                    <h1>Contact Us</h1>
                    <Form noValidate validated={state.validated} action="" onSubmit={SubmitForm}>
                        <br/>
                        <Form.Group controlId="contactForm.name">
                            <Form.Label style={{color: 'rgb(180,180,180)'}}>Name <span id='required'>*</span></Form.Label>
                            <Form.Control type="text" className='contact_name' required placeholder="John Doe" />
                            <Form.Control.Feedback type="invalid">
                                This field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="contactForm.email">
                            <Form.Label style={{color: 'rgb(180,180,180)'}}>Email address <span id='required'>*</span></Form.Label>
                            <Form.Control type="email" className='contact_email' required placeholder="name@example.com" />
                            <Form.Control.Feedback type="invalid">
                                Write a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="contactForm.subject">
                            <Form.Label style={{color: 'rgb(180,180,180)'}}>Subject <span id='required'>*</span></Form.Label>
                            <Form.Select required className='contact_subject' aria-label="Floating label select example">
                                <option selected disabled value="">Select Subject</option>
                                <option value="technical">Technical Issues</option>
                                <option value="streaming">Streaming Issues</option>
                                <option value="missing_video">Missing Video</option>
                                <option value="other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                This field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <Form.Group style={{color: 'rgb(180,180,180)', minWidth: '20vw'}}controlId="contactForm.text">
                            <Form.Label>Message <span id='required'>*</span></Form.Label>
                            <Form.Control as="textarea" className='contact_text' required rows={5} />
                            <Form.Control.Feedback type="invalid">
                                This field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <HCaptcha sitekey="956fe9d4-8e58-4abb-aacf-ed674089796e" onVerify={onVerifyCaptcha}/>
                        <Button variant="dark" type="submit">Submit</Button>
                    </Form>
                </div>
                <div className='container'>
                    <h1>Donate</h1>
                    <p>If you want to support our work and keep the website running you may donate through the following methods:</p>
                    <br/>
                    
                    <a href='../donate_paypal'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' alt='PayPal'/></a>
                    <br/>
                    <br/>
                    <a href='../donate_bitcoin'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/1200px-Bitcoin_logo.svg.png' alt='Bitcoin'/></a>
                    <br/>
                    <br/>
                    <a href='../donate_ethereum'><img src='https://altcoinsbox.com/wp-content/uploads/2023/01/full-ethereum-logo-grey.png' alt='Ethereum'/></a>
                    <br/>
                    <br/>
                    <p>Thank you for preferring us!</p>
                </div>
            </div>
            <ToastContainer
            className="p-3"
            position="bottom-center"
            style={{ zIndex: 1 }}
            >
                <Toast style={{backgroundColor: '#141414', color: 'rgb(200,200,200)'}} show={state.showToast} onClose={toggleShowToast} delay={10000} autohide>
                    <Toast.Header style={{backgroundColor: 'rgb(150,0,0)', color: 'rgb(180,180,180)'}}>
                        <strong className="me-auto">Error</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>An error occured while submitting the form.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
