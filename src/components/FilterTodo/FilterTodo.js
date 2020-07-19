import React from "react";
import classnames from "classnames";
import style from "./FilterTodo.module.css";

class FilterTodo extends React.Component {
  render() {
    const currentFilter = this.props.currentFilter;

    return (
      <div>
        <button onClick={() => this.props.onChangeFilter("ALL")}>
          All Item
        </button>
        <button onClick={() => this.props.onChangeFilter("ACTIVE")}>
          Active
        </button>
        <button onClick={() => this.props.onChangeFilter("INACTIVE")}>
          Inactive
        </button>
      </div>
    );
  }
}

export default FilterTodo;
