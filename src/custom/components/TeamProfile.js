import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
};

const TeamProfile = withStyles(styles)(({ image, fullName, classes }) => {
  return <div style={{
    textAlign: "center",
    marginBottom: "2rem",
    fontFamily: "Lato, sans-serif",
  }}>
    <Avatar
      alt="" src={`https://via.placeholder.com/100`}
      className={classes.bigAvatar}
    />
    <span>{fullName}</span>
  </div>
});

export default TeamProfile;