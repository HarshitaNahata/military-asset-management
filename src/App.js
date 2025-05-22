// Updated App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Header from './components/Common/Header'; // Missing component
import Dashboard from './components/Dashboard/Dashboard';
import Purchases from './pages/Purchases';
import Transfers from './pages/Transfers';
import Login from './pages/Login';
import AssignmentsExpenditure from './pages/Assignments'; // Missing page

// Missing theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute requiredRoles={['admin', 'commander', 'logistics']} />}>
              <Route path="/" element={
                <>
                  <Header /> {/* Missing header */}
                  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Dashboard />
                  </Container>
                </>
              } />
              <Route path="/purchases" element={
                <>
                  <Header />
                  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Purchases />
                  </Container>
                </>
              } />
              <Route path="/transfers" element={
                <>
                  <Header />
                  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Transfers />
                  </Container>
                </>
              } />
              {/* Missing assignments route */}
              <Route path="/assignments" element={
                <>
                  <Header />
                  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <AssignmentsExpenditure />
                  </Container>
                </>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
