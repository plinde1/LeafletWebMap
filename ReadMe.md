# Assignment 4
## Leaflet Web Map
## Pierson Linde

# Weather Map
### The Weather Map shows current weather and includes Extreme, Severe, and Minor alerts.
#### To create this map I followed the demo closely to ensure that all of my pieces of my map worked in comparison to the video. Once I created the demo, I simply added a few more lines of code to create alerts for Extreme and Mino weather alerts. I also made sure to change the base map by looking at the leaflet maps available and putting in a new map PNG to make the weather alerts pop more. 
<https://plinde1.github.io/LeafletWebMap/weather>

# Earthquake Map
### The Earthquake Map shows recent earthquake data and is color-coded based on severity (Green = 0-4, Yellow 5-6, Red 6+). Each point also has a pop-up that shows the earthquake's magnitude, location, and time. To create this map I took the bare bones from the weather map including the index.html and the weather.css and changed their names to the earthquake in my earthquake folder as well as changing the ref within the index to match the new earthquake data. I then changed the alert URL to the one available in the PDF so it would display the earthquake data. I the most challenging part was getting the points to show up based on the magnitude as well as color coding them. So I made sure that the points were different sizes based on magnitude and had them change color as well. Once the points showed up I created a pop-up that returned Location, Magnitude, and time using the same function from the Weather Map. The final touch was creating a simple key that denoted what each color meant so the map made more sense. This part of the assignment, as well as creating the bonus map was the most challenging for me.  

<https://plinde1.github.io/LeafletWebMap/earthquake>

# Bonus Map
### The Bouns Map combines the Weather Map data and the Earthquake Map data and a "Toggle" button that allows you to turn off one layer and display the other.
#### To create my bonus map I created a new folder and copied in the files from my weather map, Once I did that I renamed the files to match the bonus map assignment and made sure it worked independently of my other maps with the new name. I then added in my eathquakeAlertUrl and matching code to get both of the data sets to show up on the map on top of one another. Then I created a simple toggle button that made sure to replace the data with one set if the other was not present. This was a bit difficult to figure out and I had to make sure that the sets of data had unique variables so they could be distinct from one another. 
<https://plinde1.github.io/LeafletWebMap/Bonus>


