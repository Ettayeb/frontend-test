import React, { useState } from "react";

import {
    FormGroup,
    Label,
    CardBody,
    Card,
    CardHeader,
    Input,
    Button,
    Row,
    Col,
    FormText,
    Collapse
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

const Experience = ({ exp, getExperiences }) => {
    const now = new Date().toISOString();
    const [openExp, setOpenExp] = useState(false);
    const newExperience = () => {
        exp = [...exp, { title: "", company: "", description: "", startDate: now, endDate: now }];
        getExperiences(exp);
    };

    const removeExperience = (e, i) => {
        let data = [...exp];

        if (data && data.length) {
            data.splice(i, 1);
            getExperiences(data);
        }
    };

    const startDateChange = (startDate, f, i) => {
        let data = [...exp];
        data[i].startDate = f;
        getExperiences(data);
    };
    const endDateChange = (endDate, f, i) => {
        let data = [...exp];
        data[i].endDate = f;
        getExperiences(data);
    };
    const titleChange = (e, i) => {
        let data = [...exp];
        data[i].title = e.target.value;
        getExperiences(data);
    };
    const companyChange = (e, i) => {
        let data = [...exp];
        data[i].company = e.target.value;
        getExperiences(data);
    };
    const descriptionChange = (e, i) => {
        let data = [...exp];
        data[i].description = e.target.value;
        getExperiences(data);
    };

    const toggleExp = () => setOpenExp(!openExp);

    return (
        <Card className="mt-5">
            <CardHeader>
                <Row>
                    <Col md="6">
                        <h2>Working experiences:</h2>
                    </Col>
                    <Col md="6" className="text-right">
                        <Button outline size="sm" color="info" onClick={toggleExp}>
                            Collapse section
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Collapse isOpen={openExp}>
                <CardBody>
                    {exp &&
                        exp.map((experience, i) => {
                            return (
                                <div key={i}>
                                    <Row>
                                        <Col lg="12" align="right">
                                            <Button
                                                onClick={(e) => removeExperience(e, i)}
                                                className="btn btn-danger"
                                            >
                                                {" "}
                                                X
                                            </Button>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="title">Your title:</Label>
                                        <Input
                                            required
                                            value={experience.title}
                                            onChange={(e) => titleChange(e, i)}
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Title"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="company">Company name:</Label>
                                        <Input
                                            required
                                            value={experience.company}
                                            onChange={(e) => companyChange(e, i)}
                                            type="text"
                                            name="company"
                                            id="company"
                                            placeholder="Company name"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="startDate">Start date:</Label>
                                        <DatePicker
                                            required
                                            id={"sde-datepicker" + i}
                                            value={experience.startDate}
                                            dateFormat="MM/YYYY"
                                            onChange={(v, f) => startDateChange(v, f, i)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="endDate">End date:</Label>
                                        <DatePicker
                                            required
                                            id={"ede-datepicker" + i}
                                            value={experience.endDate}
                                            dateFormat="MM/YYYY"
                                            onChange={(v, f) => endDateChange(v, f, i)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="description">Description:</Label>
                                        <Input
                                            maxLength="400"
                                            required
                                            value={experience.description}
                                            onChange={(e) => descriptionChange(e, i)}
                                            type="textarea"
                                            name="description"
                                            id="description"
                                            placeholder="Description"
                                        />
                                        <FormText color="muted">Max size: 400*</FormText>
                                    </FormGroup>
                                </div>
                            );
                        })}

                    <Row>
                        <Col lg="12" align="right">
                            <Button onClick={newExperience} className="btn btn-success">
                                {" "}
                                Add new work experience
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default Experience;
