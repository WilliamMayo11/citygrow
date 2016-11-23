import React, { Component } from 'react';
import "./GardenList.css";
import GardenListItem from '../GardenListItem/GardenListItem.jsx';

class GardenList extends Component {

  showGardens(collection) {
    return collection.map((garden, index) =>
      <article className="garden-list-item" key={index} onClick={()=>this.props.changeSelection(index)}>
        <GardenListItem
          key={garden.index}
          name={garden.name}
          zipcode={garden.zipcode}
        />
     </article>
    );
  }

  componentWillMount() {
    this.props.getAllGardens();
  }

  render(){
    return (
   <div>
        <div>
         <h3>Choose from existing gardens: </h3>
        </div>

        <GardenListItem />
        <div className="list-container">
         {this.showGardens(this.props.collection)}
        </div>
  </div>
    );
  }
}

export default GardenList;
