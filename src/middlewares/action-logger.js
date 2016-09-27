const actionLogger = ({ dispatch, getState }) => (next) => (action) => {
  console.group(typeof action === 'function'?'Thunk':action.type);
  console.log(`action: `, typeof action === 'function'?'Resolving thunk':action);
  console.log(`prev state:`, getState());
  
  const nextAction = next(action);
  let nextState = getState();

  console.log(`current state:`, nextState);
  console.groupEnd();

  return nextAction;
};

export default actionLogger;
