import React, { Component } from 'react';
import classes from './App.module.css';
import Card from './components/Card/Card';


class App extends Component {
  state = {
    deck: [],
    player: [],
    dealer: [],
    table: [],
    isPlayerTurn: true,
    isDisableButton: false,    
    message: 'Goose - dick in mouth use'
  }

init = async () => {
  const generateDeck = {
    suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
    values: ['Ace', 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
  };
  const deck = [];
  // Generate deck
  for (let i = 0; i < generateDeck.suits.length; i++) {
    for (let j = 0; j < generateDeck.values.length; j++) {
      await deck.push({suits : generateDeck.suits[i], values : generateDeck.values[j]});
    }
  }
  // Shuffle deck
  deck.sort((a,b) => {
    return Math.random() - 0.5; 
  });
  
  this.setState({deck: deck})
}
  
componentDidMount() {
  this.init();
}

gamerTurnHandler = async (type) => {
  const gamer = [...this.state[type]];
  const deck = [...this.state.deck];
  let table = [...this.state.table];
  if (this.state.deck.length === 0 && gamer.length === 0) {
    this.setState((prevState, props) => {
      return {
        isDisableButton: true,
        message: `${type} win!`
      }
    });
  } else {
    if (gamer.length !== 0) {
      await table.push(gamer[gamer.length -1]);
      gamer.pop();
    } else {
      await table.push(deck[deck.length -1]);
      deck.pop();
    }
  
    if (table.length > 1 && (table[table.length -1].suits === table[table.length -2].suits)) {
      gamer.unshift(...table);
      table = [];
    } 
   this.setState((prevState, props) => {
     return {
       table: table, 
       deck: deck, 
       [type]: gamer,
       isPlayerTurn: !prevState.isPlayerTurn
      }
   });    
  }

}

dealCardButtonHandler = async () => {
  const player = 'player';
  const dealer = 'dealer';

  if (this.state.isPlayerTurn) {
    await this.gamerTurnHandler(player);
  } else {
    await this.gamerTurnHandler(dealer);
  }
}

  

  render () {  
    const dealerHand = [classes.dealer_hand, classes.hand]; 
    return (
      <div className={classes.body}>
        <h1><strong>{this.state.message}</strong></h1>
        <p>Cards in deck: {this.state.deck.length}</p>
        <p>Table:</p>
        <div className={dealerHand.join(' ')}>
          {this.state.table.map((el, i) => {
            return <Card card={el.suits + el.values} key={i}/>
          })}
        </div>
        <p>Player Cards: {this.state.isPlayerTurn ? '👌' : null}</p>
        <div className={dealerHand.join(' ')}>
          {this.state.player.map((el, i) => {
            return <Card card={el.suits + el.values} key={i}/>
          })}
        </div>
        <p>Dealer Cards: {this.state.isPlayerTurn ? null : '👌'}</p>
        <div className={dealerHand.join(' ')}>
          {this.state.dealer.map((el, i) => {
            return <Card card={el.suits + el.values} key={i}/>
          })}
        </div>
        <div className={classes.Buttons}>
          <button onClick={this.dealCardButtonHandler} className={this.state.isDisableButton ? classes.disabled : null}>Deal card</button>
        </div>
        
      </div>
    );
  }
}

export default App;
