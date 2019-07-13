const CardBoard = {
  getBoardRuns(cardOne, cardTwo) {

    console.log(cardOne);
    console.log(cardTwo);

    switch(cardOne) {
      case 0:
      cardOne = 1;
      break;
      case 1:
      cardOne = 2;
      break;
      case 2:
      cardOne = 3;
      break;
      case 3:
      cardOne = 4;
      break;
      case 4:
      cardOne = 5;
      break;
      case 5:
      cardOne = 6;
      break;
      case 6:
      cardOne = 7;
      break;
      case 7:
      cardOne = 1;
      break;
    case 8:
    cardOne = 2;
    break;
    case 9:
    cardOne = 3;
    break;
    case 10:
    cardOne = 4;
    break;
    case 11:
    cardOne = 5;
    break;
    case 12:
    cardOne = 6;
    break;
    case 13:
    cardOne = 7;
    break;
    case 14:
    cardOne = 1;
    break;
    case 15:
    cardOne = 2;
    break;
    case 16:
    cardOne = 3;
    break;
    case 17:
    cardOne = 4;
    break;
    case 18:
    cardOne = 5;
    break;
    case 19:
    cardOne = 6;
    break;
    case 20:
    cardOne = 7;
    break;
    case 21:
    cardOne = 1;
    break;
    case 22:
    cardOne = 2;
    break;
    case 23:
    cardOne = 3;
    break;
    case 24:
    cardOne = 4;
    break;
    case 25:
    cardOne = 5;
    break;
    case 26:
    cardOne = 6;
    break;
    case 27:
    cardOne = 7;
    break;
    default:
      break;
  }

  switch(cardTwo) {
    case 0:
    cardTwo = 1;
    break;
    case 1:
    cardTwo = 2;
    break;
    case 2:
    cardTwo = 3;
    break;
    case 3:
    cardTwo = 4;
    break;
    case 4:
    cardTwo = 5;
    break;
    case 5:
    cardTwo = 6;
    break;
    case 6:
    cardTwo = 7;
    break;
    case 7:
    cardTwo = 1;
    break;
  case 8:
  cardTwo = 2;
  break;
  case 9:
  cardTwo = 3;
  break;
  case 10:
  cardTwo = 4;
  break;
  case 11:
  cardTwo = 5;
  break;
  case 12:
  cardTwo = 6;
  break;
  case 13:
  cardTwo = 7;
  break;
  case 14:
  cardTwo = 1;
  break;
  case 15:
  cardTwo = 2;
  break;
  case 16:
  cardTwo = 3;
  break;
  case 17:
  cardTwo = 4;
  break;
  case 18:
  cardTwo = 5;
  break;
  case 19:
  cardTwo = 6;
  break;
  case 20:
  cardTwo = 7;
  break;
  case 21:
  cardTwo = 1;
  break;
  case 22:
  cardTwo = 2;
  break;
  case 23:
  cardTwo = 3;
  break;
  case 24:
  cardTwo = 4;
  break;
  case 25:
  cardTwo = 5;
  break;
  case 26:
  cardTwo = 6;
  break;
  case 27:
  cardTwo = 7;
  break;
  default:
    break;
}

console.log(cardOne);
console.log(cardTwo);


    if (cardOne === 1 && cardTwo === 1) {
    console.log('0,false');
      return [0,false];
    }
    else if (cardOne === 1 && cardTwo === 2) {
    console.log('3,false');
      return [3,false];
    }
    else if (cardOne === 1 && cardTwo === 3) {
    console.log('3,false');
      return [4,false];
    }
    else if (cardOne === 1 && cardTwo === 4) {
      console.log('0,true');
      return [0,true];
    }
    else if (cardOne === 1 && cardTwo === 5) {
      console.log('2,false');
      return [2,false];
    }
    else if (cardOne === 1 && cardTwo === 6) {
      console.log('1,false');
      return [1,false];
    }
    else if (cardOne === 1 && cardTwo === 6) {
      console.log('6,false');
      return [6,false];
    }
    else if (cardOne === 2 && cardTwo === 1) {
      return [1,false];
    }
    else if (cardOne === 2 && cardTwo === 2) {
      return [0,false];
    }
    else if (cardOne === 2 && cardTwo === 3) {
      return [2,false];
    }
    else if (cardOne === 2 && cardTwo === 4) {
        return [0,false];
    }
    else if (cardOne === 2 && cardTwo === 5) {
        return [1,false];
    }
    else if (cardOne === 2 && cardTwo === 6) {
        return [4,false];
    }
    else if (cardOne === 2 && cardTwo === 7) {
        return [0,false];
    }
    else if (cardOne === 3 && cardTwo === 1) {
        return [4,false];
    }
    else if (cardOne === 3 && cardTwo === 2) {
        return [0,true];
    }
    else if (cardOne === 3 && cardTwo === 3) {
        return [0,false];
    }
    else if (cardOne === 3 && cardTwo === 4) {
        return [1,false];
    }
    else if (cardOne === 3 && cardTwo === 5) {
        return [0,false];
    }
    else if (cardOne === 3 && cardTwo === 6) {
        return [2,false];
    }
    else if (cardOne === 3 && cardTwo === 7) {
        return [0,false];
    }
    else if (cardOne === 4 && cardTwo === 1) {
        return [1,false];
    }
    else if (cardOne === 4 && cardTwo === 2) {
        return [0,false];
    }
    else if (cardOne === 4 && cardTwo === 3) {
        return [4,false];
    }
    else if (cardOne === 4 && cardTwo === 4) {
        return [0,false];
    }
    else if (cardOne === 4 && cardTwo === 5) {
        return [6,false];
    }
    else if (cardOne === 4 && cardTwo === 6) {
        return [1,false];
    }
    else if (cardOne === 4 && cardTwo === 7) {
        return [4,false];
    }
    else if (cardOne === 5 && cardTwo === 1) {
        return [0,false];
    }
    else if (cardOne === 5 && cardTwo === 2) {
        return [2,false];
    }
    else if (cardOne === 5 && cardTwo === 3) {
        return [0,false];
    }
    else if (cardOne === 5 && cardTwo === 4) {
        return [4,false];
    }
    else if (cardOne === 5 && cardTwo === 5) {
        return [0,false];
    }
    else if (cardOne === 5 && cardTwo === 6) {
        return [1,false];
    }
    else if (cardOne === 5 && cardTwo === 7) {
        return [0,true];
    }
    else if (cardOne === 6 && cardTwo === 1) {
        return [0,false];
    }
    else if (cardOne === 6 && cardTwo === 2) {
        return [2,false];
    }
    else if (cardOne === 6 && cardTwo === 3) {
        return [1,false];
    }
    else if (cardOne === 6 && cardTwo === 4) {
        return [0,false];
    }
    else if (cardOne === 6 && cardTwo === 5) {
        return [1,false];
    }
    else if (cardOne === 6 && cardTwo === 6) {
        return [0,false];
    }
    else if (cardOne === 6 && cardTwo === 7) {
        return [1,false];
    }
    else if (cardOne === 7 && cardTwo === 1) {
        return [1,false];
    }
    else if (cardOne === 7 && cardTwo === 2) {
        return [0,false];
    }
    else if (cardOne === 7 && cardTwo === 3) {
        return [4,false];
    }
    else if (cardOne === 7 && cardTwo === 4) {
        return [0,false];
    }
    else if (cardOne === 7 && cardTwo === 5) {
        return [6,false];
    }
    else if (cardOne === 7 && cardTwo === 6) {
        return [0,true];
    }
    else if (cardOne === 7 && cardTwo === 7) {
        return [0,false];
    }
    else {
      return [10,10];
    }

},

}

export default CardBoard;
