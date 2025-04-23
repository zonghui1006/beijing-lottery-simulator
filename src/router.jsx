import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // 原主页
import ImageCarousel from "./ImageCarousel"; // 刚创建的页面

export default function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<ImageCarousel />} />
      </Routes>
    </Router>
  );
}
