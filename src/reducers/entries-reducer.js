import { INIT_DATA, ADD_INCOME, ADD_SPENDING } from '../actions/types';

const entriesReducer = (state={incomes:[], spendings:[]}, {type, status, params}) => {
  let newState;

  if (status !== 'success') {
    return state;
  }

  if (type === ADD_SPENDING) {
    let {spending} = params;

    newState = Object.assign({}, state, {spendings: state.spendings.concat(params.spending)});
  }
  else if (type === ADD_INCOME) {
    let {income} = params;

    newState = Object.assign({}, state, {incomes: state.incomes.concat(params.income)});
  }
  else if (type === INIT_DATA) {
    newState = Object.assign({}, state, {incomes: params.incomes, spendings: params.spendings});
  }

  return newState || state;
};

export default entriesReducer;