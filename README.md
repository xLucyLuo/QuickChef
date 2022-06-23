# <a href="https://xlucyluo.github.io/QuickChef/"><h1>Quick Chef</h1></a> 

**<a href="https://xlucyluo.github.io/QuickChef/">Quick Chef</a>** is a cooking game where the goal is to collect as much points as possible by fulfilling recipe/order requests over a set timer (5min).

+ The Player will use key-combos to perform actions required to make recipes (currying). 
+ Fetching and processing ingredients will take time to finish, represented by queues of falling ingredient/processed food items over the timer duration (async). 
+ The Player can move left, right and jump to catch falling items, as well as drop and pick-up items in the Aseembly Station.
+ To "complete" a recipe, the Player will need to collect the required ingredients and chain processing actions in the correct order (sequence key generation & matching logic)
+ At any time, the Player can serves held item(s), which will either increase points and generate a new recipe if it matches an order, otherwise everything is thrown out.

<ins>**Additional Features:**</ins>
+ **Music:**
    + Background music will change/speed-up depending on the time remaining (Tone.js).
    + various sound effects will play on different actions.
    + Player can mute the music at any time.


# Technologies, Libraries, APIs

- Canvas API to render images and moving objects
- Tone.js library to control three different background music (fading, overlaying, timing, muting)
- Webpack and Babel to bundle and transpile the source JavaScript code
- npm to manage project dependencies


# Game Interface

![Intro Interface](https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/intro_interface.png)

![Game Interface](https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/game_interface.png)

![Game Over Interface](https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/game_over.png)


# Bonus Features
- Multiplayer Mode (co-op / competitive)
- Click Mode (full functionality without keyboard for mobile compatibility)
- Top Scoreboard (back-end)