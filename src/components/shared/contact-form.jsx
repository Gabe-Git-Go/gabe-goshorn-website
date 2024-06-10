import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { sendEmail } from "../../services/hire-me/emailService";
import { useAppContext } from "../../config/app-context";

export const ContactForm = ({ onSubmissionSuccessCallback }) => {
    const emptySubmission = {
        email: '',
        firstName: '',
        lastName: '',
        comment: ''
    }
    const [validated, setValidated] = useState(false);
    const [contactData, setContactData] = useState(emptySubmission);
    const {setAppState } = useAppContext();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        setValidated(true);
        const email = {
            subject: `Contact MSG from ${contactData.firstName} ${contactData.lastName},\n`,
            body: `Comment/Inquiry : ${contactData.comment} \nSender's email : ${contactData.email}`,
            to: "gabriel.goshorn.website@gmail.com"
        }

        sendEmail(email).then((response) => {
            console.log("response", response)
            setContactData(emptySubmission);
            onSubmissionSuccessCallback();
        }, (error) => {
            setAppState({
                toastMsg: {
                    title: 'Submission Error',
                    message: 'Sorry about the inconvience.',
                    delay: 5000,
                    isError: true,
                    show: true
                }
            });
        }
        )
    };

    return (
        <Form className='contact-form' noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Contact Me</h1>
            <Row className="mb-3 mx-auto pl-0">
                <Form.Group as={Col} md="4" className="mb-3 pl-0" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        name="firstName"
                        value={contactData.firstName}
                        onChange={handleChange}
                        required type="text" placeholder="Jon" />
                    <Form.Control.Feedback type="invalid">
                        Please enter first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3 pl-0" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        name="lastName"
                        value={contactData.lastName}
                        onChange={handleChange}
                        required type="text" placeholder="Doe" />
                    <Form.Control.Feedback type="invalid">
                        Please enter last name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3 pl-0">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                        required type="email" placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        Please enter email.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='pl-0'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comments/Inquiry</Form.Label>
                    <Form.Control
                        name="comment"
                        value={contactData.comment}
                        onChange={handleChange}
                        required as="textarea" rows={3} />
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
    )
}
