import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// ZOOM
import { ZoomMtg } from '@zoomus/websdk'

const Zoom = (props) => {

    useEffect(() => {
        ZoomMtg.setZoomJSLib('@zoomus/websdk/dist/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        initMeeting()
    }, []);

    const [Loading, setLoading] = React.useState(true);
    var signatureEndpoint = 'https://zoom.4visionmedia.net/api/zoom/signature'
    var apiKey = '5RA9w_uATB2TEqUKunNV2g'
    var role = 0
    var leaveUrl = 'https://zoom.4visionmedia.net/'

    const initMeeting = async () => {
        GenerateSignature();
    }

    const GenerateSignature = () => {
        fetch(signatureEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: props.MeetingId,
                role: role
            })
        }).then(res => res.json())
            .then(response => {
                StartMeting(response.signature)
            }).catch(error => {
                console.error(error)
            })
    }

    const StartMeting = async (signature) => {
        document.getElementById('zmmtg-root').style.display = "block";
        await ZoomMtg.init({
            leaveUrl: leaveUrl,
            isSupportAV: true,
            success: (success) => {
                ZoomMtg.join({
                    signature: signature,
                    apiKey: apiKey,
                    meetingNumber: props.MeetingId,
                    userName: props.MeetingUsername,
                    userEmail: props.UserEmail,
                    passWord: props.MeetingPassword,
                    error: (error) => {
                        console.log(error)
                    }
                })
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <div className="App">
        </div>
    );
}


export default Zoom;