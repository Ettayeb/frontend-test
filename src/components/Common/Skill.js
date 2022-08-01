import React, { useState } from "react";

import { FormGroup, Label, CardBody, Card } from "reactstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import SkillService from "../../services/skill.service";

const Skill = ({ getSelectedSkills, selectedSkills }) => {
    const [skills, setSkills] = useState(selectedSkills);

    const skillsSearch = (string) => {
        if (string === "") {
            return;
        } else {
            SkillService.search({ title: string })
                .then((res) => {
                    setSkills(res.data);
                })
                .catch(() => {});
        }
    };
    const skillsSelect = (items) => {
        if (items) {
            let sk = [];
            items.map((item) => {
                sk.push(item._id);
                getSelectedSkills(sk);
            });
        } else {
            getSelectedSkills([]);
        }
    };

    return (
        <Card className="mt-5">
            <CardBody>
                <h2>Skills: </h2>

                <FormGroup>
                    <Label for="skills">Skills:</Label>
                    <AsyncTypeahead
                        required
                        defaultSelected={selectedSkills}
                        isLoading={false}
                        id="async-pagination"
                        minLength={2}
                        onSearch={skillsSearch}
                        labelKey="title"
                        onChange={(selected) => skillsSelect(selected)}
                        options={skills}
                        multiple
                    />
                </FormGroup>
            </CardBody>
        </Card>
    );
};

export default Skill;
