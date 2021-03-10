import React, { Component } from "react";
// importing all of these classes from reactstrap module
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// To build a class based component.
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  // This changes handler to check if a checkbox is checked or not.
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // Rendering modal in the custommodal class received toggle and onSave as props,
  // Toggle is a function used to control the Modal’s state i.e open or close the modal
  // onSave is a function that is called to save the edited values of the task item.
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task Item</ModalHeader>
        <ModalBody>
          {/* In the modalbody we can create a form for title, description, and completed ; the same fields as backend. */}
          <Form>

            {/* 3 formgroups
            Title label */}
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>

            {/* Description label */}
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
              />
            </FormGroup>

            {/* Completed label */}
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        {/* Create a modal footer which will have Save button. */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal