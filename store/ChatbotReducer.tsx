import { SEND_USER_QUESTION, RECEIVE_BOT_RESPONSE } from "./Actions";

const initialState = {
  userQuestion: '',
  botResponse: '',
};

const ChatbotReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case SEND_USER_QUESTION:
      return {
        ...state,
        userQuestion: action.payload,
      };
    case RECEIVE_BOT_RESPONSE:
      return {
        ...state,
        botResponse: action.payload,
      };
    default:
      return state;
  }
};

export default ChatbotReducer;