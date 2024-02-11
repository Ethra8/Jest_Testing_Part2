/**
 * @jest-environment jsdom
 */

//IMPORT game.js
const { game } = require("../game");

// SAME CODE for every HTML file I want to load to the DOM
beforeAll(() => {
    let fs = require("fs"); //part of node's default standard library
    let fileContent = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContent);
    document.close();
})

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    })
})