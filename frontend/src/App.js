import React, { Component } from "react";
import Modal from "./components/Modal";
// axios to connect django backend with react frontend
import axios from 'axios';


// Extends Component from React which gives addition built in modules.
class App extends Component {
  constructor(props) {
    // Necessary for the parent constructor.
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: []
    };
  }

  // Method is called when a component is rendered.
  componentDidMount() {
    this.refreshList();
  }

  // The refreshList function is reusable that is called each time an API request is completed.
  // It updates the Todo list to display the most recent list of added items.
  refreshList = () => {
    axios   // add axios to make the get request
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      // Be able to see any errors that might occur whilst connecting to the API.
      .catch(err => console.log(err));
  };

  // Takes in the status parameter to determine if task is completed or not.
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  // To show completed and incompleted tasks in separate tabs.
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          COMPLETED
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          INCOMPLETED
            </span>
      </div>
    );
  };

  // Main variable to render items on the screen (completed || incompleted).
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    // Maps each item and calls a callback function
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div
          className={`todo-title p mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
          <div class="text-muted badge p text-wrap mr-2">
            {item.description}
          </div>
        </div>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  // Toggle is a function used to control the Modal’s state i.e open or close the modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Submit an item
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // If old post to edit and submit
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // If new post to submit
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Delete item
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };

  // Create item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Edit item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  // Visual features and connection of Modal component.
  render() {
    return (
      <main className="content">
        <h1 className="text-black text-center my-4">TASK TRACKER</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  ADD TASK
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;