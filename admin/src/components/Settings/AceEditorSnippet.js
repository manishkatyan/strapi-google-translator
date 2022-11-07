import AceEditor from "react-ace";
import React from "react";
import PropTypes from "prop-types";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const AceEditorSnippet = ({ value, handleChangeEditor }) => {
  return (
    <AceEditor
      placeholder="Edit glossary"
      mode="javascript"
      theme="monokai"
      name="demoCode"
      fontSize={18}
      showPrintMargin={false}
      onChange={handleChangeEditor}
      showGutter={false}
      highlightActiveLine={false}
      readOnly={false}
      minLines={2}
      maxLines={Infinity}
      width="auto"
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: false,
        tabSize: 2,
      }}
    />
  );
};

export default AceEditorSnippet;

AceEditorSnippet.propTypes = {
  value: PropTypes.string.isRequired,
};
