import "./App.css";
import React, { useEffect, useState } from "react";
import {
  capitalize,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import moment from "moment/moment";
import "moment/min/locales";
import Button from "@mui/material/Button";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { json } from "react-router";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: "ibm",
  },
});

let lang = "ar";

function App() {
  const resultState = useSelector((state) => {
    console.log("the state is :" + state);
    return state.weather.isLoading;
  });
  const temp = useSelector((state) => {
    console.log("the state is :", state.weather);
    return state.weather.weather1;
  });
  console.log("///////////////////", temp);
  let dispatch = useDispatch();
  let [date, setdate] = useState("");
  let [langu, setlang] = useState("ar");
  function handle() {
    if (langu == "ar") {
      setlang("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      setdate(moment().format("ll"));
    } else {
      setlang("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
      setdate(moment().format("ll"));
    }
  }

  const { t, i18n } = useTranslation();
  let token = null;

  let [temp1, setTemp] = useState({
    responseTemp: null,
    min: null,
    mas: null,
    des: "",
    weather: "",
  });
  useEffect(() => {
    dispatch(fetchWeather());
    i18n.changeLanguage(langu);
    setdate(moment().format("ll"));

    return () => {
      console.log("finish mounting");
      token();
    };
  }, []);
  return (
    <div dir={langu == "ar" ? "rtl" : "ltr"}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div className="card">
            <div>
              <Stack direction="row" alignItems={"end"}>
                <Typography variant="h1">{t("Ryadh")}</Typography>
                <Typography
                  marginRight={"20px"}
                  marginLeft={"20px"}
                  variant="h5"
                >
                  {date}
                </Typography>
              </Stack>
            </div>
            <hr />
            <div
              className="content"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "50px",
              }}
            >
              <div className="description">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {resultState ? <CircularProgress /> : ""}
                  <Typography variant="h1">{temp.responseTemp}</Typography>
                  <Typography variant="h4">°</Typography>
                  <img
                    style={{
                      width: "100px",
                      aspectRatio: "1/1",
                      marginRight: "20px",
                    }}
                    src={temp.weather}
                    alt="one"
                  />
                </div>
                <div>
                  <Typography textTransform={"capitalize"} variant="h6">
                    {t(temp.des)}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "30px",
                    }}
                  >
                    <Typography variant="8">
                      {t("Min")}: {temp.min + "°"}
                    </Typography>
                    <Typography variant="8">|</Typography>
                    <Typography variant="8">
                      {t("Mix")} : {temp.mas + "°"}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="bigimage">
                <CloudRoundedIcon style={{ fontSize: "200" }} />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              handle();
            }}
            style={{
              float: "left",
              color: "white",
              marginTop: "10px",
              textTransform: "capitalize",
            }}
            variant="text"
          >
            {t("Arabic")}
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
