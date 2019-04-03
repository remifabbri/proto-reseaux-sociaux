import React, { Component } from 'react';
import styles from './AutoSuggest.css';
import Autosuggest from 'react-autosuggest';
import OtherUser from './otherUser/OtherUser';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { createHashHistory } from 'history'; 

// import languages from './languages'; props.allUsers
// import { escapeRegexCharacters } from 'utils/utils';
export const history = createHashHistory(); 

export default class UserAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  history = this.props;

  getSuggestions = value => {
  
    if (value === '') {
      return [];
    }
  
    return this.props.allUsers.filter(user => {
      console.log(user.firstname, value, user.firstname.indexOf(value) !== -1)
      return (user.firstname.indexOf(value) !== -1)
    });
  };
  
  getSuggestionValue = suggestion => suggestion.firstname;
  
  renderSuggestion = suggestion => <span onClick={this.redirectToUser}>{suggestion.firstname} </span>;


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  redirectToUser = (param) => {
    this.history.push(`user/${param}`);
    
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Recherche ...",
      value,
      onChange: this.onChange
    };

    return (
      <div id="basic-example" className={styles.container}>
        <div className={styles.autosuggest}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            focusInputOnSuggestionClick={this.focusInputOnSuggestionClick}
            id="basic-example"
          />
        </div>
      </div>
    );
  }
}