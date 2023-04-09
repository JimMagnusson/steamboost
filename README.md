# TDDD27 2023

## Functional specification

Project vision: To develop a tool for game developers to make the Steam store page setup process easier.

Core features:

The first core feature is a Steam tags suggestions feature. Steam tags affect where and how a game appears on Steam and should be selected with care by the developer to make their game be discovered by more players. The web application will give the user suggestions about what tags they should use for their game based on similar games. The user can select the similar games by searching for them using a search bar. The tags that appear in most of the entries are then returned to the user as the suggested Steam tags for their own game.

The second core feature is a Steam store page short description generator. The user can enter a few keywords about their game, which then are used by ChatGPT to generate a short description made for a Steam store page in mind.

The third core feature is a Steam store page comparison feature. The user can search for and select a game on Steam using a search field. The title, steam page URL, short description and tags for the selected games will then be presented next to each other. This is done to make it easy for the user to compare different steam pages to each other.

## Technical specification

React will be used to develop the frontend of the application, while Node.js and Express will be used to develop the backend. MongoDB will be used to manage the database. The SteamSpy API will be used to obtain steam game data and ChatGPT API will be used to generate game descriptions.
