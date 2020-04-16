import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import { Button } from "reactstrap";
import UploadResultModal from "./UploadResultModal";

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

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        console.log("progress", event);
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        console.log("load", event);
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        console.log("error", event);
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.onload = () => {
        if (req.status >= 200 && req.status < 400) {
          let uploadDetailsArrayLoc = [];
          var obj = JSON.parse(req.responseText);

          uploadDetailsArrayLoc.push(obj.totalRecordsInFile);
          uploadDetailsArrayLoc.push(
            obj.fraud_transactions.significant_transactions.length
          );
          this.setState({
            showModal: true,
            fileUploadSuccess: true,
            uploadDetailsArray: uploadDetailsArrayLoc,
          });
        } else if (req.status >= 400) {
          this.setState({ showModal: true, fileUploadSuccess: false });
        }
      };

      req.open("POST", "http://localhost:9090/uploadFile");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
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
      <Button
        color="primary"
        disabled={this.state.files.length === 0 || this.state.uploading}
        onClick={this.uploadFiles}
      >
        Upload
      </Button>
    );
  }

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
