import { SnackbarProvider } from 'notistack';
// import { AuthenticationProvider } from "./context/reducers/auth/authContext";
import Routes from "./routes/routes";
import GlobalStyles from './shared/styles/global';

function App() {
  return (
    // <AuthenticationProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <GlobalStyles />
        <Routes />
      </SnackbarProvider>
    // </AuthenticationProvider>
  );
}

export default App;
