import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { SettingsProvider } from "./context/SettingsContext";

import "./App.scss";

function App() {
  return (
    <SettingsProvider>
      <Header />
      <main>
        <section>
          <Container>
            <Timer />
          </Container>
        </section>
        <Footer />
      </main>
    </SettingsProvider>
  );
}

export default App;
