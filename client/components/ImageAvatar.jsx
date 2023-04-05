import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { teal } from '@mui/material/colors';
import { UserContext } from '../index.jsx';

const styles = {
  tab: {
    color: '#E7F6F2',
  },
};

const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'black',
  fontSize: 17,
};

export default function ImageAvatar(props) {
  const user = useContext(UserContext);
  if (user) {
    return (
      <Grid xs={2}>
        <Link to='/profile' style={linkStyle}>
          {
            <Tab
              icon={
                <Avatar
                  alt={
                    user.lastName
                      ? user.firstName[0] + user.lastName[0]
                      : user.firstName[0]
                  }
                  src={user.image}
                  sx={{ width: 24, height: 24 }}
                />
              }
              style={styles.tab}
              label='PROFILE'
            />
          }
        </Link>
      </Grid>
    );
  }
  return (
    <Grid xs={2}>
      <Link to='/profile' style={linkStyle}>
        {
          <Tab
            icon={<AccountCircleIcon sx={{ color: teal[100] }} />}
            style={styles.tab}
            label='PROFILE'
          />
        }
      </Link>
    </Grid>
  );
}
