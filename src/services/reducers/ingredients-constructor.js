import {
  SET_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
}
  from '../actions/ingredients-constructor';

export const ingredientsConstructorState = {
  constructorList: [], // список элементов конструктора
  buns: []
}

export const constructorListReducer = (state = ingredientsConstructorState, action) => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        buns: state.buns.find(item => item._id === action.payload._id) ? [...state.buns] : [action.payload]
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorList: [...state.constructorList, action.payload]
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorList: state.constructorList.filter((element) => element.id !== action.payload.id)
      }
    }
    case MOVE_INGREDIENT: {

      let res = [];
      // res = [1, 2, 3, 5, 6, 6, 7]
      // action.payload = {
      //   start: 5,
      //   end: 3
      // }
      const { start, end } = action.payload;
      if (start === end) {
        return state
      } else if (start > end) {
        res = [
          ...state.constructorList.slice(0, end),
          state.constructorList[start],
          ...state.constructorList.slice(end, start),
          ...state.constructorList.slice(start + 1),
        ];
      } else { // start < end

        res = [
          ...state.constructorList.slice(0, start),
          ...state.constructorList.slice(start + 1, end),
          state.constructorList[start],
          ...state.constructorList.slice(end)
        ]
      }

      return {
        ...state,
        constructorList: res
      }
    }
    default: {
      return state;
    }
  }
}