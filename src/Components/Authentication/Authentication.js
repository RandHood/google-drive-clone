import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Card } from 'react-bootstrap';

export default function Authentication() {
    return (
        <Card className="w-100 m-auto" style={{maxWidth: "1000px"}}>
            <div className="d-flex align-items-center justify-content-center">
                <Login />
                <div style={{ width:"1px", height:"100%", border: "1px solid red"}}></div>
                <SignUp />
            </div>
        </Card>
    );
}
