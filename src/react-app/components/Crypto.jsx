import {useHistory} from "react-router";
import React, {useContext, useEffect, useState} from "react";
import Loading from "./Loading";
import {Button, Col, Row, Table} from "reactstrap";
import {Icon} from "coinmarketcap-cryptocurrency-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import axios from "axios";
import {SettingsContext} from "../contexts/SettingsContext";

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

const FormatCrypto = ({value, dollar=false, percent=false}) => {
    const parsedValue = roundToTwo(value);

    if (percent) {
        const colorClassName = parsedValue > 0 ? 'text-success' : 'text-danger';
        return (
            <b className={`${colorClassName}`}>
                <FontAwesomeIcon icon={parsedValue > 0 ? faCaretUp : faCaretDown} /> <NumberFormat value={parsedValue} displayType={'text'} suffix={'%'} />
            </b>
        );
    }

    if (dollar) {
        return (
            <b>
                <NumberFormat value={parsedValue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </b>
        );
    }

    return (
        <b>
            <NumberFormat value={parsedValue} displayType={'text'} />
        </b>
    )
}

const Crypto = () => {
    const history = useHistory();
    const [cryptoData, setCryptoData] = useState(null);
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        let timeout = null;
        if (settings.coinMarketCapApiKey) {
            const fetchData = async () => {
                console.log('CRYPTO: fetching listings');

                // Make a request for a user with a given ID
                const {data: {data}} = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                    headers: {
                        'X-CMC_PRO_API_KEY': settings.coinMarketCapApiKey
                    },
                });
                setCryptoData(data);
            };
            fetchData();

            console.log('CRYPTO: Setting timeout');
            timeout = setInterval(fetchData, 1000 * 60 * 15); // second * minute * 10
        }

        return () => {
            console.log('CRYPTO: Clearing timeout');
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div style={{ fontSize: '14px'}}>
            {
                cryptoData ?
                    (
                        <Table>
                            <thead>
                            <tr>
                                <th className="text-right">#</th>
                                <th/>
                                <th className="text-right">price</th>
                                <th className="text-right">24h %</th>
                                <th className="text-right">7d %</th>
                                <th className="text-right">30d %</th>
                                <th className="text-right">vol. 24h</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {cryptoData.slice(0, 30).map((crypto) => {
                                return (
                                    <tr key={crypto.id}>
                                        <td className="text-right">
                                            <b>{crypto.cmc_rank}.</b>
                                        </td>
                                        <td style={{ fontSize: '12px'}}>
                                            <Icon size={16} i={crypto.symbol.toLocaleLowerCase()}/>
                                            {' '}
                                            <b>
                                                {crypto.name}
                                            </b>
                                        </td>
                                        <td className="text-right">
                                            <FormatCrypto dollar value={crypto.quote.USD.price}/>
                                        </td>
                                        <td className="text-right">
                                            <FormatCrypto percent value={crypto.quote.USD.percent_change_24h}/>
                                        </td>
                                        <td className="text-right">
                                            <FormatCrypto percent value={crypto.quote.USD.percent_change_7d}/>
                                        </td>
                                        <td className="text-right">
                                            <FormatCrypto percent value={crypto.quote.USD.percent_change_30d}/>
                                        </td>
                                        <td className="text-right" style={{ fontSize: '12px'}}>
                                            <FormatCrypto dollar value={crypto.quote.USD.volume_24h}/>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    ) : (
                        <Loading/>
                    )
            }
            <Row>
                <Col className="p-2">
                    <Button block size="sm" onClick={() => history.push('/')}>back</Button>
                </Col>
            </Row>
        </div>
    );
};

export default Crypto;
