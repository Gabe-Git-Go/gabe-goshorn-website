import '../../styles/home.css'
import '../../styles/hire-me.css'
import myResume from '../../assets/hire-me-assets/Resume_Gabriel_Goshorn_Current.pdf'
import { useState } from 'react';
import { ContactForm } from '../shared/contact-form';

export default function HireMe() {
    const [successfulSubmission,setSuccessfulSubmission] = useState(false);

    const handleSubmissionSuccess = () =>{
        setSuccessfulSubmission(true);
    }
    return (
        <div id="hire-me-wrapper">
            <div>
                <h1>What I am Looking For</h1>
                <p className='p-1'>I am looking for a position that would challenge me in new ways, and continue my learnings in my goal of becoming a full stack developer.
                    I already have plenty of experience with frontend web technologies, I would love to find a position working with a relational database of some sort.
                    I do already have some trainings dealing with Java springboot and MongoDB however I am always open to learning new technologies. Please take a look at my resume and feel free to contact me.
                </p>
                <p>Take my Resume here - {'>'} <a className='resume' href={myResume} download="Resume_Gabriel_Goshorn_Current.pdf">Download Resume</a></p>
            </div>
            <hr />
            {successfulSubmission ? 
            <div>
                <h1>Thank You for your submission!</h1>
                <p>Will email you back as soon as possible.</p>
            </div>
            :
            <ContactForm onSubmissionSuccessCallback={handleSubmissionSuccess}/>
        }
        </div>
    )
}