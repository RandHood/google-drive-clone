import React, { useRef, useState } from 'react';
import { useAuth } from '../../Contexts/Auth';
import { Form, Button, Card } from 'react-bootstrap';
import { Link , useHistory} from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to login")
        }
        setLoading(false);
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{maxWidth: "500px"}}>
                <Card.Body>
                    <h2 className="text-center m-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Login
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        Need to register? <Link to="/signup">Sign up</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
