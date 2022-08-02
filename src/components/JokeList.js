import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [], loading: true };

    this.getJoke = this.getJoke.bind(this);
    this.changeVote = this.changeVote.bind(this);
  }
  async getJoke() {
    const joke = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    this.setState({
      jokes: [...this.state.jokes, { ...joke.data, votes: 0 }],
      loading: false,
    });
  }
  componentDidMount() {
    this.getJoke();
  }
  changeVote(id, vote) {
    const updatedJokes = this.state.jokes.map((j) => {
      if (j.id === id) {
        return { ...j, votes: j.votes + vote };
      }
      return j;
    });
    this.setState({ jokes: updatedJokes });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="side-bar">
          <h1>
            Dad <span>Jokes</span>
          </h1>
          <div>
            <img
              alt="laughiting smile"
              src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            />
          </div>
          <button
            onClick={() => {
              this.setState({ loading: true });
              this.getJoke();
            }}
          >
            New
            <span> Jokes</span>
          </button>
        </div>
        <div className="joke-list">
          {this.state.jokes.map((joke) => (
            <Joke key={joke.id} joke={joke} vote={this.changeVote} />
          ))}
        </div>
      </div>
    );
  }
}
export default JokeList;
