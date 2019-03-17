import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImageIcon from "@material-ui/icons/Image";
import Link from "../components/Link";

import { PatternLeft } from "../custom/components/BackgroundPattern";
import { Divider } from "@material-ui/core";

const styles = {
  sectionContainer: {
    padding: "1.5rem",
    position: "relative"
  },
  primary: {
    color: "#606060"
  },
  secondary: {
    color: "#B09A51"
  }
};

@withStyles(styles, { name: "SkCategories" })
export default class Categories extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    initialSize: PropTypes.object
  };

  renderRowCategory(categoryItem, key) {
    const { classes } = this.props;
    return (
      <Fragment>
        <Link href={`/${categoryItem.linkTo}`}>
          <ListItem key={key}>
            {categoryItem.icon}
            <ListItemText
              classes={{
                primary: classes.primary,
                secondary: classes.secondary
              }}
              primary={categoryItem.title}
              secondary={`${categoryItem.tags}`}
            />
          </ListItem>
        </Link>
        <Divider style={{
          background: "#F2EFE3"
        }} />
      </Fragment>
    );
  }

  renderDivider() {}

  renderKitchenIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          fill="#B09A51"
          d="M8 5h2v3H8zm0 7h2v5H8zm10-9.99L6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5z"
        />
      </svg>
    );
  }

  render() {
    const categories = [
      {
        title: "Kitchen",
        tags: "Wall, Base, Tall, Pantry",
        linkTo: "categories/kitchen",
        icon: this.renderKitchenIcon()
      },
      {
        title: "Bedroom",
        tags: "Nightstand, Closet",
        linkTo: "categories/bedroom",
        icon: this.renderKitchenIcon()
      },
      {
        title: "Bathroom",
        tags: "Vanities",
        linkTo: "categories/bathroom",
        icon: this.renderKitchenIcon()
      },
      {
        title: "Living Room",
        tags: "Table, Bookcases",
        linkTo: "categories/livingroom",
        icon: this.renderKitchenIcon()
      },
      {
        title: "Outdoors",
        tags: "Garage, Laundry",
        linkTo: "categories/outdoors",
        icon: this.renderKitchenIcon()
      }
    ];
    return (
      <Fragment>
        <PatternLeft />
        <List>{categories.map((elem, key) => this.renderRowCategory(elem, key))}</List>
      </Fragment>
    );
  }
}
