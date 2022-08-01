import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    CardHeader,
    CardBody,
    Card,
    Row,
    Col,
    Alert,
    ModalFooter
} from "reactstrap";
import TemplateService from "../../services/template.service";
import AuthService from "../../services/auth.service";
import ProfileService from "../../services/profile.service";
import { saveAs } from "file-saver";

function TemplatesModal({ modalStatus, toggle }) {
    const [templates, setTemplates] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        TemplateService.getAll()
            .then((res) => {
                setTemplates(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const generatePDF = (template) => {
        setError("");
        setLoading(true);
        const data = { template, userId: AuthService.getUser()._id };
        ProfileService.generatePDF(data)
            .then((res) => {
                toggle();
                let buff = new Uint8Array(res.data.data);
                let blob = new Blob([buff]);
                saveAs(blob, "resume.pdf");
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response.data.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <Modal size="lg" isOpen={modalStatus} toggle={toggle}>
                <ModalHeader className="text-align-center" toggle={toggle}>
                    Choose the template you like to generate your PDF resume!
                </ModalHeader>
                {!loading && (
                    <ModalBody>
                        <Row>
                            <Col lg="12">{error && <Alert color="danger">{error}</Alert>}</Col>
                        </Row>

                        {templates &&
                            templates.map((temp, i) => {
                                return (
                                    <Card
                                        disabled={loading}
                                        onClick={() => generatePDF(temp._id)}
                                        className="template-card d-inline-block mr-3"
                                        key={i}
                                    >
                                        <CardHeader>{temp.title}</CardHeader>
                                        <CardBody>
                                            <div className="template">
                                                <img
                                                    className="template-image"
                                                    crossOrigin="anonymous"
                                                    src={temp.photo}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                    </ModalBody>
                )}
                {loading && (
                    <ModalFooter>
                        <Row className="mx-auto">
                            <Col md="12">We are generating your PDF resume! please wait...</Col>
                        </Row>
                    </ModalFooter>
                )}
            </Modal>
        </div>
    );
}

export default TemplatesModal;
