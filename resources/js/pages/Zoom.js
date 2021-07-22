import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// ZOOM
import { ZoomMtg } from '@zoomus/websdk'

const Zoom = (props) => {

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        if (isMounted) {
            ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.5/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareJssdk();
            GenerateSignature();
        }
        return () => { isMounted = false }; // use cleanup to toggle value, if unmounted
    }, [])

    const [UserEmail] = React.useState(props.UserEmail ?? '');
    const [MeetingId] = React.useState(props.MeetingId ?? '');
    const [MeetingPassword] = React.useState(props.MeetingPassword ?? '');
    const [MeetingUsername] = React.useState(props.MeetingUsername ?? '');
    var signatureEndpoint = 'http://127.0.0.1:8000/api/zoom/signature'
    var apiKey = '5RA9w_uATB2TEqUKunNV2g'
    var role = 1
    var leaveUrl = 'http://127.0.0.1:8000'

    const GenerateSignature = () => {
        fetch(signatureEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: MeetingId,
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
                    meetingNumber: MeetingId,
                    userName: MeetingUsername,
                    userEmail: UserEmail,
                    passWord: MeetingPassword,
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

    return <div className="App"> Zoom </div>;
}


export default Zoom;