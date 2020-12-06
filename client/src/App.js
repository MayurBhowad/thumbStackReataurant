
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './compnents/home/Home.component';
import Order from './compnents/home/Order.component';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store.redux';
import Bill from './compnents/Bill.component';
import FindBill from './compnents/findBill/FindBill.component';
import BillDetails from './compnents/BillDetails.component';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Order} />
          </Switch>
          <Switch>
            <Route path="/bill" exact component={Bill} />
          </Switch>
          <Switch>
            <Route path="/billNumber" exact component={FindBill} />
          </Switch>
          <Switch>
            <Route path="/billDetails" exact component={BillDetails} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
