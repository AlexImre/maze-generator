const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(){
    this.field = []
    this.X = 0;
    this.Y = 0;
    this.move = '';
    this.gameOver = false;
  }

  generateField (rows, columns, defaultValue, holes) {
    let map = [];
    for ( let i = 0; i < rows; i++) {
        map.push([]);
        map[i].push( new Array(columns));
        for (let j = 0; j < columns; j++) {
            map[i][j] = defaultValue;
        }
    }

        // generate holes
        for ( let i = 0; i < holes; i++){
            let x = Math.floor(Math.random() * 5);
            let y = Math.floor(Math.random() * 5);
            map[y].splice(x, 1, 'O');
        }
        
        // generate hat
        let x = Math.floor(Math.random() * 5);
        let y = Math.floor(Math.random() * 5);
        map[y].splice(x, 1, '^');

        while (map[0] === 0 && map[0] === 0) {
            let x = Math.floor(Math.random() * 5);
            let y = Math.floor(Math.random() * 5);
            map[y].splice(x, 1, '^');
        }

        // force home square to be valid
        map[0].splice(0, 1, '*');
    this.field = map
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(''));   
    }
  }

  prompt() {
    this.move = prompt('Enter your move: ')
  }

  checkMove(X, Y) {
    if (this.field[Y][X] === 'O') {
      console.log("game over, you fall into a hole");
      this.gameOver = true;
      return;
    }
    if (Y < 0 || X < 0) {
      console.log("game over, you went out of bounds");
      this.gameOver = true;
      return;
    }
    if (this.field[Y][X] === '^') {
      console.log("you found the hat, you won!");
      this.gameOver = true;
      return;
    }
    this.field[Y].splice(X, 1, '*');
  }

  newGame() {
    this.generateField(5, 5, '░', 7);
    let X = this.X;
    let Y = this.Y;
    while (this.gameOver !== true) {
      this.print();
      this.prompt();
      if (this.move === 'w') {
        Y--;
      }
      if (this.move === 'a') {
        X--;
      }
      if (this.move === 's') {
        Y++;
      }
      if (this.move === 'd') {
        X++;
      }
      this.checkMove(X,Y);
    }
  }
}

const myField = new Field()

myField.newGame();
