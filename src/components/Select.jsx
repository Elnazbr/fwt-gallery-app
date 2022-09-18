import React from "react";
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      value: "",
    };
    this.selectRef = React.createRef();
    this.clickSelect = this.clickSelect.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.clickSelect);
  }

  clickSelect(e) {
    if (!this.selectRef.current.contains(e.target)) {
      this.setState({ isActive: false });
    }
  }

  renderSelectItem() {
    return this.props.options.map((item) => {
      return (
        <div
          key={item}
          className="select__item"
          onClick={() => {
            this.props.onClickSelect(item);
            this.setState({ value: item });
          }}
        >
          {item}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="col-3 col-sm-12">
        <div
          className={this.state.isActive ? "select is-active" : "select"}
          onClick={() => {
            this.setState({ isActive: this.state.isActive ? false : true });
          }}
          ref={this.selectRef}
        >
          <div
            className="select__header"
          >
            <span className="select__current">
              {this.state.value !== "" ? this.state.value : this.props.value}
            </span>
            {this.state.value !== "" && (
              <svg
                className="select__close"
                onClick={() => {
                  this.props.onClickSelect("");
                  this.setState({ value: "" });
                }}
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.36474 1.21893C2.07355 0.924339 1.60144 0.924339 1.31025 1.21893C1.01906 1.51351 1.01906 1.99113 1.31025 2.28572L3.94492 4.95114L1.21644 7.71146C0.92525 8.00604 0.92525 8.48366 1.21644 8.77825C1.50763 9.07284 1.97974 9.07284 2.27093 8.77825L4.99941 6.01793L7.72779 8.77815C8.01898 9.07274 8.49109 9.07274 8.78228 8.77815C9.07347 8.48356 9.07347 8.00594 8.78228 7.71136L6.0539 4.95114L8.68848 2.28582C8.97966 1.99124 8.97967 1.51361 8.68848 1.21903C8.39729 0.92444 7.92517 0.924441 7.63399 1.21903L4.99941 3.88434L2.36474 1.21893Z"
                  fill="#555555"
                />
              </svg>
            )}
            {this.state.isActive ? (
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className="select-arrow"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.321395 4.1663L4.22936 0.314613C4.65497 -0.104871 5.34503 -0.104871 5.77064 0.314613L9.67861 4.1663C10.3652 4.84298 9.87892 6 8.90797 6L1.09203 6C0.121082 6 -0.365172 4.84298 0.321395 4.1663Z"
                  fill="#555555"
                />
              </svg>
            ) : (
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className="select-arrow"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z"
                  fill="#555555"
                />
              </svg>
            )}
          </div>

          <div className="select__body"><div className="scroll">{this.renderSelectItem()}</div></div>
        </div>
      </div>
    );
  }
}

export default Select;
