import "./style.scss";
// import "./App.css"
import React from "react";
import Filters from "./components/Filters";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Pagination from "./components/Pagination";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paintingsCount: 0, //общее количество картинок
      paintings: [], //массив картинок на одной странице
      authors: [],
      locations: [],
      textInput: "",
      textAuthor: "",
      textLocation: "",
      textCreatedFrom: "",
      textCreatedBefore: "",
      theme: localStorage.getItem("app-theme") || "dark",
      page: 1,
    };
    this.themeChange = this.themeChange.bind(this);
  }
  componentDidMount() {
    let paintingsCount = 0;
    fetch("https://test-front.framework.team/paintings?_limit=12&_page=1")
      .then((response) => {
        paintingsCount = response.headers.get("X-Total-Count");
        return response.json();
      })
      .then((fetchPaintings) => {
        this.setState({
          paintings: fetchPaintings,
          paintingsCount: paintingsCount,
        });
      });
    //для всех авторов
    fetch("https://test-front.framework.team/authors")
      .then((response) => {
        return response.json();
      })
      .then((fetchAuthors) => {
        this.setState({ authors: fetchAuthors });
      });
    //для всех локаций
    fetch("https://test-front.framework.team/locations")
      .then((response) => {
        return response.json();
      })
      .then((fetchLocations) => {
        this.setState({ locations: fetchLocations });
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.page !== prevState.page ||
      this.state.textInput !== prevState.textInput ||
      this.state.textAuthor !== prevState.textAuthor ||
      this.state.textLocation !== prevState.textLocation ||
      this.state.textCreatedFrom !== prevState.textCreatedFrom ||
      this.state.textCreatedBefore !== prevState.textCreatedBefore
    ) {
      let url = new URL("https://test-front.framework.team/paintings");
      url.searchParams.set("_limit", 12);
      url.searchParams.set("_page", this.state.page);
      if (this.state.textInput.length) {
        url.searchParams.set("name_like", this.state.textInput);
      }
      if (this.state.textAuthor.length) {
        let authorId = this.state.authors.find(
          (objectAuthor) => objectAuthor.name === this.state.textAuthor
        ).id;
        url.searchParams.set("authorId", authorId);
      }
      if (this.state.textLocation.length) {
        let locationId = this.state.locations.find(
          (objectLocation) =>
            objectLocation.location === this.state.textLocation
        ).id;
        url.searchParams.set("locationId", locationId);
      }
      if (this.state.textCreatedFrom !== "") {
        url.searchParams.set("created_gte", this.state.textCreatedFrom);
      }
      if (this.state.textCreatedBefore !== "") {
        url.searchParams.set("created_lte", this.state.textCreatedBefore);
      }

      let paintingsCount = 1;
      fetch(url)
        .then((response) => {
          response.headers.get("X-Total-Count") > 0
            ? (paintingsCount = response.headers.get("X-Total-Count"))
            : (paintingsCount = 1);
          return response.json();
        })
        .then((fetchPaintings) => {
          this.setState({
            paintings: fetchPaintings,
            paintingsCount: paintingsCount,
          });
        });
    }
  }

  themeChange(e) {
    e.preventDefault();
    if (this.state.theme === "dark") {
      this.setState({ theme: "light" });
    } else {
      this.setState({ theme: "dark" });
    }
  }

  render() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    localStorage.setItem("app-theme", this.state.theme);
    return (
      <div className="main">
        <div className="container">
          <Header themeChange={this.themeChange} theme={this.state.theme} />
          <Filters
            authors={this.state.authors}
            locations={this.state.locations}
            onChangeText={(e) => {
              this.setState({ textInput: e.target.value.trim() });
            }}
            onClickAuthor={(author) => {
              this.setState({ textAuthor: author.trim() });
            }}
            onClickLocation={(location) => {
              this.setState({ textLocation: location.trim() });
            }}
            onChangeTextFrom={(e) => {
              this.setState({ textCreatedFrom: e.target.value.trim() });
            }}
            onChangeTextBefore={(e) => {
              this.setState({ textCreatedBefore: e.target.value.trim() });
            }}
          />
          <Gallery
            paintings={this.state.paintings}
            authors={this.state.authors}
            locations={this.state.locations}
          />
          <Pagination
            page={this.state.page}
            pageCount={Math.ceil(this.state.paintingsCount / 12)}
            nextPage={(e) => {
              e.preventDefault();
              if (
                this.state.page !== Math.ceil(this.state.paintingsCount / 12)
              ) {
                this.setState({ page: this.state.page + 1 });
              }
            }}
            prevPage={(e) => {
              e.preventDefault();
              if (this.state.page !== 1) {
                this.setState({ page: this.state.page - 1 });
              }
            }}
            setPage={(e, pageNumber) => {
              e.preventDefault();
              this.setState({ page: pageNumber });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
