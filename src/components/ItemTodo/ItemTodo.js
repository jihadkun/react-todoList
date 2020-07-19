import React from "react";

class ItemTodo extends React.Component {
  render() {
    return (
      <li>
        <button onClick={() => this.props.onToggleTodo(this.props.indexTodo)}>
          Done!
        </button>
        {this.props.isFinishedTodo ? (
          <s>{this.props.text}</s>
        ) : (
          <span>{this.props.text}</span>
        )}
      </li>
    );
  }
}

export default ItemTodo;
