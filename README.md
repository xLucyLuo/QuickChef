# Background

**Quick Chef** is a cooking game where the goal is to collect as many points as possible by fulfilling recipe/order requests over a set timer (5min).

+ The Player will use key-combos to perform actions required to make recipes. 
+ Fetching and processing ingredients will take time to finish, represented by queues of falling ingredient/processed food items over the timer duration (async). 
+ To "complete" the action, the player needs to catch the item and then enter another key-combo to chain the next action.
+ At any time, the Player can choose to serve the items they have placed into an assembly station, which will run a matching logic. If items assembledmatch a recipe, points are collected, otherwise everything is thrown out.

# Functionality & MVPs

In **Quick Chef**, users will be able to:
- Use key combos to select ingredients and cooking actions
- Move left and right to catch falling ingredients
- Pause the game and mute music
- Register top score

In addition, this project will include:
- An About modal describing the background and rules of the game
- A production README


# Wireframes

![Wireframe](https://github.com/xLucyLuo/QuickChef/blob/main/Wireframe.png)

# Technologies, Libraries, APIs

- Canvas API (incl. sprites)
- Keymaster
- potential local database for registering top player scores


# Implementation Timeline

### Friday Afternoon & Weekend
- Key-bind for selecting various ingredient & various action
- Queue for ingredient drop
- Ingredient drop animation & pick up animation
- Player movement
- Matching logic for serving/tossing
- Random ingredient generator
- Collect basic recipe & ingredients

### Monday
- Timer logic and point system
- Collecting graphics
- Implementing Graphics
### Tuesday
- Re-queuing of tossed items
- Implementing other API comments (music/sound, pause)
### Wednesday
- top score board
- testing & touchup
### Thursday Morning
- testing & touchup

# Bonus Features
- multiplayer (co-op)
- multiplayer (competitive)
