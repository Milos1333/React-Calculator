import "./App.css";
import Calculator from "./features/Calculator/Calculator";
import Footer from "./features/Footer/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Calculator />
      <Footer />
    </div>
  );
};

export default App;
