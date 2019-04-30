import React from "react";
import ReactDOM from "react-dom";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

export default class NewClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hits: [], isLoading: false, search: "", error: null };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => this.setState({ hits: data.hits, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
    //.then() is used because of latency between requesting data and actually receiving the data;
    //if not used user might have to wait 10+seconds before new data or any data is loaded;
  }

  onSearch(event) {
    var search = event.target.value;
    this.setState({ search });
  }
  filterList(currentValue) {
    let keep = true;
    if (this.state.search.trim().length > 0) {
      keep = currentValue.title.includes(this.state.search);
    }
    return keep;
  }

  render() {
    const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    /*if (isLoading) {
      return <p>Loading ...</p>;
    }*/

    return (
      <div>
        Search: &nbsp;{" "}
        <input
          type="text"
          value={this.state.search}
          onChange={this.onSearch.bind(this)}
        />
        <button> Search </button>
        <ul>
          {hits.filter(this.filterList.bind(this)).map(hit => (
            <li key={hit.objectID}>
              <a href={hit.url}>{hit.title}</a>
            </li>
          ))}
        </ul>
        {/*<h1>Empty class component</h1>*/}
      </div>
    );
  }
}
