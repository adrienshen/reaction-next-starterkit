import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
// import InPageMenu from "@reactioncommerce/components/InPageMenu/v1";
// import ErrorPage from "./_error";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "../components/SearchIcon";
import Link from "../components/Link";

const styles = theme => ({
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
    query: ""
  };

  onInput = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  renderSearchInput() {
    return (
      <Fragment>
        <FormControl style={{
          marginBottom: "2rem"
        }}
        fullWidth>
          <Input
            id="searchInput"
            type="text"
            value={this.state.query}
            fullWidth
            onChange={this.onInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="Toggle password visibility" onClick={() => console.log("Search here...")}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Fragment>
    );
  }

  renderOutputResults() {
    const { classes } = this.props;
    const staticData = [
      "Modern Base Kitchen Cabinet",
      "Modern Pearl White Cabinet",
      "Modern Tail Cabinet",
      "Modern Wall High Cabinet"
    ];
    return (
      <div className={classes.searchOutputContainer}>
        <ul className={classes.searchOutputContainerUl}>
          <li className={classes.searchOutputContainerLi}>query results</li>
          {staticData.map((line, key) => (
            <Link key={key} href="/ideas">
              <li className={classes.searchOutputContainerLi}>
                {line}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet
          title={`Search | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <Grid container spacing={24}>
          {this.renderSearchInput()}
        </Grid>
        <Grid container spacing={24}>
          {this.renderOutputResults()}
        </Grid>
      </Fragment>
    );
  }
}
