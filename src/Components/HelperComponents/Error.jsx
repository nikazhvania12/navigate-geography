import { useEffect, useState } from 'react';
import '../ComponentStyles/error.css'

function Error({message}) {
    const [parsedMessage, setParsedMessage] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(message) {
            setParsedMessage(message);

            if(message.length > 85)
                setParsedMessage(`${message.substring(0, 85)}...`)

        setVisible(true);
        }
    }, [message])

    return (
        visible &&
        <div className="error">
            <div className='bug-icon-container'>
                    <i className='bi bi-exclamation-triangle-fill' />
            </div>
            <div className='error-message-container'>
                <div className='close-error-container'>
                    <i class="bi bi-x-circle-fill close-btn" onClick={() => setVisible(false)}></i>
                </div>
                <h6 className='error-text'>{parsedMessage}</h6>
            </div>
        </div>
    )
}

export default Error;