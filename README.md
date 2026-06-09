# Weather Now

a weather app we built for ict 211. you search a city and it shows the current weather and the next 5 days. uses the open-meteo api (its free, no api key needed).

## how to run

```
npm install
npm run dev
```

then open the link it gives you (usually localhost:5173).

## what it does

- search any city
- current temp, feels like, humidity, wind
- 5 day forecast
- weather icons
- background changes with the weather
- dark mode (saves your choice)

## notes

api is from https://open-meteo.com . it gives weather codes (numbers) so i made a file weatherCodes.js to match them to icons and labels.

todo maybe later:
- save favourite cities
- use my location automatically
