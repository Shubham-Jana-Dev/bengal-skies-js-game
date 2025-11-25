# 🐦 Bengal Skies: The Flight for Rights

[![GitHub Pages Status](https://github.com/Shubhamjana32/bengal-skies-js-game/actions/workflows/github-pages.yml/badge.svg)](https://shubhamjana32.github.io/bengal-skies-js-game/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Top Language: JavaScript](https://img.shields.io/github/languages/top/Shubhamjana32/bengal-skies-js-game)](https://github.com/Shubhamjana32/bengal-skies-js-game)

> Bengal Skies: The Flight for Rights is a **Flappy Bird clone** showcasing foundational **front-end game development skills** using Vanilla JavaScript. This project implements a core physics engine, manages game state, tracks score, and utilizes **advanced CSS** for all graphics and textures.

## 🚀 Live Demo

You can play the game directly in your browser:

👉 **[Play Bengal Skies: The Flight for Rights](https://shubhamjana32.github.io/bengal-skies-js-game/)**

---

## ✨ Technical Highlights

| Feature | Technical Skill Demonstrated |
| :--- | :--- |
| **Physics Engine** | Custom implementation of a **gravity** and **velocity** system in JavaScript to control player movement and rotation. |
| **Collision Detection** | Precise calculation of the player's position against dynamically generated obstacle coordinates (`obstacleX`, `topPipeHeight`) to trigger the game-over state. |
| **Dynamic Obstacles** | JavaScript timers (`setInterval`) used to **procedurally generate** obstacle pairs with random gap placements, ensuring fresh gameplay. |
| **Advanced CSS Graphics** | Utilizes **CSS Gradients** and `background-size`/`background-position` to create a complex, realistic **staggered brick texture** for the obstacles without using image assets. |
| **Audio Integration** | Implementation of the native HTML5 `<audio>` element for seamless background music (`game-music`) and game-over sound effects. |
| **Game State Management** | Uses boolean flags (`isGameOver`) and `clearInterval` to manage the flow between the start screen, active gameplay, and the game over screen. |

---

## 🛠️ Technology Stack

* **Core Logic:** **Vanilla JavaScript** (ES6+) for physics, collision, and game loop management.
* **Styling & Graphics:** **CSS3** for layout, animations, and complex textures.
* **Markup:** **HTML5**.

---

## 🎮 How to Play

1.  Click the **"Start Game"** button on the start screen.
2.  **Click or tap** anywhere in the game container to make the character jump/fly.
3.  Navigate the character through the gaps in the brick obstacles (representing "unfulfilled rights issues").
4.  The score increases every time you successfully pass an obstacle set.

---

## ⚙️ Repository Structure

* `index.html`: The main game structure and UI elements.
* `script.js`: Contains all the game logic, physics engine implementation, collision detection, and obstacle generation functions.
* `style.css`: Contains the responsive layout and the custom CSS logic for the character, background animation, and the unique brick obstacle textures.
* `assets/`: Directory containing game audio (`.mp3`) and image files (`.png`).
