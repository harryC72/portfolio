import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux';
import { addBlogPost } from '../flux/actions/blogPostActions';
import PopUp from './PopUp';

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: '20px 0 20px 0',
    },
  },
};

export function BlogInput({ classes, addBlogPost, blogPost }) {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [ingress, setIngress] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [file, setFile] = useState('');
  const [alt, setAlt] = useState('');

  const formIsValid = () => {
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!file) errors.file = 'Image is required';
    if (!alt) errors.alt = 'Alternative image text is required';
    if (!ingress) errors.ingress = 'Ingress is required';
    if (!bodyText) errors.body = 'Body text is required';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      file,
      alt,
      ingress,
      bodyText,
    };
    console.log('INPUT', newPost);
    if (!formIsValid()) return;
    addBlogPost(newPost);
    setTitle('');
    setFile('');
    setAlt('');
    setIngress('');
    setBodyText('');
  };

  const saveButton = () =>
    blogPost.loading ? (
      <Button type='submit'>Saving...</Button>
    ) : (
      <Button type='submit'>Save</Button>
    );

  return (
    <Fragment>
      {blogPost.error ? (
        <PopUp severity='error' message={blogPost.error} />
      ) : null}
      {blogPost.message ? (
        <PopUp severity='success' message={blogPost.message} />
      ) : null}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            // id="outlined-basic"
            label='Title'
            variant='outlined'
            name='title'
            value={title}
            error={errors.title ? true : false}
            helperText={errors.titlse === '' ? ' ' : errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='upload-photo'>
            <input
              style={{ display: 'none' }}
              id='upload-photo'
              name='upload-photo'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Fab
              color='secondary'
              size='small'
              component='span'
              aria-label='add'
              variant='extended'
            >
              <AddIcon /> Upload photo
            </Fab>
            <br />
            <br />
            <Fab color='primary' size='small' component='span' aria-label='add'>
              <AddIcon />
            </Fab>
            <Button color='secondary' variant='contained' component='span'>
              Upload button
            </Button>{' '}
          </label>
        </div>
        <div>
          <TextField
            // id="outlined-basic"
            label='Alternative image text'
            variant='outlined'
            name='alt'
            value={alt}
            error={errors.alt ? true : false}
            helperText={errors.alt === '' ? ' ' : errors.alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Ingress'
            multiline
            rows='4'
            variant='outlined'
            name='ingress'
            error={errors.ingress ? true : false}
            value={ingress}
            helperText={errors.ingress === '' ? ' ' : errors.ingress}
            onChange={(e) => setIngress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Body text'
            multiline
            rows='4'
            variant='outlined'
            name='bodyText'
            value={bodyText}
            error={errors.bodyText ? true : false}
            helperText={errors.bodyText === '' ? ' ' : errors.bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </div>
        {saveButton()}
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(
  connect(mapStateToProps, { addBlogPost })(BlogInput)
);
