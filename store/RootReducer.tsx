import { combineReducers } from 'redux';
import ChatbotReducer from './ChatbotReducer';
import KnowledgeReducer from './KnowledgeReducer';

const rootReducer = combineReducers({
  ChatbotReducer,
  KnowledgeReducer,
});

export default rootReducer;