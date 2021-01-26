import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core/';
import { updateBlogPost } from '../flux/actions/blogPostActions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: '20px 0 20px 0',
    },
  },
};

function BlogUpdate({ match, location, classes, updateBlogPost }) {
  const [title, setTitle] = useState(location.blogPost.title);
  const [ingress, setIngress] = useState(location.blogPost.ingress);
  const [bodyText, setBodyText] = useState(location.blogPost.bodyText);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('PARAMSID', match.params.id);
    updateBlogPost(match.params.id, bodyText, title);

    setTitle('');
    setIngress('');
    setBodyText('');
  };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='outlined-basic'
          label='Blog post title'
          variant='outlined'
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Blog post ingress'
          variant='outlined'
          type='text'
          name='ingress'
          value={ingress}
          onChange={(e) => setIngress(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Blog post bodytext'
          variant='outlined'
          type='text'
          name='bodyText'
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(
  connect(mapStateToProps, { updateBlogPost })(BlogUpdate)
);
