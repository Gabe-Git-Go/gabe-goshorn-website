import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useAppContext } from '../../config/app-context';

export function ToastMessage() {
    const {appState, setAppState} = useAppContext();
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(appState)
        if (appState.toastMsg) {
            setShow(appState.toastMsg.show);
        }
    }, [appState.toastMsg]);

    const handleClose = () => {
        setShow(false);
        console.log(show)
        setAppState({
            toastMsg: {
                ...appState.toastMsg,
                show: false
            }
        });
    };

    return (
        <>
            {
                appState.toastMsg ?
                        <Toast
                            className="d-inline-block m-1"
                            bg={appState.toastMsg.isError?'danger':'primary'}
                            onClose={() => handleClose()} 
                            show={appState.toastMsg.show} 
                            delay={appState.toastMsg.delay}
                            autohide
                        >
                            <Toast.Header>
                                <strong className="me-auto">{appState.toastMsg.title}</strong>
                            </Toast.Header>
                            <Toast.Body>
                                {appState.toastMsg.message}
                            </Toast.Body>
                        </Toast>
                
                    :
                    ''
            }
        </>
    );
}

export default ToastMessage;