# Weather Dashboard App

## Purpose
This weather application serves as a quick way to find current and future weather by searching for a city. The current weather shows temp, wind speed, humidity, and UV index, along with an icon to represent the weather. The future forecast shows the date and all of the previously mentioned stats except for UV index. It also saves your cities in a history section.

## Functionality 
The app uses the openweathermap API to search for weather by city name and display the relevant results on the page. It then saves each successful search to localStorage and displays it in the history section, which can be clicked on to bring up that city's weather without having to search for it again. The background color of the UV index will change according to the severity of the UV index value.

## Issues
The only thing I felt that I struggled with was the layout of the page. I don't know if the mockup used Bootstrap like I did, but I had a bit of a hard time making mine look similar to it. I don't quite understand how to use Bootstrap very well when it comes to page layouts that appear to have multiple columns side by side with asymmetrical containers inside them. I ended up splitting them up in a way that made sense to me, but it lead to a potential issue if too many items are added to the history section.