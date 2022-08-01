import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Col,
    Row,
    Alert,
    Label
} from "reactstrap";
import AuthService from "./../../services/auth.service";

function Login(props) {
    useEffect(() => {
        if (AuthService.getUser()) {
            props.history.push("/");
        }
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailChange = (e) => {
        setEmail(e.target.value);
    };
    const passwordChange = (e) => {
        setPassword(e.target.value);
    };

    const submit = (e) => {
        setLoading(true);
        setError("");

        e.preventDefault();
        AuthService.login(email, password)
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                }
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }

                props.history.push("/dashboard");
            })
            .catch((error) => {
                setError(error.response.data.message);
                setLoading(false);
            });
    };

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-white shadow border-0">
                    <CardBody className="login-card px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small> Use your credentials to log please! </small>{" "}
                        </div>{" "}
                        <Form onSubmit={submit} role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroup>
                                        <Label>Email</Label>
                                    </InputGroup>
                                    <Input
                                        required
                                        onChange={emailChange}
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroup>
                                        <Label>Password</Label>
                                    </InputGroup>
                                    <Input
                                        required
                                        minLength="6"
                                        onChange={passwordChange}
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </InputGroup>
                            </FormGroup>{" "}
                            {error && (
                                <div className="text-center">
                                    <Alert color="danger"> {error} </Alert>
                                </div>
                            )}
                            <div className="text-center">
                                <Button
                                    disabled={loading}
                                    className="my-4"
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                    {loading && (
                                        <div
                                            className="spinner-border spinner-border-sm text-light ml-3"
                                            role="status"
                                        ></div>
                                    )}
                                </Button>
                                <Row>
                                    <small>
                                        {" "}
                                        You don't have an account?{" "}
                                        <Link to="/auth/signup"> Register now </Link>{" "}
                                    </small>
                                </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
}

export default Login;
