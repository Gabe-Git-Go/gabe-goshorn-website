import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import '../styles/home.css'
import '../styles/hire-me.css'
import myResume from '../assets/home-assets/Resume_Gabriel_Goshorn_Current.pdf'

export default function HireMe() {

    const getResume = () => {

    }

    return (
        <div id="hire-me-wrapper">
            <div>
                <h1>Hire Me</h1>
                <p onClick={getResume}>Take my Resume here - > <a className='resume' href={myResume} download="Resume_Gabriel_Goshorn_Current.pdf">Download Resume</a></p>
            </div>
            <hr/>
            <Form className='contact-form'>
                <h1>Contact Me</h1>
                <Row className="mb-3">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>first Name</Form.Label>
                        <Form.Control type="text" placeholder="Jon" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Last NAme</Form.Label>
                        <Form.Control type="text" placeholder="Doe" />
                        </Form.Group>
                    
                </Row>
                <Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                </Row>
                
            </Form>
        </div>
    )
}