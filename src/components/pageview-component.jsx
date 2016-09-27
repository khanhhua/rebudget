import React from "react";

export default class PageviewComponent extends React.Component {
  constructor (props) {
    super();
    this.state = Object.assign({pageIndex: 0}, props);
  }

  onSwitch () {
    const {pageIndex} = this.state;
    const newPageIndex = Math.abs(pageIndex - 1);

    this.setState({pageIndex: newPageIndex});
  }

  render () {
    const {children} = this.props;

    const {pageIndex} = this.state;
    const trackStyle = {
      transform: 'translateX(' + (-pageIndex * 50) + '%)'
    };

    return (
      <div className="pageview">
        <div className="pageview-switch">
          <button className="btn btn-sm btn-info" onClick={(e)=>this.onSwitch()}>
            <i className="fa fa-exchange"></i>
          </button>
        </div>
        <div className="pageview-track" style={trackStyle}>
        {children.map((child,i) => (
          <div key={i} className="pageview-item">
            {child}
          </div>
        ))}
        </div>
      </div>
    );
  }
}