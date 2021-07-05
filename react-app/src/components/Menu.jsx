import {useHistory} from "react-router";
import {Button, Col, Row} from "reactstrap";
import React, {useContext} from "react";
import {SettingsContext} from "../contexts/SettingsContext";
import Loading from "./Loading";
import electron from "../utils/electron-react-wrapper";

const Menu = () => {
    const history = useHistory();
    const { settings } = useContext(SettingsContext);

    if (!settings) {
        return <Loading/>
    }

    return (
        <>
            <Row className="h-50">
                <Col xs={6} className="p-2">
                    <Button disabled={!settings.coinMarketCapApiKey} className="dashboard" block onClick={() => history.push('/crypto')}><h1>Crypto</h1></Button>
                </Col>
                <Col xs={6} className="p-2">
                    <Button className="dashboard" block onClick={() => history.push('/gas')}><h1>Gas</h1></Button>
                </Col>
            </Row>
            <Row className="h-50">
                <Col xs={6} className="p-2">
                    <Button className="dashboard" block onClick={() => history.push('/settings')}><h1>Settings</h1></Button>
                </Col>
                <Col xs={6} className="p-2">
                    <Button disabled className="dashboard" block onClick={() => {
                        electron.ipcRenderer.send('exit-app');
                    }}><h1>Exit</h1></Button>
                </Col>
            </Row>
        </>
    )
};

export default Menu;
