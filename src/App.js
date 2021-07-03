
import Header from './components/Header'
import AddSelectors from './components/AddSelectors'
import SelectorsList from './components/SelectorsList'
import './App.css';

function App() {
  return (
    <div>
      <Header></Header>
      <div className="container pt-5 pb-5">
        <SelectorsList></SelectorsList>
        <AddSelectors></AddSelectors>
      </div>
     
    </div>
  );
}

export default App;
