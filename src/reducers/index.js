import {ADD_GUESS, CHANGE_FEEDBACK, UPDATE_AURAL_STATUS, RESTART_HC_GAME} from '../actions';

const initialState = {
	guesses: [],
	feedback: 'Make your guess!',
	auralStatus: `You've made 0 guesses!`,
	correctAnswer: Math.round(Math.random() * 100) + 1
};

export const hotColdReducer = (state=initialState, action) => {
	if(action.type === ADD_GUESS) {
		return Object.assign({}, state, {
			guesses: [...state.guesses, action.guess]
		});
	}
	else if (action.type === CHANGE_FEEDBACK) {
		return Object.assign({}, state, {
			feedback: action.feedback
		});
	}
	else if (action.type === UPDATE_AURAL_STATUS) {
		return Object.assign({}, state, {
			auralStatus: action.auralStatus
		});
	}
	else if (action.type === RESTART_HC_GAME) {
		return Object.assign({}, state, {
			guesses: [],
			feedback: 'Make your guess!',
			auralStatus: `You've made 0 guesses!`,
			correctAnswer: Math.round(Math.random() * 100) + 1
		});
	}
	return state;
}