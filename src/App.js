import logo from './logo.svg';
import './App.css';
import Header from './Header';
import UsersTable from './users_table/UsersTable';
import ModalWindow from './users_table/ModalWindow';
import Footer from './Footer';


function App() {
  return (
    <div className = "container">
      <Header />
      <UsersTable />
      <ModalWindow />
      {/*<Footer />*/}
    </div>
  );
}

export default App;
