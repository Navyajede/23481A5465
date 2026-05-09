import { Log } from "./utils/logger";

function App() {

  const handleClick = async () => {

    console.log("Before Log");

    await Log(
      "info",
      "component",
      "Button clicked"
    );

    console.log("After Log");

  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Logger Test</h1>

      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

export default App;