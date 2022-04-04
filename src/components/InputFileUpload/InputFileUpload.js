import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputFileUpload extends Component {
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  onFileChange = async (e) => {
    const { input, inputVal } = this.props;
    inputVal.push(e.target.files[0]);
    const targetFile = e.target.files[0];
    if (targetFile) {
      const val = await this.getBase64(targetFile);
      input.onChange(val);
    } else {
      input.onChange(null);
    }
  }
       

  render() {
    return <input onChange={this.onFileChange} type="file" />;
  }
}

InputFileUpload.propTypes = {
  input: PropTypes.arrayOf({}).isRequired,
  inputVal: PropTypes.arrayOf({}).isRequired,
  imgSource : PropTypes.arrayOf({}).isRequired,
};

export default InputFileUpload;
