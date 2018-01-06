import React from 'react';
import {connect} from 'react-redux';

import {addGuess, changeFeedback, updateAuralStatus, restartHCGame} from '../actions';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

export function Game(props) {
  
  function makeGuess(guess) {
    guess = parseInt(guess, 10);
    if (isNaN(guess)) {
      props.dispatch(changeFeedback('Please enter a valid number'));
      return;
    }

    const difference = Math.abs(guess - props.correctAnswer);

    let feedback;
    if (difference >= 50) {
      feedback = 'You\'re Ice Cold...';
      props.dispatch(changeFeedback(feedback));
    } else if (difference >= 30) {
      feedback = 'You\'re Cold...';
      props.dispatch(changeFeedback(feedback));
    } else if (difference >= 10) {
      feedback = 'You\'re Warm.';
      props.dispatch(changeFeedback(feedback));
    } else if (difference >= 1) {
      feedback = 'You\'re Hot!';
      props.dispatch(changeFeedback(feedback));
    } else {
      feedback = 'You got it!';
      props.dispatch(changeFeedback(feedback));
    }

    props.dispatch(addGuess(guess));
    // props.dispatch(changeFeedback(feedback));

    // We typically wouldn't touch the DOM directly like this in React
    // but this is the best way to update the title of the page,
    // which is good for giving screen-reader users
    // instant information about the app.
    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
  }

  function generateAuralUpdate() {
    const guesses = props.guesses;
    const feedback = props.feeback;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }

    props.dispatch(updateAuralStatus(auralStatus));
  }

    const guesses = props.guesses;
    const feedback = props.feeback;
    const auralStatus = props.auralStatus;
    // const { feedback, guesses, auralStatus } = state;
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={() => props.dispatch(restartHCGame())}
          onGenerateAuralUpdate={() => generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={props.feedback}
            guessCount={guessCount}
            onMakeGuess={guess => makeGuess(guess)}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
}

Game.defaultProps = {
  guesses: [],
  feedback: 'Make your guess!',
  auralStatus: '',
  correctAnswer: Math.round(Math.random() * 100) + 1
};

export const mapStateToProps = state => ({
  guesses: state.guesses,
  feedback: state.feedback,
  auralStatus: state.feedback,
  correctAnswer: state.correctAnswer
});

export default connect(mapStateToProps)(Game);


