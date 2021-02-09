# Dijkstra's Route

![Airlines Thumbnail](./public/thumbnail.jpg)

**Dijkstra's Route** is an app that allows the user to find the shortest distance between two airports.  Select a departure airport from a dropdown menu or by clicking on any green dot on the map.  Select an arrival airport from the second dropdown menu or by clicking on a red circle on  the map.  

Clicking calculate route will show the shortest path between the two airports as calculated by [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).  Paths are calculated using a limited data set and not all airports are interconnected.  Some paths might _look_ circuitous and others might not be possible.

For implementing Dijkstra's algorithm I followed a great explanation presented in [A Common Sense Guide to Data Structures and Algorithms](https://pragprog.com/titles/jwdsal2/a-common-sense-guide-to-data-structures-and-algorithms-second-edition/) by _Jay Wengrow_.

This App was built with React and deployed on [Heroku](https://whispering-tor-12498.herokuapp.com/)

Code can be found in [this](https://github.com/eustisic/dijkstra_route) repository.

Enjoy!
