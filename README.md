# Background

**Quick Chef** is a cooking game where Players collect points by fulfilling as many recipe/order requests as they can over a set timer (5min).

The Player will use key-combos to perform actions required to make the recipe, such as collecting specific ingredient, processing ingredients (e.g. cut, pan-fry, mix, bake, etc.), assembling the food items, and serving/tossing the assembled items. The time it takes to collect and processess these ingredients are represented by queueing up the ingredient/processed food items at the top of the screen, where it will fall down over time for the player to catch. Once the player catches an ingredient, they can choose to process it or put it onto the assembly station/plate. At any time, the player can decide to serve or toss the ingredients on the assembly station (if ingredients match a currently required recipe, will serve, otherwise will toss)

The general flow of the game will be as follows:
1. A 5 min timer will start counting down at the begining of the game. The game ends when the timer runs out.
2. A set of 3 random recipes/orders will be selected, each with their own timer and instructions at the top. When recipe timers run out, the order will dissapear (the player will potentially loose points) and a new random recipe will be presented.
3. There will be 4-5 different ingredients that the player can select using specifically mapped key combos (e.g. WASD for tomatoe). Once selected the ingredient will queue up at the top (4 queues) and fall down for the Player to catch (max hold one item at a time)
4. When the Player catches an ingredient, they can choose a cooking action (e.g. cut, mix, fry, etc) using specifically mapped key-combos, afterwhich the processed food will queue at the top and fall down over time as it is processing
5. When the player catches a processed food, they can choose to put it on a assembly station or toss it
6. Once they have assembled the ingredients required, the Player can use key-combo to serve the order, which will either match up to a recipe (collecting points and generating a new recipe to replace it) or end up getting tossed (potentially requeueing up top) if it does not match any current orders
7. The goal of the game is to collect as much points as possible within the 5 min timer.


# Functionality & MVPs

In **Quick Chef**, users will be able to:
+ Use key combos to select ingredients and cooking actions
+ Move left and right to catch falling ingredients
+ Pause the game and mute music
+ Register top score

In addition, this project will include:
+ An About modal describing the background and rules of the game
+ A production README


# Wireframes

https://wireframe.cc/7bogl2


# Technologies, Libraries, APIs

+ Canvas API (incl. sprites)
+ potential local database for registering top player scores


# Implementation Timeline

## Friday Afternoon & Weekend
- Key-bind for selecting various ingredient & various action
- Queue for ingredient drop
- Ingredient drop animation & pick up animation
- Player movement
- Matching logic for serving/tossing
- Random ingredient generator
- Collect basic recipe & ingredients

## Monday
- Timer logic and point system
- Collecting graphics
- Implementing Graphics
## Tuesday
- Requeuing of tossed items
- Implementing other API comments (music/sound, pause)
## Wednesday
- top score board
- testing & touchup
## Thursday Morning
- testing & touchup

# Bonus Features
- multiplayer (co-op)
- multiplayer (competitve)
