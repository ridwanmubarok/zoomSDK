import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

// ZOOM
import Zoom from '../pages/Zoom'

const App = () => {

    const [JoinMeet, setJoinMeet] = React.useState(false);
    const [UserEmail, setUserEmail] = React.useState(UserEmail ?? '');
    const [MeetingId, setMeetingId] = React.useState(MeetingId ?? '');
    const [MeetingPassword, setMeetingPassword] = React.useState(MeetingPassword ?? '');
    const [MeetingUsername, setMeetingUsername] = React.useState(MeetingUsername ?? '');

    const CheckMeet = () => {
        if (JoinMeet) {
            return (
                <Zoom
                    UserEmail={UserEmail}
                    MeetingId={MeetingId}
                    MeetingPassword={MeetingPassword}
                    MeetingUsername={MeetingUsername} />
            );
        } else {
            return (
                <Container>
                    <Row className="flex-center">
                        <Col xs={8} lg={6} md={6} className="zoom-wrap">
                            <Row>
                                <Col>
                                    <div style={Styles.title}>
                                        <h1>4VM ZOOM</h1>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="MeetingID" className="text-left">
                                        <Form.Label>Meeting ID</Form.Label>
                                        <Form.Control type="text" placeholder="Meeting Number" value={MeetingId} onChange={e => setMeetingId(e.target.value.replace(" ", ""))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="MeetingPassword" className="text-left">
                                        <Form.Label>Meeting Password</Form.Label>
                                        <Form.Control type="text" placeholder="Meeting Password" value={MeetingPassword} onChange={e => setMeetingPassword(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="Email" className="text-left">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" value={MeetingUsername} onChange={e => setMeetingUsername(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="Email" className="text-left">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email Anda" value={UserEmail} onChange={e => setUserEmail(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Button
                                            onClick={() => setJoinMeet(true)}
                                            className="btn btn-block" variant="primary" type="submit">
                                            Join
                                </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    return CheckMeet();
}


const Styles = ({
    title: {
        marginBottom: 50,
        textAlign: 'center'
    }
});

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
