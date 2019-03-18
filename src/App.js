import React, { Component } from "react";
import buildings from "./BuildingsAvailability";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      data: [],
      searchResult: [],
      favourites: []
    };
    this.handleBuilding = this.handleBuilding.bind(this);
    this.handleRoom = this.handleRoom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
    this.handleDeleteFavourite = this.handleDeleteFavourite.bind(this);
  }

  async componentDidMount() {
    this.setState({ data: buildings });
  }

  handleBuilding(event) {
    this.setState({ building: event.target.value });
  }

  handleRoom(event) {
    this.setState({ room: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { building, room } = this.state;
    let result = [];
    if (
      this.state.data[building] !== undefined &&
      this.state.data[building][room] !== undefined
    )
      result = this.state.data[building][room];
    this.setState({
      searchResult: result
    });
  }

  handleAddFavourite(item) {
    if (!this.state.favourites.includes(item))
      this.setState({
        favourites: this.state.favourites.concat(item)
      });
  }

  handleDeleteFavourite(item) {
    if (this.state.favourites.includes(item))
      this.setState({
        favourites: this.state.favourites.filter(
          favourite => favourite !== item
        )
      });
  }

  render() {
    const { building, room, favourites, searchResult } = this.state;
    console.log(searchResult);

    return (
      <div className="App">
        <header className="appHeader">
          <p>Empty Classroom</p>
        </header>

        <form onSubmit={this.handleSubmit} className="searchWrapper">
          <input
            value={building}
            onChange={this.handleBuilding}
            placeholder="building..."
            className="searchBar"
          />
          <input
            value={room}
            onChange={this.handleRoom}
            placeholder="room..."
            className="searchBar"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <div className="items">
          {searchResult.map(item => (
            <div className="item">
              <div className="itemTitle">
                {favourites.includes(item) ? (
                  <div
                    className="favouriteIcon"
                    onClick={() => this.handleDeleteFavourite(item)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                ) : (
                  <div
                    className="normalIcon"
                    onClick={() => this.handleAddFavourite(item)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                )}
                {item ? `${item.building} ${item.room}` : ``}
              </div>
              <div className="itemDescription">
                <div className="itemDescription">
                  {`${item.subject} ${item.catalog_number} 
                      weekdays: ${item.weekdays}
                      start time: ${item.start_time}
                      end time: ${item.end_time}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {favourites.length > 0 && (
          <div className="favouriteContainer">
            <div className="typography">
              <header>Favourites</header>
            </div>
            <div className="items">
              {favourites.map(item => (
                <div className="item">
                  <div className="itemTitle">
                    <div
                      className="favouriteIcon"
                      onClick={() => this.handleDeleteFavourite(item)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    {item ? `${item.building} ${item.room}` : ``}
                  </div>
                  <div className="itemDescription">
                    <div className="itemDescription">
                      {`${item.subject} ${item.catalog_number} 
                      weekdays: ${item.weekdays}
                      start time: ${item.start_time}
                      end time: ${item.end_time}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
