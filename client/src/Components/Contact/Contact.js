import React from 'react';
import './Contact.css'
import {Form, Button, Toast, ToastContainer} from 'react-bootstrap';

class Header extends React.Component {

    constructor(proms)
    {
        super(proms);

        this.state = {
            validated: false,
            showToast: false,
            ipAddress: ''
        }
        this.SubmitForm = this.SubmitForm.bind(this);
        this.toggleShowToast = this.toggleShowToast.bind(this);
    }

    componentDidMount() {
        document.getElementById("contact_us").classList.add("active");
        fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => this.setState({ipAddress: data.IPv4}))
        .catch(error => console.log(error))
    }
        
    useEffect() {
    }

    SubmitForm (event)
    {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            let url = "send_form";

            fetch("http://localhost:9000/" + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementsByClassName('contact_name')[0].value,
                    email: document.getElementsByClassName('contact_email')[0].value,
                    subject: document.getElementsByClassName('contact_subject')[0].value,
                    text: document.getElementsByClassName('contact_text')[0].value,
                    ip: this.state.ipAddress
                })
            })
            .then(res => res.arrayBuffer())
            .then(data => {

                window.location.replace("/submit_success");

            })
            .catch(error => {
                this.toggleShowToast();
                console.error('Error:', error);
            });
        }
        this.setState({validated: true})
    }

    toggleShowToast = () => {
        this.setState({showToast: !this.state.showToast});
    }

    render() {
        return (
        <>
            <div style={{display: 'flex', marginTop: '3em'}}>
                <div className='container'>
                    <h1>Contact Us</h1>
                    <Form noValidate validated={this.state.validated} action="" onSubmit={this.SubmitForm}>
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
                                <option value="copyright">Copyright Issues</option>
                                <option value="recommendation">Anime Recommendations</option>
                                <option value="other">Other..</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                This field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <Form.Group style={{color: 'rgb(180,180,180)', minWidth: '20vw'}}controlId="contactForm.text">
                            <Form.Label>Text <span id='required'>*</span></Form.Label>
                            <Form.Control as="textarea" className='contact_text' required rows={5} />
                            <Form.Control.Feedback type="invalid">
                                This field is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                        <Button variant="dark" type="submit">Submit</Button>
                    </Form>
                </div>
                <div className='container'>
                    <h1>Donate</h1>
                    <p>If you want to support our work and keep the website running you may donate through the following methods:</p>
                    <br/>
                    
                    <a href='../donate_paypal'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' alt='PayPal' style={{width: '10vw'}}/></a>
                    <br/>
                    <br/>
                    <a href='../donate_bitcoin'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/1200px-Bitcoin_logo.svg.png' alt='Bitcoin' style={{width: '10vw'}}/></a>
                    <br/>
                    <br/>
                    <a href='../donate_ethereum'><img src='https://altcoinsbox.com/wp-content/uploads/2023/01/full-ethereum-logo-grey.png' alt='Ethereum' style={{width: '10vw'}}/></a>
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
                <Toast style={{backgroundColor: '#141414', color: 'rgb(200,200,200)'}} show={this.state.showToast} onClose={this.toggleShowToast} delay={10000} autohide>
                    <Toast.Header style={{backgroundColor: 'rgb(150,0,0)', color: 'rgb(180,180,180)'}}>
                        <strong className="me-auto">Error</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>An error occured while submitting the form.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
    };
}
export default Header;