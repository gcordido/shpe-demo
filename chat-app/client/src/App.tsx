import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from './NoPage';
import { Home } from './Home';
import { FullChatApp, SimpleChatApp } from './ChatApp';

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="simple-chat" element={<SimpleChatApp/>} />
          <Route path="full-chat" element={<FullChatApp/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
