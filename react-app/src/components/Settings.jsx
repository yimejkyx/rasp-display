import React, {useContext} from 'react';
import {SettingsContext} from "../contexts/SettingsContext";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Loading from "./Loading";
import {useHistory} from "react-router";

const Settings = () => {
    const history = useHistory();
    const { settings, setSettings } = useContext(SettingsContext);

    if (!settings) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
            <Row>
                <Col className="p-2">
                    <Button block size="sm" onClick={() => history.push('/')}>back</Button>
                </Col>
            </Row>
            <div>
                <h1>Settings</h1>
                <Form>
                    <FormGroup>
                        <Label>CoinMarketCap API Key</Label>
                        <Input
                            value={settings.coinMarketCapApiKey || ''}
                            placeholder={"Enter API key"}
                            onChange={(e) => {
                                const value = e?.target?.value || null;
                                setSettings({
                                    ...settings,
                                    coinMarketCapApiKey: value
                                });
                            }}
                        />
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
};

export default Settings;