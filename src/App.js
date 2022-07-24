import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Voitash",
      toDoItems: [
        { action: "Learning React", done: false },
        { action: "Reading Harry Potter", done: false },
        { action: "drink some beer", done: true },
        { action: "Portfolio project in Figma", done: false },
      ],
      showCompleted: true,
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  createNewToDo = (task) => {
    if (!this.state.toDoItems.find((item) => item.action === task)) {
      this.setState({
        toDoItems: [...this.state.toDoItems, { action: task, done: false }],
      });
    }
  };

  toggleToDo = (todo) =>
    this.setState({
      toDoItems: this.state.toDoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  todoTableRows = (doneValue) =>
    this.state.toDoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleToDo} />
      ));

  render = () => (
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.toDoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewToDo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Task:</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="tasks done"
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })}
          />
        </div>
        {this.state.showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Task:</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
