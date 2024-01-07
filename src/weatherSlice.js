import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {};
export const fetchWeather = createAsyncThunk("weather", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=afab42ab5405b6b26fb217767f3f293f"
    // {
    //   cancelToken: new axios.CancelToken((g) => {
    //     token = g;
    //   }),
    // }
  );

  // handle success
  let responseTemp = Math.round(response.data.main.temp - 272.15);
  let weather = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let min = Math.round(response.data.main.temp_min - 272.15);
  let mas = Math.round(response.data.main.temp_max - 272.15);
  let des = response.data.weather[0].description;
  console.log(response);
  initialState = {
    result: "result",
    isLoading: false,
    // weather: { responseTemp, weather, min, mas, des },
  };
  return { responseTemp, weather, min, mas, des };
});

export const weatherSlice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {
    addresult: (state, action) => {
      console.log("state, action");
    },
  },
  extraReducers(bulder) {
    bulder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log("====================================");
        console.log(state);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addresult } = weatherSlice.actions;
export default weatherSlice.reducer;
