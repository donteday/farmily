class Player {
    constructor(name) {
        this.name = name;
        this.chips = 5; // каждый игрок начинает с 5 фишками
        this.capturedChips = 0; // количество забранных фишек
    }

    flipChip() {
        // Шанс переворота (например, 50%)
        const chance = Math.random() < 0.5;
        if (chance) {
            this.capturedChips++;
            console.log(`${this.name} flipped a chip! Total captured: ${this.capturedChips}`);
        } else {
            console.log(`${this.name} did not flip a chip.`);
        }
        this.chips--;
    }
}

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.currentPlayerIndex = 0;
        this.totalFlips = 0;
        this.maxFlips = 10; // Максимальное количество переворотов за один ход
    }

    nextTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const opponent = this.players[(this.currentPlayerIndex + 1) % 2];

        console.log(`\n${currentPlayer.name}'s turn:`);

        for (let i = 0; i < this.maxFlips; i++) {
            if (currentPlayer.chips > 0) {
                currentPlayer.flipChip();
            }
        }

        // Переворачиваем фишки противника
        for (let i = 0; i < this.maxFlips; i++) {
            if (opponent.chips > 0) {
                const chance = Math.random() < 0.5; // 50% шанс переворота фишки противника
                if (chance) {
                    opponent.capturedChips++;
                    console.log(`${currentPlayer.name} flipped an opponent's chip! Total captured: ${opponent.capturedChips}`);
                } else {
                    console.log(`${currentPlayer.name} did not flip an opponent's chip.`);
                }
            }
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2; // Передаем ход другому игроку
        console.log(`End of turn for ${currentPlayer.name}.`);
    }

    playGame() {
        while (this.players[0].chips > 0 || this.players[1].chips > 0) {
            this.nextTurn();
        }

        // Подсчет результатов
        this.endGame();
    }

    endGame() {
        const player1 = this.players[0];
        const player2 = this.players[1];

        console.log(`\nGame Over!`);
        console.log(`${player1.name} captured ${player1.capturedChips} chips.`);
        console.log(`${player2.name} captured ${player2.capturedChips} chips.`);

        if (player1.capturedChips > player2.capturedChips) {
            console.log(`${player1.name} wins!`);
        } else if (player1.capturedChips < player2.capturedChips) {
            console.log(`${player2.name} wins!`);
        } else {
            console.log(`It's a tie!`);
        }
    }
}

// Создаем игроков
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

// Начинаем игру
const game = new Game(player1, player2);
game.playGame();