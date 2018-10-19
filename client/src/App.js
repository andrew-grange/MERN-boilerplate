import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './State/Reducers';
import { MainPage } from './Components/MainPage'; // Use this syntax { ImportedComponent } when the export is not the main export in the file.
//You can have multiple exports in a file and import them with this syntax import { FirstComponent, SecondComponent } from
//'./Components/multipleComponents';
let store = createStore(reducer, applyMiddleware(thunk));

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: {}
        };
    }

    setAuth = (auth, user) => {
        this.setState({isAuthenticated: auth, user: user});
    };

    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MainPage setAuth={this.setAuth} user={this.state.user} isAuthenticated={this.state.isAuthenticated}/>
                </BrowserRouter>
            </Provider>
        );
    }
}
