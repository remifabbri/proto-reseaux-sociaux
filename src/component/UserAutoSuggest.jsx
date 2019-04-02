import styles from './AutoSuggest.less';

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// import languages from './languages'; props.allUsers
// import { escapeRegexCharacters } from 'utils/utils';


export default class UserAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }


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
  
  renderSuggestion = suggestion => <span>{suggestion.firstname}</span>;

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

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
      placeholder: "Search for someone",
      value,
      onChange: this.onChange
    };

    return (
      <div id="basic-example" className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.title}>Basic</div>
          <div className={styles.description}>
            Let’s start simple. Here’s a plain list of suggestions.
          </div>
          
        </div>
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