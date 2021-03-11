import React, { useRef, useState } from 'react';
import { useAuth } from '../../Contexts/Auth';
import { Form, Button, Card, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const addressRef = useRef();
    let planRef = "monthly";
    const creditCardRef = useRef();
    const companyNameRef = useRef();
    const companyNumberRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { signup } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/login");
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false);

        // console.log(emailRef.current.value);
        // console.log(passwordRef.current.value);
        // console.log(nameRef.current.value);
        // console.log(addressRef.current.value);
        // console.log(planRef);
        // console.log(creditCardRef.current.value);
        // console.log(companyNameRef.current.value);
        // console.log(companyNumberRef.current.value);

    }

    function selectPlan(e) {
        planRef = e.target.value;
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{maxWidth: "500px"}}>
                <Card.Body>
                    <h2 className="text-center m-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" ref={addressRef} required />
                        </Form.Group>
                        <Form.Group id="plan">
                            <Form.Label>Plan</Form.Label>
                            <br/>
                            <ButtonGroup onClick={selectPlan}>
                                <Button value="monthly">Monthly $8.9</Button>
                                <Button value="annual">Annual $79.9</Button>
                            </ButtonGroup>
                        </Form.Group>
                        <Form.Group id="credit_card">
                            <Form.Label>Credit Card</Form.Label>
                            <Form.Control type="number" ref={creditCardRef} required />
                        </Form.Group>
                        <Form.Group id="company_name">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" ref={companyNameRef} required />
                        </Form.Group>
                        <Form.Group id="company_number">
                            <Form.Label>Company Phone Number</Form.Label>
                            <Form.Control type="number" ref={companyNumberRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        Already registered? <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
