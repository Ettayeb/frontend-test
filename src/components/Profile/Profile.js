import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Container,
    Col,
    Row,
    Label,
    Input,
    FormGroup,
    Form,
    Button,
    Alert,
    FormText,
    CardHeader,
    CardBody,
    Card,
    Collapse
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";
import "react-bootstrap-typeahead/css/Typeahead.css";
import FileUploader from "../Common/FIleUpload";
import Skill from "../Common/Skill";
import Experience from "../Common/Experience";
import Education from "../Common/Education";
import Certification from "../Common/Certification";
import TemplatesModal from "../Common/TemplatesModal";

import ProfileService from "../../services/profile.service";
import AuthService from "../../services/auth.service";
function Profile() {
    const now = new Date().toISOString();
    const [profile, setProfile] = useState({
        userId: AuthService.getUser()._id,
        birthDate: now,
        headline: "",
        fullName: "",
        phone: "",
        address: "",
        proEmail: "",
        experiences: [],
        education: [],
        certifications: [],
        skills: [],
        interests: ""
    });
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [action, setAction] = useState("ADD");
    const [GI, setGI] = useState(true);
    const [skillKey, setSkillKey] = useState(false);

    useEffect(() => {
        ProfileService.getOne(AuthService.getUser()._id)
            .then((res) => {
                if (res.data) {
                    setProfile(res.data);
                    setAction("UPDATE");
                    setSkillKey(!skillKey);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, []);
    const submit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!profile.photo) {
            setError("Please upload your photo.");
            return;
        }
        let formData = new FormData();
        for (let dataKey in profile) {
            if (
                dataKey === "experiences" ||
                dataKey === "certifications" ||
                dataKey === "education" ||
                dataKey === "skills"
            ) {
                formData.append(dataKey, JSON.stringify(profile[dataKey]));
            } else {
                formData.append(dataKey, profile[dataKey]);
            }
        }

        if (action === "ADD") {
            ProfileService.add(formData)
                .then(() => {
                    setSuccess("Profile successfully updated.");
                })
                .catch((err) => {
                    console.log(err);
                    setError(err.response.data.message);
                });
        } else if (action === "UPDATE") {
            ProfileService.update(profile._id, formData)
                .then(() => {
                    setSuccess("Profile successfully updated.");
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    setError(err.response.data.message);
                });
        }
    };

    const toggle = () => {
        setModal(!modal);
    };

    const openGI = () => {
        setGI(!GI);
    };

    return (
        <>
            <Container>
                <Row className="mt-5 mb-5">
                    <Col lg="12">
                        <h3>Please fill all your resume information on the form below:</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg="10">
                        <Form onSubmit={(e) => submit(e)}>
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md="6">
                                            <h2>Basic informations:</h2>
                                        </Col>
                                        <Col md="6" className="text-right">
                                            <Button outline size="sm" color="info" onClick={openGI}>
                                                Collapse section
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="12">
                                            <Collapse isOpen={GI}>
                                                <Row>
                                                    <Col md="6" className="mt-5">
                                                        <FileUploader
                                                            onFileSelectSuccess={(file) =>
                                                                setProfile({
                                                                    ...profile,
                                                                    photo: file
                                                                })
                                                            }
                                                            onFileSelectError={({ error }) =>
                                                                alert(error)
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md="6">
                                                        {typeof profile.photo === "string" && (
                                                            <img
                                                                width="250px"
                                                                height="250px"
                                                                src={profile.photo}
                                                                crossOrigin="anonymous"
                                                            ></img>
                                                        )}
                                                    </Col>
                                                </Row>

                                                <FormGroup>
                                                    <Label for="fullName">Your full name:</Label>
                                                    <Input
                                                        value={profile.fullName}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                fullName: e.target.value
                                                            })
                                                        }
                                                        type="text"
                                                        name="fullName"
                                                        id="fullName"
                                                        placeholder="Full name"
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="proEmail">
                                                        Your professional email:
                                                    </Label>
                                                    <Input
                                                        value={profile.proEmail}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                proEmail: e.target.value
                                                            })
                                                        }
                                                        type="email"
                                                        name="proEmail"
                                                        id="proEmail"
                                                        placeholder="Email"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="headline">
                                                        Your resume headline:
                                                    </Label>
                                                    <Input
                                                        value={profile.headline}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                headline: e.target.value
                                                            })
                                                        }
                                                        type="text"
                                                        name="headline"
                                                        id="headline"
                                                        placeholder="Headline"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="birthdate">Your birth date:</Label>
                                                    <DatePicker
                                                        required
                                                        id="birthdate-datepicker"
                                                        value={profile.birthDate}
                                                        dateFormat="MM/YYYY"
                                                        onChange={(v, f) =>
                                                            setProfile({ ...profile, birthDate: f })
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="phone">Your phone number:</Label>
                                                    <Input
                                                        value={profile.phone}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                phone: e.target.value
                                                            })
                                                        }
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="Phone number"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="address">Your full address:</Label>
                                                    <Input
                                                        value={profile.address}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                address: e.target.value
                                                            })
                                                        }
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        placeholder="Country city street number..."
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="sumamry">Your sumamry:</Label>
                                                    <Input
                                                        maxLength="400"
                                                        value={profile.summary}
                                                        required
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                summary: e.target.value
                                                            })
                                                        }
                                                        type="textarea"
                                                        name="sumamry"
                                                        id="sumamry"
                                                        placeholder="Sumamry..."
                                                    />
                                                    <FormText color="muted">
                                                        Max size: 400*
                                                    </FormText>
                                                </FormGroup>
                                            </Collapse>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Experience
                                exp={profile.experiences}
                                getExperiences={(e) => {
                                    setProfile({ ...profile, experiences: e });
                                }}
                            ></Experience>

                            <Education
                                educ={profile.education}
                                getEducations={(e) => {
                                    setProfile({ ...profile, education: e });
                                }}
                            ></Education>

                            <Certification
                                certs={profile.certifications}
                                getCertifications={(e) => {
                                    setProfile({ ...profile, certifications: e });
                                }}
                            ></Certification>

                            <Row>
                                <Col>
                                    <Skill
                                        key={skillKey}
                                        selectedSkills={profile.skills}
                                        getSelectedSkills={(e) => {
                                            setProfile({ ...profile, skills: e });
                                        }}
                                    ></Skill>
                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col>
                                    <FormGroup>
                                        <Label for="interests">Interests:</Label>
                                        <Input
                                            maxLength="200"
                                            value={profile.interests}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    interests: e.target.value
                                                })
                                            }
                                            type="text"
                                            name="interests"
                                            id="interests"
                                            placeholder="Interests..."
                                        />
                                        <FormText className="muted">Max size: 200*</FormText>
                                        <FormText className="muted">
                                            Comma separated values*
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12" className="mt-5">
                                    {error && <Alert color="danger">{error}</Alert>}
                                    {success && <Alert color="success">{success}</Alert>}
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col md="6">
                                    <Button size="lg" color="primary" type="submit">
                                        Submit
                                    </Button>
                                </Col>

                                <Col md="6" className="text-right">
                                    <Button onClick={toggle} color="info" size="lg" type="button">
                                        Generate PDF
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <TemplatesModal toggle={toggle} modalStatus={modal}></TemplatesModal>
        </>
    );
}

export default Profile;
