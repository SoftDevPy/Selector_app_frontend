import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header'
import AddSelectors from './components/AddSelectors'
import SelectorsList from './components/SelectorsList'
import './App.css';

function App(props) {
  return (
    <Router>
      <Header></Header>

      <div className="container pt-5 pb-5">
        <Switch>
          <Route path="/" exact={true}>
            <SelectorsList></SelectorsList>
          </Route>
          <Route path="/add" exact={true}>
            <AddSelectors></AddSelectors>
          </Route>
        </Switch>
        
       
      </div>
     
    </Router>
  );
}

export default App;
