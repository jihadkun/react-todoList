import React from "react";
import Input from "./components/input/input";
import ListTodo from "./components/ListTodo/ListTodo";
import FilterTodo from "./components/FilterTodo/FilterTodo";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      todoList: [],
      activeFilter: "ALL",
    };
  }

  // menangkap input ketikan keyboard user
  handleInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      inputText: event.target.value,
    });
  };

  // trigger saat menekan enter
  handleKeyPressed = (event) => {
    // untuk melihat kode tombol keyboard yang ditekan
    // console.log(event.keyCode);
    // didapatkan keyCode enter adalah 13

    // rule if tekan enter, do something
    if (event.keyCode === 13) {
      const oldTodoList = this.state.todoList;
      const inputText = this.state.inputText;
      oldTodoList.push({
        isFinished: false,
        todoText: inputText,
      });

      this.setState({
        todoList: oldTodoList,
        inputText: "",
      });

      // untuk tes output array di console
      // console.log(oldTodoList);
    }
  };

  // handle klik button, negasi untuk toggle perubahan state saat diklik
  handleToggleDone = (index) => {
    const currentTodoList = this.state.todoList;
    currentTodoList[index].isFinished = !currentTodoList[index].isFinished;

    this.setState({
      todoList: currentTodoList,
    });
  };

  // hadler filter function
  changeFilterType = (filterType) => {
    this.setState({
      activeFilter: filterType,
    });
  };

  render() {
    const todoList = this.state.todoList;
    const activeFilter = this.state.activeFilter;

    const filteredTodoList = todoList.filter((element) => {
      if (activeFilter === "INACTIVE") {
        return element.isFinished;
      } else if (activeFilter === "ACTIVE") {
        return !element.isFinished;
      } else {
        return true;
      }
    });

    return (
      <div>
        <Input
          val={this.state.inputText}
          onInputChanged={this.handleInputChange}
          onKeyPressed={this.handleKeyPressed}
        />
        <ListTodo
          listToRender={filteredTodoList}
          onToggleItem={this.handleToggleDone}
        />
        <FilterTodo
          onChangeFilter={this.changeFilterType}
          currentFilter={this.state.activeFilter}
        />
      </div>
    );
  }
}

export default App;
