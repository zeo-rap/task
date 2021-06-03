import React, { useState } from "react";
import "./App.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FlagText from "./components/FlagText";
import walletLogo from "./img/wallet_logo.webp";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { lanToCounrty } from "./flagsAndCodes";

function App() {
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState({
    countryCode: lanToCounrty[i18n.language],
    number: "",
  });
  const [code, setCode] = useState();
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState({ number: false, code: false });
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setPhone((prev) => ({
      ...prev,
      countryCode: lanToCounrty[i18n.language],
    }));
  };

  return (
    <div className="app">
      <div className="header">
        <Select
          className="header__languageSelect"
          value={i18n.language}
          onChange={handleChange}
        >
          <MenuItem value={"cn"}>
            <FlagText country="CN" text="CN" />
          </MenuItem>
          <MenuItem value={"pt"}>
            <FlagText country="BR" text="PT" />
          </MenuItem>
        </Select>
      </div>
      <div className="section">
        <img className="section__walletLogo" src={walletLogo} alt="" />
        <TextField
          className="section__input"
          id="outlined-basic"
          label={t("phone_title")}
          placeholder={t("phone_place")}
          variant="outlined"
          value={phone.number}
          error={error.number}
          onChange={(event) => {
            let value = event.target.value.slice(0, 11).replaceAll(/\D/g, "");
            setPhone((prev) => ({
              ...prev,
              number: value,
            }));
            setError((prev) => ({ ...prev, number: value.length !== 11 }));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  value={phone.countryCode}
                  onChange={(event) => {
                    setPhone((prev) => ({
                      ...prev,
                      countryCode: event.target.value,
                    }));
                  }}
                >
                  <MenuItem value={"+86"}>
                    <FlagText country="CN" text="+86" />
                  </MenuItem>
                  <MenuItem value={"+55"}>
                    <FlagText country="BR" text="+55" />
                  </MenuItem>
                </Select>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="section__input"
          label={t("verify_title")}
          variant="outlined"
          placeholder={t("verify_place")}
          value={code}
          error={error.code}
          onChange={(event) => {
            let value = event.target.value.slice(0, 6).replaceAll(/\D/g, "");
            setCode(value);
            setError((prev) => ({ ...prev, code: value.length !== 6 }));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className="section__smsButton"
                  variant="contained"
                  disabled={timer !== 60 || phone.number.length !== 11}
                  onClick={() => {
                    let interval = setInterval(() => {
                      setTimer((prev) => {
                        let newTimer = prev - 1;
                        if (newTimer < 0) {
                          clearInterval(interval);
                          return 60;
                        }
                        return newTimer;
                      });
                    }, 1000);
                  }}
                >
                  {timer === 60 ? t("verify_send") : timer + "s"}
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <Button className="section__button" variant="contained">
          {t("login")}
        </Button>
      </div>
    </div>
  );
}

export default App;
