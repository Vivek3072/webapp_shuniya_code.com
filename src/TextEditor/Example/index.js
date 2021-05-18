import React from "react";
import MyEditor from "./editor";

const styles = {
  fontFamily: "sans-serif"
};

const MentionEditor = () => (
  <div style={styles}>
    <h1>draft-js-mention-plugin</h1>
    <MyEditor />
  </div>
);

export default MentionEditor