import InputName from "./InputName";
import React from "react";
import Select from "./Select";
import SelectCreated from "./SelectCreated";

class Filters extends React.Component {
  render() {
    return (
      <div className="row">
        <InputName onChangeText={this.props.onChangeText} />
        <Select
          value={"Author"}
          options={this.props.authors.map((item) => item.name)}
          onClickSelect={this.props.onClickAuthor}
        />
        <Select
          value={"Location"}
          options={this.props.locations.map((item) => item.location)}
          onClickSelect={this.props.onClickLocation}
        />
        <SelectCreated
          onChangeTextFrom={this.props.onChangeTextFrom}
          onChangeTextBefore={this.props.onChangeTextBefore}
        />
      </div>
    );
  }
}
export default Filters;
