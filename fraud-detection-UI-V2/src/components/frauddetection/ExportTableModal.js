import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Col,
  Input,
} from "reactstrap";

class ExportTableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportFileType: "csv",
    };
    this.handleExportTypeDropdownChange = this.handleExportTypeDropdownChange.bind(
      this
    );
    this.handleExportTableSubmit = this.handleExportTableSubmit.bind(this);
  }

  handleExportTypeDropdownChange(event) {
    this.setState({ exportFileType: event.target.value });
  }

  handleExportTableSubmit() {
    console.log(this.props.tableId.split("Export")[0]);
    window.exportToFile(
      this.props.tableId.split("Export")[0],
      this.state.exportFileType,
      this.props.tableId.split("Export")[0] + "-export"
    );
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.props.closeModal}
          className={this.props.className}
          centered={true}
        >
          <ModalHeader className="modalHeader" toggle={this.props.closeModal}>
            Export table
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={4}>Export table as </Label>
                <Col sm={4}>
                  <Input
                    type="select"
                    value={this.state.exportFileType}
                    onChange={this.handleExportTypeDropdownChange}
                  >
                    <option value="csv">CSV</option>
                    <option value="sql">SQL</option>
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                    <option value="pdf">PDF</option>
                  </Input>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <button
              className="primary-theme-button"
              onClick={this.handleExportTableSubmit}
            >
              Submit
            </button>
            <button
              className="secondary-theme-button"
              onClick={this.props.closeModal}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ExportTableModal;
