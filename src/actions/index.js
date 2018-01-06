export const ADD_GUESS = 'ADD_GUESS';
export const addGuess = guess => ({
	type: ADD_GUESS,
	guess
});

export const CHANGE_FEEDBACK = 'CHANGE_FEEDBACK';
export const changeFeedback = feedback => ({
	type: CHANGE_FEEDBACK,
	feedback
});

export const UPDATE_AURAL_STATUS = 'UPDATE_AURAL_STATUS';
export const updateAuralStatus = auralStatus => ({
	type: UPDATE_AURAL_STATUS,
	auralStatus
});

export const RESTART_HC_GAME = 'RESTART_HC_GAME';
export const restartHCGame = () => ({
	type: RESTART_HC_GAME
});





