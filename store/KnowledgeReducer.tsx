import {UPDATE_ARTICLES, UPDATE_ALL_KNOWLEDGE, UPDATE_QUERY, UPDATE_ALL_PODCASTS} from './Actions';
import { KnowledgeState, Article } from "../types";

const initialState: KnowledgeState = {
    articles: [
      {
        url: 'https://nakamotoinstitute.org/bitcoin/',
        image: "https://nakamotoinstitute.org/static/img/bitcoin/transactions.svg",
        title: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
        body: "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.",
        type: 'article'
      }
    ],
    knowledge: [],
    podcasts: [],
    query: ''
  };
  
  const KnowledgeReducer = function (state = initialState, action: any) {
    switch (action.type) {
      case UPDATE_ARTICLES:
        return {
          ...state,
          articles: [...state.articles, ...action.payload.slice(0, 2)],
        };
      case UPDATE_ALL_KNOWLEDGE:
        return {
          ...state,
          knowledge: action.payload,
        };
      case UPDATE_ALL_PODCASTS:
        return {
          ...state,
          podcasts: action.payload,
        };
      case UPDATE_QUERY:
        return {
          ...state,
          query: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default KnowledgeReducer;