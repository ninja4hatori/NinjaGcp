import React, { Component } from "react";
import {
  Button,
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

class SignificantTransactionDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessModal: false,
      showFailureModal: false,
    };
    this.handleRemarkSubmit = this.handleRemarkSubmit.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  closeFailureModal() {
    this.setState({ showFailureModal: false });
  }

  closeAllModals() {
    this.setState({ showSuccessModal: false });
    this.props.closeModal();
  }

  handleRemarkSubmit() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    var requestBody =
      '{"id":' +
      this.props.transactionDetails[0].innerText +
      ',"card_id":' +
      this.props.transactionDetails[1].innerText +
      ',"transaction_id":' +
      this.props.transactionDetails[2].innerText +
      ',"occurance":' +
      this.props.transactionDetails[3].innerText +
      ',"fraud_type": "' +
      this.props.transactionDetails[4].innerText +
      '","transaction_date": "' +
      this.props.transactionDetails[5].innerText +
      '","fraud_threshold":' +
      this.props.transactionDetails[6].innerText +
      ',"remark": "' +
      this.props.customerRemarks +
      '"}';
    console.log(requestBody);

    var theUrl = "http://localhost:9090/update-remarks";

    xmlhttp.open("POST", theUrl);

    xmlhttp.onload = () => {
      if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
        console.log("response", xmlhttp.responseText);
        this.setState({ showSuccessModal: true });
      } else if (xmlhttp.status >= 400) {
        this.setState({ showFailureModal: true });
      }
    };

    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(requestBody);
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.closeModal}>
        &times;
      </button>
    );

    var showModalForm =
      this.props.transactionDetails[1] &&
      this.props.transactionDetails[2] &&
      this.props.transactionDetails[3] &&
      this.props.transactionDetails[4] &&
      this.props.transactionDetails[5] &&
      this.props.transactionDetails[6];

    return (
      <div>
        {showModalForm && (
          <Modal
            isOpen={this.props.showModal}
            toggle={this.props.closeModal}
            className={this.props.className}
          >
            <ModalHeader
              className="modalHeader"
              toggle={this.props.closeModal}
              close={closeBtn}
              centered={true}
            >
              Transaction details
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label sm={4}>Card Id </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[1].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Transaction Id </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[2].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Occurrence </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[3].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Fraud priority </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[4].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Transaction date </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[5].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Fraud threshold </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      value={this.props.transactionDetails[6].innerText}
                      disabled={true}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Customer remarks </Label>
                  <Col sm={6}>
                    <Input
                      type="textarea"
                      value={this.props.customerRemarks}
                      rows={3}
                      onChange={this.props.handleCustomerRemarkInput}
                    />
                  </Col>
                </FormGroup>
              </Form>

              <Modal
                isOpen={this.state.showSuccessModal}
                toggle={this.closeAllModals}
                centered={true}
              >
                <ModalHeader>Details updated successfully</ModalHeader>
                <ModalBody>
                  The Customer remark <b>{this.props.customerRemarks}</b> for
                  transaction id{" "}
                  <b>{this.props.transactionDetails[2].innerText}</b> is
                  captured into the system.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.closeAllModals}>
                    OK
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.showFailureModal}
                toggle={this.closeFailureModal}
              >
                <ModalHeader>Details update failure</ModalHeader>
                <ModalBody>
                  Unable to capture customer remarks for transaction id
                  <b>{this.props.transactionDetails[2].innerText}</b> at the
                  moment. Please try again later. Alternatively, you can reach
                  out to our helpdesk for further assistance.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.closeFailureModal}>
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleRemarkSubmit}>
                Submit
              </Button>
              <Button color="secondary" onClick={this.props.closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

export default SignificantTransactionDetailsModal;
