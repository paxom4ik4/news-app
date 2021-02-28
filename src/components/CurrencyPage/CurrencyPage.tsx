import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faEuroSign,
  faHryvnia,
  faPoundSign,
  faRubleSign,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Jumbotron } from "reactstrap";
import "./CurrencyPage.css";
import { ICurrencyPageProps } from "../../interfaces/ComponentsProps";
import { Currencies } from "../../currencies/currencies";
import CryptoApi from "../../currencies/cryptoService";

const CurrencyPage: React.FC<ICurrencyPageProps> = ({
  setCurrencyPage,
  isCurrencyPage,
  darkMode,
}) => {
  const currencies = new Currencies();
  const [usdRate, setUsdRate] = useState<number>(0);
  const [eurRate, setEurRate] = useState<number>(0);
  const [rubRate, setRubRate] = useState<number>(0);
  const [uanRate, setUanRate] = useState<number>(0);
  const [gbpRate, setGbpRate] = useState<number>(0);

  const [isError, setError] = useState<boolean>(false);

  const getCurrency = () => {
    const usdRate = currencies.getCurrencyRate(145);
    usdRate
      .then((res) => res.json())
      .then((data) => setUsdRate(data.Cur_OfficialRate))
      .catch(() => setError(true));
    const eurRate = currencies.getCurrencyRate(292);
    eurRate
      .then((res) => res.json())
      .then((data) => setEurRate(data.Cur_OfficialRate));

    const rubRate = currencies.getCurrencyRate(298);
    rubRate
      .then((res) => res.json())
      .then((data) => setRubRate(data.Cur_OfficialRate));

    const uanRate = currencies.getCurrencyRate(290);
    uanRate
      .then((res) => res.json())
      .then((data) => setUanRate(data.Cur_OfficialRate));
    const gbpRate = currencies.getCurrencyRate(143);
    gbpRate
      .then((res) => res.json())
      .then((data) => setGbpRate(data.Cur_OfficialRate));
  };

  useEffect(() => {
    getCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeIcon = <FontAwesomeIcon icon={faTimes} />;

  const usdIcon = <FontAwesomeIcon icon={faDollarSign} />;
  const eurIcon = <FontAwesomeIcon icon={faEuroSign} />;
  const gbpIcon = <FontAwesomeIcon icon={faPoundSign} />;
  const rubIcon = <FontAwesomeIcon icon={faRubleSign} />;
  const uanIcon = <FontAwesomeIcon icon={faHryvnia} />;

  const cryptoApi = new CryptoApi();
  const [cryptoItems, setCryptoItems] = useState<[]>([]);

  const [isLoading, setLoading]: any = useState<boolean>(true);

  useEffect(() => {
    const data = cryptoApi.getData("USD");
    data.then((res: any) => res.json().then((res: any) => setCryptoItems(res)));
    setLoading(!isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currencyItems = cryptoItems.map(
    (item: { id: string; price: string; logo_url: string }, index: number) => {
      return (
        <div className="currency-card" key={index}>
          <div className="currency-card-heading">
            <img
              src={item.logo_url}
              alt="logo-crypto"
              className="crypto-logo"
            />{" "}
            {item.id}
          </div>
          <div className="currency-card-rate">
            {item.price} {usdIcon}
          </div>
        </div>
      );
    }
  );
  const currencyPageClass = isCurrencyPage
    ? "currency-page"
    : "currency-page-close";

  const currencyPageJumbClass = darkMode
    ? "currency-page-jumb-dark"
    : "currency-page-jumb";

  return (
    <div className={currencyPageClass}>
      <Jumbotron className={currencyPageJumbClass}>
        <div
          className="currency-page-close-btn"
          onClick={() => {
            setCurrencyPage();
          }}
        >
          {closeIcon}
        </div>
        {isError ? (
          <div className="currency-error">
            Ошибка на сервере. <br />
            <div
              onClick={() => {
                getCurrency();
              }}
            >
              Перезагрузите приложение
            </div>
          </div>
        ) : (
          <div className="currency-page-content">
            <div className="currency-page-heading">
              <h3>Курсы Валют</h3>
            </div>
            <div className="currencies-cards">
              <div className="currency-card">
                <div className="currency-card-heading">{usdIcon} USD</div>
                <div className="currency-card-rate">{usdRate} BYN</div>
              </div>
              <div className="currency-card">
                <div className="currency-card-heading">{eurIcon} EUR</div>
                <div className="currency-card-rate">{eurRate} BYN</div>
              </div>
              <div className="currency-card">
                <div className="currency-card-heading">{gbpIcon} GBP</div>
                <div className="currency-card-rate">{gbpRate} BYN</div>
              </div>
              <div className="currency-card">
                <div className="currency-card-heading">{rubIcon} RUB</div>
                <div className="currency-card-rate">{rubRate} BYN</div>
              </div>
              <div className="currency-card">
                <div className="currency-card-heading">{uanIcon} UAN</div>
                <div className="currency-card-rate">{uanRate} BYN</div>
              </div>
            </div>
            <div className="currency-page-heading">
              <h3>Курсы криптовалют</h3>
            </div>
            <div className="currencies-cards-crypto">{currencyItems}</div>
          </div>
        )}
      </Jumbotron>
    </div>
  );
};

export default CurrencyPage;
