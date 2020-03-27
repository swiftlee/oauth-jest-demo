import {ItemType, ItemAttr, Item} from "./item";

export class Player {
    // creates a new game from scratch with one player being CPU and other being user if player is null
    constructor(player, name, inventory) {
        if (player) {
            // rebuilds the player from existing game if you logged out or left early during a game
            [this.name, this.inventory, this.opponent, this.health] = player; // player is an array that holds all of the corresponding information
        } else {
            this.name = name;
            this.inventory = inventory;
            this.opponent = name === 'CPU' ? 1 : 0;
            this.health = 100;
        }
    }

    set opponent(opponent) {
        this.opponent = opponent;
    }

    get opponent() {
        return this.opponent;
    }

    set name(name) {
        this.name = name;
    }

    get name() {
        return this.name;
    }

    get opponent() {
        return this.opponent;
    }

    get health() {
        return this.health;
    }

    set health(val) {
        this.health = val;
    }

    damage(player, amt) {
        player.health -= amt;
    }

    getSelectedMove(idx) {
        return this.inventory[idx];
    }
}

export const random = (max) => {
    return Math.floor(Math.random() * max);
};

export class CPUPlayer {
    // select 3 starter items randomly
    constructor(player, name, inventory) {
        if (player) {
            // rebuilds the player from existing game if you logged out or left early during a game
            [this.name, this.inventory, this.opponent, this.health] = player; // player is an array that holds all of the corresponding information
        } else {
            this.inventory = inventory;
            this.name = name;
            this.health = 100;
        }
    }

    getSelectedMove() {
        let move = this.inventory[random(3)];
        if (move.currentCooldown === 0)
            return move;
    }
}

Object.setPrototypeOf(CPUPlayer.prototype, Player);
