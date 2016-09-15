const actionLogger = ({ dispatch, getState }) => (next) => (action) => {
  console.group(typeof action === 'function'?'Thunk':action.type);
  console.log(`action: `, action);
  console.log(`prev state:`, getState());
  
  next(action);
  let nextState = getState();

  console.log(`current state:`, nextState);
  console.groupEnd();
};

export default actionLogger;
