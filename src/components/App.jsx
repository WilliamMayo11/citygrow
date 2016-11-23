import React, { Component } from 'react';
import GardenForm from './GardenForm/GardenForm.jsx';
import GardenList from './GardenList/GardenList.jsx';
// import GardenListItem from './GardenListItem/GardenListItem.jsx';
import GardenDisplay from './GardenDisplay/GardenDisplay.jsx';
import style from './App.css';
import './normalize.css';

class App extends Component {

  constructor(props) {
    super();
    console.log(this);
    this.state = {
      gardens: [],
      selected: '',
      name: '',
      zipcode: '',
      user_id: '',
      garden_id: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8: '',
      q9: ''
    };
  }

  changeSelection(num) {
    this.setState({
      selected: this.state.gardens[num],
    });
  }

  getAllGardens() {
    fetch(`/db/gardens`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        gardens: data
      });
      // console.log('************App.jsx data: ' + data);
    })
    .catch(err => console.log(err));
  }

  updateFormName(e) {
    this.setState({
      name: e.target.value,
    });
    // console.log(this.state.name);
  }

  updateFormZip(e) {
    this.setState({
      zipcode: e.target.value,
    });
    // console.log(this.state.zipcode);
  }

  updateFormId(e) {
    this.setState({
      user_id: e.target.value,
    });
    // console.log(this.state.user_id);
  }

  handleFormSubmit() {
    fetch('/db/gardens', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        zipcode: this.state.zipcode,
        user_id: this.state.user_id
      })
    })
    .then(this.setState({
      name: '',
      zipcode: '',
      user_id: ''
    }))
    .then(this.getAllGardens())
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
      <header>
        <h1 id="header-text">CityGrow</h1>
      </header>
      <GardenForm
        name={this.state.name}
        zipcode={this.state.zipcode}
        user_id={this.state.user_id}
        updateFormName={event => this.updateFormName(event)}
        updateFormZip={event => this.updateFormZip(event)}
        updateFormId={event => this.updateFormId(event)}
        handleFormSubmit={event => this.handleFormSubmit()}
        getLastGardenId={event => this.getLastGardenId(event)}
        updateFormGardenId={event => this.updateFormGardenId(event)}
        garden_id={this.state.garden_id}

      />
      <div className="flex-container">
      <GardenList
        getAllGardens={this.getAllGardens.bind(this)}
        collection={this.state.gardens}
        changeSelection={this.changeSelection.bind(this)}
      />
      <GardenDisplay
        garden={this.state.selected}
      />
      </div>

      </div>
    );
  }
}

export default App;
