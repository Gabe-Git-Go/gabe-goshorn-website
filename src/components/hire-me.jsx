import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import '../styles/home.css'
import '../styles/hire-me.css'
import myResume from '../assets/home-assets/Resume_Gabriel_Goshorn_Current.pdf'
import { useState } from 'react';

export default function HireMe() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
    const getResume = () => {

    }

    return (
        <div id="hire-me-wrapper">
            <div>
                <h1>Hire Me</h1>
                <p onClick={getResume}>Take my Resume here - > <a className='resume' href={myResume} download="Resume_Gabriel_Goshorn_Current.pdf">Download Resume</a></p>
            </div>
            <hr/>
            <Form className='contact-form' noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>Contact Me</h1>
                <Row className="mb-3 mx-auto pl-0">
                    <Form.Group as={Col} md="4" className="mb-3 pl-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Jon" />
                        <Form.Control.Feedback type="invalid">
                            Please enter first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3 pl-0" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Doe" />
                        <Form.Control.Feedback type="invalid">
                            Please enter last name.
                        </Form.Control.Feedback>
                        </Form.Group>
                </Row>
                <Row className="mb-3 pl-0">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                            Please enter email.
                        </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className='pl-0'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments/Inquiry</Form.Label>
                    <Form.Control required as="textarea" rows={3} />
                    <Form.Control.Feedback type="invalid">
                            Please enter comment or inquiry.
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row>
                    <Button className='contact-submit-btn' variant="Primary" type="submit">
                        Submit
                    </Button>
                </Row>
            </Form>
        </div>
    )
}