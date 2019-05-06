import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject } from "mobx-react";
import Link from "../Link";
import { Router } from "routes";

const styles = {
  mainNavigationContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#2A3330",
    padding: ".5rem",
    display: "flex",
    borderRadius: ".5rem .5rem 0 0"
  },
  navigationList: {
    width: "100%",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between"
  },
  navigationItem: {
    display: "inline-block",
    color: "#fff",
    fontSize: ".7rem",
    marginRight: "1rem",
    fontFamily: "sans-serif",
    background: "#2A3330",
    padding: ".5rem .8rem",
    borderRadius: "50%",
    outline: "none",
    // transform: "translateY(-40px)"
  },
  navigationItemSelected: {
    transform: "translateY(-40px)"
  }
};

@inject("uiStore")
@withStyles(styles, { name: "SkMainNavigation" })
class MainNavigation extends Component {
  static propTypes = {};

  static defaultProps = {
    classes: {}
  };

  componentDidMount() {
    console.log("Hello...");
  }

  handleNavigationChange = e => {
    console.log("e: ", e);
  };

  render() {
    return (
      <section style={styles.mainNavigationContainer}>
        <ul style={styles.navigationList}>
          <Link href="/">
            <li
              style={{
                ...styles.navigationItem,
                transform:
                  Router.router && Router.router.route === "/productGrid" ? "translateY(-40px)" : "translateY(0)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path fill="#fff" d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <span>Home</span>
            </li>
          </Link>
          <Link href="/cart">
            <li
              style={{
                ...styles.navigationItem,
                transform: Router.router && Router.router.route === "/cart" ? "translateY(-40px)" : "translateY(0)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path
                    fill="#fff"
                    d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
              </div>
              <span>Cart</span>
            </li>
          </Link>
          <Link href="/account">
            <li
              style={{
                ...styles.navigationItem,
                transform: Router.router && Router.router.route === "/account" ? "translateY(-40px)" : "translateY(0)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path
                    fill="#fff"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
                  />
                </svg>
              </div>
              <span>Account</span>
            </li>
          </Link>
          <Link href="/about">
            <li
              style={{
                ...styles.navigationItem,
                transform: Router.router && Router.router.route === "/about" ? "translateY(-40px)" : "translateY(0)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path
                    fill="#fff"
                    d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  />
                </svg>
              </div>
              <span>About</span>
            </li>
          </Link>
        </ul>
      </section>
    );
  }
}

export default MainNavigation;
