# SmartCars

# Presentation

>This is a car race game played by a genetic algorithm. This is my first program using genetic algorithm. You can see the program [here](https://hanzopgp.github.io/SmartCars/index.html).

## How does it work :

- At the beginning, a population of cars is randomly moving on the map. 
- The closer the cars gets to the finish line, the higher fitness they get. 
- Managing to cross the finishline multiply the car's fitness value.
- Crashing in a wall reduces it.
- If their fitness is high, they are more likely to reproduce.
- There is a limited time for them to race.
- When the time is over, we get a new population, each cars receive some mutations.
- Those mutations are just a tiny random difference in their DNA.
- Their DNA is all the values assigned to their movements.
- Thanks to all that stuff, the population evolves.
- Green cars are the children of former generation's best cars.
- Red cars are the crashed cars.
- Blue cars are the normal cars.

## How to use :

- git clone this repository
- Put **index.html** in your browser
- Use 'P' to pause the simulation
- Settings are currently at the top of **sketch.js**

## Links :

- https://p5js.org/
- https://en.wikipedia.org/wiki/Genetic_algorithm

## Current TODO :

//Add time remaning as a factor for cars fitness
//add magnitude as part of DNA
//Change graphics
