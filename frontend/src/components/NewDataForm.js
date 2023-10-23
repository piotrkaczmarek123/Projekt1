import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    pk: null,
    data: [""]
  };

  addNewLine = () => {
    this.setState(prevState => ({
      data: [...prevState.data, ""]
    }));
  };  

  onChangeLine = (e, index) => {
    const newData = [...this.state.data];
    newData[index] = e.target.value;
    this.setState({ data: newData });
  };  

  componentDidMount() {
    if (this.props.data) {
      const { pk, data } = this.props.data;
      this.setState({ pk, data });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createData = e => {
    e.preventDefault();
    axios.post(API_URL, this.state.data.map(item => ({ data: item }))).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };
  
  editData = e => {
    e.preventDefault();
    axios.put(API_URL + this.props.pk, { data: this.state.data }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };  

  deleteData = () => {
    axios.delete(API_URL + this.state.pk + '/').then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.data ? this.editData : this.createData}>
        {this.state.data.map((line, index) => (
          <FormGroup key={index}>
            <Label for={`data${index}`}>Data:</Label>
            <Input
              type="text"
              name={`data${index}`}
              onChange={e => this.onChangeLine(e, index)}
              value={this.defaultIfEmpty(line)}
            />
          </FormGroup>
        ))}
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button type="submit">Send</Button>
          <Button type="button" onClick={this.addNewLine}>+</Button>
        </div>
      </Form>
    );
  }  
}

export default NewDataForm;
