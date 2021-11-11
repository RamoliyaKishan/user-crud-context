import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './components/About';
import Header from './components/Header';
import { UsersContext } from './context/UsersContext';
import AddUser from './views/userForm/AddUser';
import UserTable from './views/userList/UserTable';

toast.configure();

function App() {
	const [usersList, setUsersList] = useState([]);
	return (
		<Router>
			<Header />
			<Switch>
				<UsersContext.Provider value={{ usersList, setUsersList }}>
					<Route path='/' exact component={UserTable} />
					<Route path='/addUser' exact component={AddUser} />
					<Route path='/addUser/:id' exact component={AddUser} />
					<Route path='/about' exact component={About} />
				</UsersContext.Provider>
			</Switch>
		</Router>
	);
}

export default App;
