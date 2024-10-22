import { Type } from "./actiontype";

const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, count: 1 }],
        };
      }

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case Type.INCREMENT:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, count: item.count + 1 } : item
        ),
      };

    case Type.DECREMENT:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id
              ? { ...item, count: Math.max(item.count - 1, 0) }
              : item
          )
          .filter((item) => item.count > 0),
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [], // Clear the basket
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
