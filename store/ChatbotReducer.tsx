import { SET_NEW_MESSAGE, RECEIVE_BOT_RESPONSE, UPDATE_ID } from "./Actions";

const initialState = {
  messages: [
    {
        id: 1,
        text: "Hello World! I'm Bitcoin Knowledge Bot",
        name: "Bot"
    },
    {
        id: 2,
        text: "I can answer most of your Bitcoin questions, but rembmember I'm just a chatbot so I might say something incorrect 'Dont trust, verify' and read the knowledge sources on your own and use your discernment",
        name: "Bot"
    },
    {
        id: 3,
        text: "What can I answer for you?",
        name: "Bot"
    },
    {
      id: 4,
      text: "What can I answer for you?",
      name: "Bot"
  },
  {
    id: 5,
    text: "What can I answer for you?",
    name: "Bot"
},
{
  id: 6,
  text: "What can I answer for you?",
  name: "Bot"
},
{
  id: 7,
  text: "What can I answer for you?",
  name: "Bot"
},{
  id: 8,
  text: "What can I answer for you?",
  name: "Bot"
}
  ],
  loading: false,
  id: 4,
};

const ChatbotReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_ID:
      return {
        ...state,
        id: action.payload,
      };
    case SET_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default ChatbotReducer;