import React, { useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  const [store, setStore] = useContext(userContext);
  console.log('store', store);
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const updateData = { ...store };
        updateData.userInfo = user;
        setStore(updateData);
        history.replace(from);

        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            localStorage.setItem('token', idToken);
            console.log(idToken);
          })
          .catch(function (error) {
            // Handle error
          });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
      });
  };
  return (
    <div>
      <button onClick={handleLogin}>Google Login</button>
    </div>
  );
};

export default Login;
