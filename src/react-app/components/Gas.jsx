import {useHistory} from "react-router";
import {Button, Col, Row} from "reactstrap";
import React from "react";

const Gas = () => {
    const history = useHistory();
    return (
        <div>
            <Row>
                <Col className="p-2">
                    <Button block size="sm" onClick={() => history.push('/')}>back</Button>
                </Col>
            </Row>
            <div>
                <h1>Gas</h1>
            </div>
        </div>
    );
};

export default Gas;
