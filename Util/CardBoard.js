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
    console.log('hit?')
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
    else if (cardOne === 1 && cardTwo === 7) {
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

getBoardRunsAllRounderAttack(cardOne, cardTwo) {
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
  console.log('hit?')
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
  else if (cardOne === 1 && cardTwo === 7) {
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
      return [0,true];
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
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
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
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [4,false];
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

getBoardRunsBowlersAttack(cardOne, cardTwo) {
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
  console.log('hit?')
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
    return [0,false];
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
  else if (cardOne === 1 && cardTwo === 7) {
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
      return [0,true];
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
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
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
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
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
      return [1,false];
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

getBoardRunsTopOrderConsolidate(cardOne, cardTwo) {
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
  console.log('hit?')
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
    return [0,false];
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
  else if (cardOne === 1 && cardTwo === 7) {
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
      return [0,true];
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
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
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
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
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
      return [1,false];
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

getCardColor(cardOne) {
  let cardColor = '';
  switch(cardOne) {
    case 0:
    return cardColor = 'red';
    break;
    case 1:
    return cardColor = 'red';
    break;
    case 2:
    return cardColor = 'red';
    break;
    case 3:
    return cardColor = 'red';
    break;
    case 4:
    return cardColor = 'red';
    break;
    case 5:
    return cardColor = 'red';
    break;
    case 6:
    return cardColor = 'red';
    break;
    case 7:
    return cardColor = 'red';
    break;
  case 8:
  return cardColor = 'red';
  break;
  case 9:
  return cardColor = 'red';
  break;
  case 10:
  return cardColor = 'red';
  break;
  case 11:
  return cardColor = 'red';
  break;
  case 12:
  return cardColor = 'red';
  break;
  case 13:
  return cardColor = 'red';
  break;
  case 14:
  return cardColor = 'black';
  break;
  case 15:
  return cardColor = 'black';
  break;
  case 16:
  return cardColor = 'black';
  break;
  case 17:
  return cardColor = 'black';
  break;
  case 18:
  return cardColor = 'black';
  break;
  case 19:
  return cardColor = 'black';
  break;
  case 20:
  return cardColor = 'black';
  break;
  case 21:
  return cardColor = 'black';
  break;
  case 22:
  return cardColor = 'black';
  break;
  case 23:
  return cardColor = 'black';
  break;
  case 24:
  return cardColor = 'black';
  break;
  case 25:
  return cardColor = 'black';
  break;
  case 26:
  return cardColor = 'black';
  break;
  case 27:
  return cardColor = 'black';
  break;
  default:
  return cardColor = 'too close to call';
    break;
}
},

getFilteredKey(games, gameId) {
let currentKey = games.map(acc => {
  console.log(acc);
  if (acc.gameId  === gameId) {
    console.log(acc.gameId);
    console.log(acc.key);
    return acc.key;
  }
  });
  console.log(currentKey);

  let filtered = currentKey.filter(t=>t != undefined);
  console.log(filtered);
  console.log(filtered[0]);
  return filtered;
},

getHighestScorers(gameRunEvents, allPlayers) {
  let sum = a => a.reduce((acc, item) => acc + item);

  // ****** workout the hihgest scorer & second highest scorer ****** //:
  let ballCountDB = 0;
  let batterId = 1;
  let batterRunsOne = 0;
  let batterRunsTwo = 0;
  let batterRunsThree = 0;
  let batterRunsFour = 0;
  let batterRunsFive = 0;
  let batterRunsSix = 0;
  let batterRunsSeven = 0;
  let batterRunsEight = 0;
  let batterRunsNine = 0;
  let batterRunsTen = 0;
  let batterRunsEleven = 0;
  let batterRunsCount = gameRunEvents.map(acc => {
    console.log(acc.runsValue);
    console.log(acc);
    let runsValue = acc.runsValue;
    let numberRunsValue = Number(runsValue);
    if (acc.batterID === 1) {
      batterRunsOne = batterRunsOne + numberRunsValue;
      return [batterRunsOne, acc.batterID];
    }
    else if ( acc.batterID === 2 ) {
      batterRunsTwo = batterRunsTwo + numberRunsValue;
      return [batterRunsTwo, acc.batterID];
    }
    else if ( acc.batterID === 3 ) {
      batterRunsThree = batterRunsThree + numberRunsValue;
      return [batterRunsThree, acc.batterID];
    }
    else if ( acc.batterID === 4 ) {
      batterRunsFour = batterRunsFour + numberRunsValue;
      return [batterRunsFour, acc.batterID];
    }
    else if ( acc.batterID === 5 ) {
      batterRunsFive = batterRunsFive + numberRunsValue;
      return [batterRunsFive, acc.batterID];
    }
    else if ( acc.batterID === 6 ) {
      batterRunsSix = batterRunsSix + numberRunsValue;
      return [batterRunsSix, acc.batterID];
    }
    else if ( acc.batterID === 7 ) {
      batterRunsSeven = batterRunsSeven + numberRunsValue;
      return [batterRunsSeven, acc.batterID];
    }
    else if ( acc.batterID === 8 ) {
      batterRunsEight = batterRunsEight + numberRunsValue;
      return [batterRunsEight, acc.batterID];
    }
    else if ( acc.batterID === 9 ) {
      batterRunsNine = batterRunsNine + numberRunsValue;
      return [batterRunsNine, acc.batterID];
    }
    else if ( acc.batterID === 10 ) {
      batterRunsTen = batterRunsTen + numberRunsValue;
      return [batterRunsTen, acc.batterID];
    }
    else if ( acc.batterID === 11 ) {
      batterRunsEleven = batterRunsEleven + numberRunsValue;
      return [batterRunsEleven, acc.batterID];
    }
    else {
      return [0, 0];
    }
  });

  console.log(batterRunsCount);

  let highestScore = 0;
  let recordPlayerId = 100;
  let letbatterRunsCountLength = batterRunsCount.length;
  console.log(letbatterRunsCountLength);
  let countLength = 0;
  let batterRunsCountHighest = batterRunsCount.map(acc => {
    console.log(acc);
    console.log(acc[0]);
    console.log(acc[1]);
    if (acc[0] > highestScore) {
      highestScore = acc[0];
      recordPlayerId = acc[1]
    }
    countLength++
    if (countLength === letbatterRunsCountLength) {
    return [highestScore, recordPlayerId];
    }
    else {
      return [0, 100];
    }

  })

  console.log(batterRunsCountHighest);

  let battersHighestScore = batterRunsCountHighest.filter( batter => batter[1] != 100)

  console.log(battersHighestScore);
  console.log(battersHighestScore[0][0]);
  console.log(battersHighestScore[0][1]);
  console.log(allPlayers);

  //with the id get the player name.
  let battersNameHighestScore = allPlayers.filter( batter => batter.id === battersHighestScore[0][1])

  console.log(battersNameHighestScore);
  console.log(battersNameHighestScore[0][2]);
  console.log(battersNameHighestScore.player);
  console.log(battersNameHighestScore[0].player);

  let highestBatterBallCount = gameRunEvents.map(acc => {
    console.log(acc.batterID);
    console.log(battersHighestScore[0][1]);
    if (acc.batterID === battersHighestScore[0][1]) {
      return 1;
    }
    else {
      return 0;
    }
  })

  console.log(highestBatterBallCount);

  let highestScoreBallCount = sum(highestBatterBallCount.map(acc => Number(acc)));

  console.log(highestScoreBallCount);

  // *** get second highest score *** //

  let batterSecondRunsCount = batterRunsCount.filter( batter => batter[1] != battersHighestScore[0][1])

  console.log(batterSecondRunsCount);

  let secondHighestScore = 0;
  let recordSecondPlayerId = 100;
  let secondBatterRunsCountLength = batterSecondRunsCount.length;
  console.log(secondBatterRunsCountLength);
  let countSecondLength = 0;
  let batterRunsCountSecondHighest = batterSecondRunsCount.map(acc => {
    console.log(acc);
    console.log(acc[0]);
    console.log(acc[1]);
    if (acc[0] > secondHighestScore) {
      secondHighestScore = acc[0];
      recordSecondPlayerId = acc[1]
    }
    countSecondLength++
    if (countSecondLength === secondBatterRunsCountLength) {
    return [secondHighestScore, recordSecondPlayerId];
    }
    else {
      return [0, 100];
    }
  })

  let battersSecondHighestScore = batterRunsCountSecondHighest.filter( batter => batter[1] != 100)

  console.log(battersSecondHighestScore);
  console.log(battersSecondHighestScore[0][1]);

  let battersNameSecondHighestScore = '';

  if (battersSecondHighestScore === undefined) {
  battersNameSecondHighestScore = allPlayers.filter( batter => batter.id === 2)
  }
  else {
  battersNameSecondHighestScore = allPlayers.filter( batter => batter.id === battersSecondHighestScore[0][1])
}

  console.log(battersNameSecondHighestScore[0].player);

  let secondHighestBatterBallCount = gameRunEvents.map(acc => {
    console.log(acc.batterID);
    console.log(battersSecondHighestScore[0][1]);
    if (acc.batterID === battersSecondHighestScore[0][1]) {
      return 1;
    }
    else {
      return 0;
    }
  })

  console.log(secondHighestBatterBallCount);

  let secondHighestScoreBallCount = sum(secondHighestBatterBallCount.map(acc => Number(acc)));

  console.log(secondHighestScoreBallCount)

  // *** find highest & second highest score ends  **

  return [battersHighestScore, battersNameHighestScore, highestScoreBallCount, battersSecondHighestScore, battersNameSecondHighestScore, secondHighestScoreBallCount]
  
},

}

export default CardBoard;
