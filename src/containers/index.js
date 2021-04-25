import React from 'react';
import './../global/styles/common.scss';
import Dashboard from './Dashboard';

import './../global/styles/common.scss';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#4452CE',
      light: '#4452CE',
      main: '#4452CE',
      dark: '#6744CC',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    }
  },
  overrides: {
    MuiCard: {
      root: {
        boxShadow: 'none',
        borderRadius: '8px',
      }
    }, 
    MuiTypography: {
      h6: {
        fontSize: '18px',
      },
      subtitle2: {
        fontSize: '12px',
      }
    }
  }
});



const Home = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="container">
          <Dashboard />

          {/* For testing Search Results Card */}
          {/* <SearchResults /> */}

          
        </div>
        {/* Footer */}
      </ThemeProvider>
    </div>
  );
};

export default Home;
