import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject } from "mobx-react";

import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputBase, IconButton } from "@material-ui/core";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: "1rem"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    color: "#aaa",
    width: "60px",
    padding: "8px 26px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = {
  container: {
    minWidth: 275,
    background: "#444",
    color: "#fff",
    position: "absolute",
    top: "5rem",
    right: 0,
    height: "20rem",
    width: "100vw",
    padding: "1rem 2rem",
    transition: "all 400ms ease-in"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "1.5rem"
  },
  buttons: {},
  buttonFilters: {
    marginBottom: "2rem"
  },
  selectContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "2rem"
  },
  selects: {
    padding: ".25rem 1rem",
    fontSize: "1rem",
    background: "#fff",
    color: "#aaa",
    outline: "none",
    width: "5rem",
    marginBottom: "1rem",
    marginTop: ".5rem"
  },
  selectLabels: {
    marginRight: "1.5rem",
    fontFamily: "Lato, sans-serif",
    marginTop: ".5rem",
    textAlign: "left"
  },
  caret: {
    display: "block",
    fontFamily: "san-serif",
    color: "#aaa",
    position: "absolute",
    fontSize: "2rem",
    marginTop: "-10px",
    right: 25
  }
};

@inject("uiStore")
@withStyles(styles, { name: "CFilterWidget" })
class FilterWidget extends Component {
  state = {
    // Light, Medium, Dark
    shadeFilterSelected: null,
    price: null,
    itemsPerPage: null
  };

  componentDidMount() {
    console.log("... props ...", this.props);
  }

  selectShadeFilter = option => {
    console.log("option: ", option);
    this.setState({
      shadeFilterSelected: option
    });
  };

  handleSelect = (label, value) => {
    this.setState({
      [label]: value
    });
  };

  render() {
    const { classes } = this.props;
    console.log("this.props.open: ", this.props);
    return (
      <Card
        style={{
          ...styles.container,
          transform: this.props.open ? "translateX(0)" : "translateX(100vw)"
        }}
      >
        <section className={classes.title}>
          <IconButton onClick={this.props.toggleFilter}
            style={{
              position: "absolute",
              left: -10,
              top: 10
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="#fff" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
            </svg>
          </IconButton>
          <span>Filters</span>
        </section>
        <section className={classes.buttonFilters}>
          <FilterButton
            selectShadeFilter={this.selectShadeFilter}
            label="Light"
            selected={this.state.shadeFilterSelected}
          />
          <FilterButton
            selectShadeFilter={this.selectShadeFilter}
            label="Medium"
            selected={this.state.shadeFilterSelected}
          />
          <FilterButton
            selectShadeFilter={this.selectShadeFilter}
            label="Dark"
            selected={this.state.shadeFilterSelected}
          />
        </section>
        <section>
          <SortByPrice value={this.state.price} handleSelect={this.handleSelect} />
          <ShowPagination value={this.state.itemsPerPage} handleSelect={this.handleSelect} />
        </section>
      </Card>
    );
  }
}

function FilterButton({ selectShadeFilter, label, selected }) {
  return (
    <button
      onClick={() => selectShadeFilter(label)}
      style={{
        padding: ".5rem 1.5rem",
        color: selected === label ? "#eee" : "#222",
        background: selected === label ? "#b09a51" : "#f3f0e4",
        borderRadius: "4px",
        marginRight: ".25rem",
        border: "none",
        fontSize: ".8rem",
        fontFamily: "Lato, sans-serif",
        outline: "none",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
}

function SortByPrice({ handleSelect, value }) {
  return (
    <div style={styles.selectContainer}>
      <label style={styles.selectLabels} htmlFor="sortBy">
        Sort by
      </label>
      <FormControl>
        <Select
          placeholder=""
          value={value}
          onChange={e => handleSelect("price", e.target.value)}
          input={<BootstrapInput name="age" id="age-customized-select" />}
        >
          <MenuItem value="">Price</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function ShowPagination({ handleSelect, value }) {
  return (
    <div style={styles.selectContainer}>
      <label style={styles.selectLabels} htmlFor="show">
        Show
      </label>
      <FormControl>
        <Select
          placeholder="10"
          value={value}
          onChange={e => handleSelect("itemsPerPage", e.target.value)}
          input={<BootstrapInput name="age" id="age-customized-select" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterWidget;
