import React from 'react';

const CategoryListComponent = (props) => {
  // I am no fan of component life cycle hooks
  const { categories, addCategory } = props;
  const { onCategoryClick } = props;

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button className="pull-right" onClick={()=>addCategory('Housing')}>Add category</button>
        Categories
      </div>
      <div className="panel-body">
        <ol>
        {categories.map((item) => (
          <li key={item.id} onClick={onCategoryClick.bind(undefined, item.id)}>{item.label}</li>
        ))}
        </ol>
      </div>
    </div>
  );
};

export default CategoryListComponent;