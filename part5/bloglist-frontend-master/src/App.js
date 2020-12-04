import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const emptyBlog = { title: '', author: '', url: '' };

  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(emptyBlog);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // load existing blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  // check if user has already logged in once
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:<input type="text" onChange={handleTitleChange} value={newBlog.title}/><br/>
      author:<input type="text" onChange={handleAuthorChange} value={newBlog.author}/><br/>
      url:<input type="text" onChange={handleUrlChange} value={newBlog.url}/><br/>

      <button type='submit'>create</button>
    </form>
  );

  const addBlog = async (event) => {
    event.preventDefault();
    // TODO make title and author required (client and backend side)

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    };

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog(emptyBlog);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({ username, password });

      // persist login information https://developer.mozilla.org/en-US/docs/Web/API/Storage
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    // Delete user from local storage
    window.localStorage.removeItem('loggedBloglistUser');

    // Clear currently logged in user
    setUser(null);

    // Clear blog form
    setNewBlog(emptyBlog);
  };

  return (
    <div>
      {user === null
        ? <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
        : <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <p></p>
          {blogForm()}
          <p></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      }
    </div>
  );
};

export default App;
