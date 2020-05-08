import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core/";
import { logout } from "../../flux/actions/authActions";

const Logout = (props) => {
  return (
    <Fragment>
      <Link onClick={props.logout} href="#" style={{ textDecoration: "none" }}>
        {props.children}
      </Link>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
