import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* aca va la aplicacion */}
      <h1>¡Hola, Vite!</h1>
      <p>Este es tu primer proyecto Vite</p>
    </>
  );
}

export default App;
