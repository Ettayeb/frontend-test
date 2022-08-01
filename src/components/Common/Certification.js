import React, { useState } from "react";

import {
    FormGroup,
    Label,
    CardBody,
    CardHeader,
    Card,
    Input,
    Button,
    Row,
    Col,
    Collapse
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

const Certification = ({ certs, getCertifications }) => {
    const now = new Date().toISOString();
    const [openCert, setOpenCert] = useState(false);
    const newCertification = () => {
        certs = [...certs, { title: "", date: now }];
        getCertifications(certs);
    };

    const removeCertification = (e, i) => {
        if (certs && certs.length) {
            let data = [...certs];
            data.splice(i, 1);
            getCertifications(data);
        }
    };

    const certTitleChange = (e, i) => {
        let data = [...certs];
        data[i].title = e.target.value;
        getCertifications(data);
    };

    const certificationDateChange = (date, f, i) => {
        let data = [...certs];
        data[i].date = f;
        getCertifications(data);
    };

    const toggleCert = () => setOpenCert(!openCert);

    return (
        <Card className="mt-5">
            <CardHeader>
                <Row>
                    <Col md="6">
                        <h2>Certifications:</h2>
                    </Col>
                    <Col md="6" className="text-right">
                        <Button outline size="sm" color="info" onClick={toggleCert}>
                            Collapse section
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Collapse isOpen={openCert}>
                <CardBody>
                    {certs &&
                        certs.map((certification, i) => {
                            return (
                                <div key={i}>
                                    <Row>
                                        <Col lg="12" align="right">
                                            <Button
                                                onClick={(e) => removeCertification(e, i)}
                                                className="btn btn-danger"
                                            >
                                                {" "}
                                                X
                                            </Button>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="title">Title:</Label>
                                        <Input
                                            required
                                            value={certification.title}
                                            onChange={(e) => certTitleChange(e, i)}
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Title"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="date">Date:</Label>
                                        <DatePicker
                                            required
                                            id={"sdc-datepicker" + i}
                                            value={certification.date}
                                            dateFormat="MM/YYYY"
                                            onChange={(v, f) => certificationDateChange(v, f, i)}
                                        />
                                    </FormGroup>
                                </div>
                            );
                        })}

                    <Row>
                        <Col lg="12" align="right">
                            <Button onClick={newCertification} className="btn btn-success">
                                {" "}
                                Add new certification
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default Certification;
