import React from 'react';
import {CPUPlayer, Player, random} from "./player";

export class Game {
    constructor(gameState, name, inventory) {
        if (gameState) {
            this.gameState = new GameState(gameState, name, inventory);
        } else {
            this.gameState = new GameState(null, name, inventory);
        }
    }

    set gameState(gameState) {
        this.gameState = gameState;
    }

    get gameState() {
        return this.gameState;
    }
}

export class GameState {
    constructor(gameState, name, inventory) {
        if (gameState) {
            [this.players, this.currentRound, this.gameOver] = gameState; // [[playerObj, playerObj], currentRound]
        } else {
            // init the default gamestate
            const cpuInventory = [];
            // generate three random items
            for (let i = 0; i < 3; i++) {
                cpuInventory.push(new Item(ItemType.values()[random(ItemType.values().length)], ItemAttr.values()[random(ItemAttr.values().length)]));
            }
            this.players = [new CPUPlayer(null, 'CPU', cpuInventory), new Player(null, name, inventory)];
            this.currentRound = 1;
            this.gameOver = false;
        }
    }

    set gameOver(gameOver) {
        this.gameOver = gameOver;
    }

    get gameOver() {
        return this.gameOver;
    }

    set currentRound(currentRound) {
        this.currentRound = currentRound;
    }

    get currentRound() {
        return this.currentRound;
    }

    set players(players) {
        this.players = players;
    }

    get players() {
        return this.players;
    }
}
