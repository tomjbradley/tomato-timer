import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import useKeyPress from "./hooks/useKeyPress";
import { SettingsProvider } from "./context/SettingsContext";

import "./App.scss";

function App() {
  useKeyPress();

  return (
    <SettingsProvider>
      <Header />
      <main>
        <section>
          <Container>
            <Timer />
            <TimerControls />
          </Container>
        </section>
        <Footer />
      </main>
    </SettingsProvider>
  );
}

export default App;
