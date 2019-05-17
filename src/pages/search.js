import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "../components/SearchIcon";
import Link from "../components/Link";
import { PlainOptionButton } from "../custom/components/Buttons";

const styles = () => ({
  container: {
    padding: "1rem"
  },
  searchInputContainer: {
    width: "100%"
  },
  searchOutputContainer: {
    background: "#fff",
    width: "100%",
    height: "35rem"
  },
  searchOutputContainerUl: {
    listStyle: "none",
    padding: "none",
    margin: "none"
  },
  searchOutputContainerLi: {
    marginBottom: "2rem",
    color: "#909090",
    cursor: "pointer",
  }
});

@inject("authStore")
@inject("uiStore")
@withStyles(styles)
@observer
export default class Search extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  state = {
    query: "",
    results: []
  };

  onInput = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  clearInput = () => {
    this.setState({
      query: "",
    });
  }

  onSearch = () => {
    const staticData = [
      "Modern Base Kitchen Cabinet",
      "Modern Pearl White Cabinet",
      "Modern Tail Cabinet",
      "Modern Wall High Cabinet"
    ];

    this.setState({
      results: staticData
    });
  }

  renderSearchInput() {
    return (
      <Fragment>
        <FormControl
          style={{
            margin: "2rem",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between"
          }}
          fullWidth
        >
        <span
          tabIndex={0}
          role="button"
          onClick={this.clearInput}
          style={{
            width: "40px",
            paddingTop: "1rem",
            fontSize: "1.25rem",
            outline: "none"
          }}>✕</span>
          <Input
            id="searchInput"
            type="text"
            value={this.state.query}
            fullWidth
            onChange={this.onInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.onSearch}>
                  <SearchIcon onSearchPage={true} />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Fragment>
    );
  }

  renderOutputResults() {
    if (this.state.results.length === 0) {
      return <CategorySelects />
    }
    const { classes } = this.props;
    return (
      <div className={classes.searchOutputContainer}>
        <ul className={classes.searchOutputContainerUl}>
          {this.state.results.map((line, key) => (
            <Link key={key} href="/ideas">
              <li className={classes.searchOutputContainerLi}>
                {line}
              </li>
            </Link>
          ))}
        </ul>
        <InterestedIn />
      </div>
    );
  }

  render() {
    const { shop, classes } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Search | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <section className={classes.container}>
          <Grid container spacing={24}>
            {this.renderSearchInput()}
          </Grid>
          <Grid container spacing={24}>
            {this.renderOutputResults()}
          </Grid>
        </section>
      </Fragment>
    );
  }
}

const CategorySelects = () => {
  return <section>
    <h2 style={{
      fontSize: "1rem",
      color: "#4E4E4E",
      fontFamily: "Lato, Regular",
      fontWeight: 200,
      marginLeft: ".5rem",
      paddingTop: "10rem"
    }}>
      Categories:
    </h2>
    <PlainOptionButton label="Kitchen" />
    <PlainOptionButton label="Bedroom" />
    <PlainOptionButton label="Bathroom" />
    <PlainOptionButton label="Living Room" />
    <PlainOptionButton label="Outdoor" />
  </section>
}

const InterestedIn = () => {
  return <section>
    <h2 style={{
      fontSize: "1rem",
      color: "#4E4E4E",
      fontFamily: "Lato, Regular",
      fontWeight: 200,
      marginLeft: ".5rem",
      paddingTop: "4rem"
    }}>
      You may be interested in:
    </h2>
    <PlainOptionButton label="Sample Doors" />
    <PlainOptionButton label="Sample Kitchen Set" />
    <PlainOptionButton label="Soft White" />
    <PlainOptionButton label="Silver" />
  </section>
}
