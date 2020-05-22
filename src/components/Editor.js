import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./Editor.scss";
import "react-quill/dist/quill.snow.css";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.reactQuillRef.getEditor().blur();
    this.reactQuillRef.blur();
  }

  componentDidUpdate() {
    let { focus } = this.props;

    if (focus !== undefined && focus === true) {
      console.log("focus");
      this.focusEditor();
    }
  }

  focusEditor() {
    this.reactQuillRef.getEditor().focus();
    this.reactQuillRef.focus();
  }

  getValue() {
    let { value } = this.props;

    if (value !== undefined) {
      return value;
    }

    return "";
  }

  onContentChangeListener(content, delta, source, editor) {
    let { onContentChange } = this.props;
    if (onContentChange !== undefined) {
      onContentChange(content, delta, source, editor);
    }
  }

  render() {
    let value = this.getValue();

    return (
      <div className="kohub-editor">
        <ReactQuill
          onChange={this.onContentChangeListener.bind(this)}
          value={value}
          id="reactQuillRef"
          ref={(el) => {
            this.reactQuillRef = el;
          }}
        >
          <div className="kohub-editor-area"></div>
        </ReactQuill>
      </div>
    );
  }
}

export default Editor;
