import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import '../styles/home.css'
import '../styles/hire-me.css'
import myResume from '../assets/hire-me-assets/Resume_Gabriel_Goshorn_Current.pdf'
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

    return (
        <div id="hire-me-wrapper">
            <div>
                <h1>What I am Looking For</h1>
                <p>I am looking for a position that would challenge me in new ways, and continue my learnings in my goal of becoming a full stack developer. 
                    I already have plenty of experience with frontend web technologies, I would love to find a position working with a relational database of some sort.
                    I do already have some trainings dealing with Java springboot and MongoDB however I am always open to learning new technologies. Please take a look at my resume and feel free to contact me.
                    </p>
                <p>Take my Resume here - > <a className='resume' href={myResume} download="Resume_Gabriel_Goshorn_Current.pdf">Download Resume</a></p>
            </div>
            <hr />
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