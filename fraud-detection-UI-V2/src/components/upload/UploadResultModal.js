import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class UploadResultModal extends Component {
  render() {
    return (
      <div>
        {this.props.isSuccess && (
          <Modal
            isOpen={this.props.isSuccess}
            toggle={this.props.closeModal}
            centered={true}
          >
            <ModalHeader className="modalHeader">
              File uploaded successfully
            </ModalHeader>
            <ModalBody>
              File uploaded and processed successfully onto the system.{" "}
              <br></br>Total transaction records in the file{" "}
              {this.props.uploadDetails[0]}.<br></br>
              Number of Transactions classified as fraud{" "}
              {this.props.uploadDetails[1]}.
            </ModalBody>
            <ModalFooter>
              <button
                className="primary-theme-button"
                onClick={this.props.closeModal}
              >
                OK
              </button>
            </ModalFooter>
          </Modal>
        )}

        {!this.props.isSuccess && (
          <Modal
            isOpen={!this.props.isSuccess}
            toggle={this.props.closeModal}
            centered={true}
          >
            <ModalHeader className="modalHeader">
              File upload failure
            </ModalHeader>
            <ModalBody>Failed to upload file onto the system.</ModalBody>
            <ModalFooter>
              <Button
                className="primary-theme-button"
                onClick={this.props.closeModal}
              >
                OK
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

export default UploadResultModal;
