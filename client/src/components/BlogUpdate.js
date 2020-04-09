import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core/";
import { updateBlogPost } from "../flux/actions/blogPostActions";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0"
    }
  }
};

function BlogUpdate(props) {
  const [values, setValues] = useState({
    _id: "",
    title: "",
    bodyText: "",
    date: ""
  });

  const {
    match: { params }
  } = props;

  const { classes } = props;

  const { updateBlogPost } = props;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/blogposts/${params.id}`).then(res => {
        console.log("update", res.data[0]);
        setValues(res.data[0]);
      });
    };
    fetchData();
  }, [params.id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("VALUES", values);
    updateBlogPost(values._id, values);

    setValues({ title: "", bodyText: "" });
  };

  return (
    <div>
      {values ? (
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Blog post title"
            variant="outlined"
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />

          <TextField
            id="outlined-basic"
            label="Blog post bodytext"
            variant="outlined"
            type="text"
            name="bodyText"
            value={values.bodyText}
            onChange={handleInputChange}
          />
          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  blogPost: state.blogPost
});

export default withStyles(styles)(
  connect(mapStateToProps, { updateBlogPost })(BlogUpdate)
);
