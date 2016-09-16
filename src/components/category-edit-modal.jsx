import React from 'react';

// import { formFactory } from '../utility';

const CategoryEditModal = (props) => {
  let state = {};

  const mode = 'create';
  const {addCategory} = props;

  const onChange = (e) => {
    state[e.target.name] = e.target.value;

    console.log(`[CategoryEditModal.onChange] State:`, state);
  };

  const onSave = () => {
    console.log(`[CategoryEditModal.onSave] Category label:`, state.label);

    const {label} = state;
    let ret = addCategory(label);
    console.debug(ret);
  };
  return (
    <div>
      <div className="modal-header">Category</div>
      <div className="modal-body">
        <div className="form">
          <div className="form-group">
            <label className="control-label">Label</label>
            <input className="form-control"
                   name="label"
                   value={state.label}
                   onChange={onChange} />
          </div>

          <div className="form-group text-center">
            <button className="btn btn-primary" onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
