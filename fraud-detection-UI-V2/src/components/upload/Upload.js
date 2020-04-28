import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import UploadResultModal from "./UploadResultModal";
import FileUploadApi from "../../api/apiHandler/FileUploadApi";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      fileUploadSuccess: false,
      showModal: false,
      uploadDetailsArray: [],
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      showModal: false,
      fileUploadSuccess: false,
      uploadDetailsArray: [],
      files: [],
      successfullUploaded: false,
    });
  }

  resetState() {
    this.setState({
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      fileUploadSuccess: false,
      showModal: false,
      uploadDetailsArray: [],
    });
  }

  onFilesAdded(files) {
    this.setState({
      files: files,
    });
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      document.getElementById("fileDialogOpener").value = "";
      console.log("Herre");
      this.setState({
        successfullUploaded: true,
        uploading: false,
      });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      //document.getElementById("fileDialogOpener").value = "";
      console.log("catch", e);
      this.setState({
        successfullUploaded: false,
        uploading: false,
        fileUploadSuccess: false,
        showModal: true,
      });
    }
  }

  renderProgress(file) {
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <img
            className="CheckIcon"
            alt="done"
            src="check_circle.svg"
            style={{
              opacity: this.state.fileUploadSuccess ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    return (
      <button
        className="primary-theme-button"
        disabled={this.state.files.length === 0 || this.state.uploading}
        onClick={this.uploadFiles}
      >
        Upload
      </button>
    );
  }

  sendRequest = (file) => {
    FileUploadApi.uploadFile(file)
      .then((response) => {
        let uploadDetailsArrayLoc = [];
        console.log(response, response.data);
        var obj = response.data;

        uploadDetailsArrayLoc.push(obj.totalRecordsInFile);
        uploadDetailsArrayLoc.push(
          obj.fraud_transactions.significant_transactions.length
        );
        this.setState({
          showModal: true,
          fileUploadSuccess: true,
          uploadDetailsArray: uploadDetailsArrayLoc,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ showModal: true, fileUploadSuccess: false });
      });
  };

  render() {
    return (
      <div className="Upload">
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map((file) => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        {this.state.showModal && (
          <UploadResultModal
            uploadDetails={this.state.uploadDetailsArray}
            isSuccess={this.state.fileUploadSuccess}
            closeModal={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default Upload;
