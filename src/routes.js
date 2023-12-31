import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import Signup from "./Signup.js";
import Login from "./Login.js";
import { SnackbarError } from "./components";
import Home from "./components/Home.js";
import Sign from "./Sign";
import ProfilesRender from "./components/ProfilesRender";
import DogsRenders from "./components/petsPages/DogsRenders";
import CatsRender from "./components/petsPages/CatsRender";
import Aboutus from "./components/Aboutus";
import CareAfterAdoption from "./components/CareAfterAdoption";
import Contactus from "./components/Contactus";
import AdoptionProcess from "./components/AdoptionProcess";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      {/* <Header/> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route path="/sign" component={Sign} />
        {/* <Route path="/chat" component={Chat} /> */}
        <Route path="/profile" component={ProfilesRender} />
        <Route path="/dogs" component={DogsRenders} />
        <Route path="/cats" component={CatsRender} />
        {/* <Route path="/adopt" component={Adopt} /> */}
        <Route path="/aboutus" component={Aboutus} />
        <Route path="/careafteradoption" component={CareAfterAdoption} />
        <Route path="/contactus" component={Contactus} />

        <Route path="/process" component={AdoptionProcess} />






        {/* <Route
          path="/chat"
          element={<Chat/>}
        > </Route> */}
        <Route path="/" component={Home} />
      </Switch>
      {/* <Footer/> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
