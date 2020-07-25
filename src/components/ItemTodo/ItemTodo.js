import React from "react";

class ItemTodo extends React.Component {
  render() {
    const { onToggleTodo, onDeleteTodo, indexTodo, element } = this.props;

    return (
      <li>
        <button onClick={() => onToggleTodo(indexTodo)}>
          I've Done doing this !
        </button>
        <button onClick={() => onDeleteTodo(element)}>Delete</button>
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
