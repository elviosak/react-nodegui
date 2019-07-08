import { Renderer, View, Text } from "./index";
import React, { useEffect, useState, useRef } from "react";
import { QMainWindow } from "@nodegui/nodegui";

const TestHook = () => {
  const [value, setValue] = useState("No Date");
  useEffect(() => {
    setInterval(() => {
      setValue(`My: ${Date.now()}`);
    }, 1000);
  }, []);
  return (
    <View>
      <Text>{`Hooked: ${value}`}</Text>
    </View>
  );
};
class Test extends React.Component {
  state = {
    value: "No",
    visible: false
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ value: `${Date.now()}` });
    }, 500);
  }
  render() {
    return <Text id="yolo">{`Molo ${this.state.value}`}</Text>;
  }
}

const App = () => {
  return (
    <View id="divy">
      <Text id="hello">Hello</Text>
      <Test />
      <TestHook />
      <Text id="world">{`World`}</Text>
    </View>
  );
};

const win = new QMainWindow();
win.resize(400, 400);
win.setStyleSheet(`
  QWidget#rootView {
    qproperty-flex: 1;
    qproperty-alignSelf: 'stretch';
  }
  #divy {
    background-color: #80cbc4;
    qproperty-flex: 1;
    qproperty-flexDirection: column;
    qproperty-alignItems: "center";
    qproperty-justifyContent: "space-around";
  }
  #hello {
    color: blue;
    font-weight: bold;
    font-size: 25px;
  }
  #world {
    color: red;
  }
`);

Renderer.render(<App />, win, () => {
  console.log("rendered");
});
