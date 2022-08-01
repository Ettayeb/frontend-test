import React, { useState } from "react";

import {
    FormGroup,
    Label,
    CardBody,
    Card,
    Input,
    Button,
    Row,
    Col,
    CardHeader,
    Collapse
} from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

const Education = ({ educ, getEducations }) => {
    const now = new Date().toISOString();
    const [openEduc, setOpenEduc] = useState(false);
    const newEducation = () => {
        educ = [...educ, { diploma: "", university: "", startDate: now, endDate: now }];
        getEducations(educ);
    };

    const removeEducation = (e, i) => {
        if (educ && educ.length) {
            let data = [...educ];
            data.splice(i, 1);
            getEducations(data);
        }
    };

    const diplomaChange = (e, i) => {
        let data = [...educ];
        data[i].diploma = e.target.value;
        getEducations(data);
    };
    const universityChange = (e, i) => {
        let data = [...educ];
        data[i].university = e.target.value;
        getEducations(data);
    };

    const educationStartDateChange = (startDate, f, i) => {
        let data = [...educ];
        data[i].startDate = f;
        getEducations(data);
    };
    const educationEndDateChange = (endDate, f, i) => {
        let data = [...educ];
        data[i].endDate = f;
        getEducations(data);
    };

    const toggleEduc = () => setOpenEduc(!openEduc);

    return (
        <Card className="mt-5">
            <CardHeader>
                <Row>
                    <Col md="6">
                        <h2>Education:</h2>
                    </Col>
                    <Col md="6" className="text-right">
                        <Button outline size="sm" color="info" onClick={toggleEduc}>
                            Collapse section
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Collapse isOpen={openEduc}>
                <CardBody>
                    {educ &&
                        educ.map((education, i) => {
                            return (
                                <div key={i}>
                                    <Row>
                                        <Col lg="12" align="right">
                                            <Button
                                                onClick={(e) => removeEducation(e, i)}
                                                className="btn btn-danger"
                                            >
                                                {" "}
                                                X
                                            </Button>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="diploma">Your diploma:</Label>
                                        <Input
                                            required
                                            value={education.diploma}
                                            onChange={(e) => diplomaChange(e, i)}
                                            type="text"
                                            name="diploma"
                                            id="diploma"
                                            placeholder="Diploma"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="university">University:</Label>
                                        <Input
                                            required
                                            value={education.university}
                                            onChange={(e) => universityChange(e, i)}
                                            type="text"
                                            name="university"
                                            id="university"
                                            placeholder="University"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="startDate">Start date:</Label>
                                        <DatePicker
                                            required
                                            id={"sded-datepicker" + i}
                                            value={education.startDate}
                                            dateFormat="MM/YYYY"
                                            onChange={(v, f) => educationStartDateChange(v, f, i)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="endDate">End date:</Label>
                                        <DatePicker
                                            required
                                            id={"eded-datepicker" + i}
                                            value={education.endDate}
                                            dateFormat="MM/YYYY"
                                            onChange={(v, f) => educationEndDateChange(v, f, i)}
                                        />
                                    </FormGroup>
                                </div>
                            );
                        })}

                    <Row>
                        <Col lg="12" align="right">
                            <Button onClick={newEducation} className="btn btn-success">
                                {" "}
                                Add new education
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default Education;
