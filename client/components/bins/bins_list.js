import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsList extends Component {
  onBinRemove(bin) {
    Meteor.call('bins.remove', bin);
  }

  renderList() {
    console.log(this.props.bins);
    return this.props.bins.map(bin => {
      const url = `/bins/${bin._id}`;

      return (
        <li className="list-group-item" key={bin._id}>
          Bin { bin._id }
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onBinRemove(bin)}>
              Remove
            </button>
          </span>
        </li>
      )
    })
  }
  render() {
    console.log(this.props.bins);
    return (
      <ul className="list-group-item">
        {this.renderList()}
      </ul>
    );
  }
}

export default createContainer(() => {

  Meteor.subscribe('bins');

  return { bins: Bins.find({}).fetch() };

}, BinsList)
