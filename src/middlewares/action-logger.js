const actionLogger = ({ dispatch, getState }) => (next) => (action) => {
  console.group(`action: `, typeof action === 'function'?'Thunk':action);
  console.log(`state:`, getState());
  console.groupEnd();

  return next(action);
};

export default actionLogger;
