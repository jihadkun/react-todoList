import React from "react";
import Input from "./components/input/input";
import ListTodo from "./components/ListTodo/ListTodo";
import FilterTodo from "./components/FilterTodo/FilterTodo";
import {
  ambilDataDariServer,
  tambahDataKeServer,
  updateDataDiServer,
  deleteDataDiServer,
} from "./services/TodoService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      todoList: [],
      activeFilter: "ALL",
    };
  }

  //parsing data lalu ambil data dari server
  componentDidMount() {
    ambilDataDariServer().then((response) => {
      const data = response.data;
      const parsedData = data.map((element) => {
        return {
          id: element.id,
          isFinished: element.isDone,
          todoText: element.text,
        };
      });

      this.setState({
        todoList: parsedData,
      });
    });
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
      // tambah data ke server, parsing data dari lokal ke server lalu POST
      tambahDataKeServer({
        isDone: false,
        text: inputText,
      });

      oldTodoList.push({
        isFinished: false,
        todoText: inputText,
      });
      // ini tambah data ke lokal
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
    const todoItem = currentTodoList[index];

    // ubah value / update data di Server
    const { id, isFinished, todoText } = todoItem;
    updateDataDiServer(id, {
      isDone: !isFinished,
      text: todoText,
    });

    currentTodoList[index].isFinished = !isFinished;

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

  handleDeleteTodo = (element) => {
    const { id } = element;
    deleteDataDiServer(id)
      .then(() => ambilDataDariServer())
      .then((response) => {
        const data = response.data;
        const parsedData = data.map((element) => {
          return {
            id: element.id,
            isFinished: element.isDone,
            todoText: element.text,
          };
        });

        this.setState({
          todoList: parsedData,
        });
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
          onTodoDelete={this.handleDeleteTodo}
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
