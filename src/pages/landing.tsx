import React, { useEffect, useState } from "react";
import "./landing.scss";
import axios from "axios";
import { Second } from "../api/url";
import Loading from "../assets/loading.png";
import { useDispatch, useSelector } from "react-redux";
import {
  exchange,
  increment,
  setFirstCurRate,
  setSecondCurRate,
} from "../store/walletSlice";

const Landing = () => {
  // hooks
  const dispatch = useDispatch();
  // states
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("CAD");
  const [loading, setLoading] = useState(false);
  const [rateFirst, setRateFirst] = useState(0);
  const [rateSec, setRateSec] = useState(0);
  const [rate, setRate] = useState(0);
  const [walletRate, setWalletRate] = useState(1);
  const [enterValue, setEnterValue] = useState("");
  const [secondValue, setSecondValue] = useState(0);

  // redux store
  const wallets = useSelector((state: any) => state.wallet);

  const getRates = () => {
    setLoading(true);
    axios
      .get(`${Second}`)
      .then((res) => {
        setLoading(false);
        setRateFirst(res.data?.rates[firstCurrency]);
        setRateSec(res.data?.rates[secondCurrency]);
        dispatch(setFirstCurRate(res.data?.rates[secondCurrency]));

        setRate(
          +(
            res.data?.rates[secondCurrency] / res.data?.rates[firstCurrency]
          ).toFixed(2)
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getRates();
    setEnterValue("");
    setSecondValue(0);
  }, [firstCurrency, secondCurrency]);

  const handleFirstCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFirstCurrency(e.target.value);
  };
  const handleSecondCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSecondCurrency(e.target.value);
    dispatch(setSecondCurRate(rateSec));
    setWalletRate(wallets.secondCurRate / wallets.firstCurRate);

    dispatch(exchange(walletRate));
  };
  const handleEnterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterValue(e.target.value);
    setSecondValue(+(+e.target.value * rate).toFixed(2));
  };

  const handleSwap = () => {
    dispatch(increment(secondValue));
  };

  return (
    <div className="container">
      <div className="container__firstWallet">
        <div className="container__side">
          <select
            defaultValue={"USD"}
            className="container__firstWallet__selection"
            onChange={handleFirstCurrency}
          >
            <option value={"USD"}>USD</option>
            <option value={"GBP"}>GBP</option>
            <option value={"EUR"}>EUR</option>
          </select>
          <div className="container__wallet">
            {firstCurrency} {wallets?.firstWalletValue}
          </div>
        </div>
        <input
          type="number"
          step={1}
          value={enterValue}
          onChange={handleEnterValue}
          min={0}
          autoFocus
          placeholder="0"
        />
      </div>
      <div className="container__rate">
        {loading ? (
          <img src={Loading} alt="loading" />
        ) : (
          `1 ${firstCurrency} = ${rate} ${secondCurrency}`
        )}
      </div>
      <div className="container__secondWallet">
        <div className="container__side">
          <select
            defaultValue={"GBP"}
            className="container__firstWallet__selection"
            onChange={handleSecondCurrency}
          >
            <option value={"CAD"}>CAD</option>
            <option value={"IRR"}>IRR</option>
            <option value={"AED"}>AED</option>
          </select>
          <div className="container__wallet">
            {secondCurrency} {wallets?.secondWalletValue}
          </div>
        </div>
        <div className="container__secondValue">{secondValue}</div>
      </div>
      <div className="btn" onClick={handleSwap}>
        Exchange
      </div>
    </div>
  );
};

export default Landing;
