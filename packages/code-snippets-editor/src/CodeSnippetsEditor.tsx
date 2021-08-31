import React, { useEffect, useState } from "react";

const vscode = acquireVsCodeApi();

function handleAddClick() {
  vscode.postMessage({
    type: "add",
  });
}

function getState(text) {
  let json;
  try {
    if (!text) {
      text = "{}";
    }
    json = JSON.parse(text);
  } catch {
    return {};
  }
  return json;
}

const CodeSnippetsEditor = () => {
  debugger;
  // Webviews are normally torn down when not visible and re-created when they become visible again.
  // State lets us save information across these re-loads
  const [state, setState] = useState(getState(vscode.getState()));
  // useEffect(() => vscode.)
  console.log(state);

  useEffect(() => {
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
      const message = event.data; // The json data that the extension sent
      switch (message.type) {
        case "update":
          const text = message.text;
          setState(getState(text));

          // Then persist state information.
          // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
          vscode.setState({ text });

          return;
      }
    });
  }, []);

  return (
    <div className="App">
      {Object.entries(state).map((state) => {
        return state[0];
      })}
    </div>
  );
};

export default CodeSnippetsEditor;
