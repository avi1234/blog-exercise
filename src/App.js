import Axios from 'axios';
import { useState, useEffect } from 'react';

import './App.css';
import Post from './Post'

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    'currentPage': 1,
    'itemsPerPage': 10
  });


  useEffect(() => {
    const url = 'https://my.api.mockaroo.com/posts';
    const config = {
      'headers': {
        'X-API-Key': '04d55c10',
        'Content-Type': 'application/json'
      }
    };
    Axios.get(url, config).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) => {
    return (
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery) || 
      post.body.toLowerCase().includes(searchQuery)
    );
  })
  
  const postsToDisplay = filteredPosts.slice(
    (pagination.currentPage-1)*pagination.itemsPerPage,
    pagination.itemsPerPage
  );

  return (
    <div className="App">
      <p>
        My Blog
      </p>
      <p>
        <input type="Text" onChange={handleSearch} placeholder='Search' />
      </p>
      {
        postsToDisplay.map((post) => {
          return <Post postData={post} key={post.id} />;
        })
      }
    </div>
  );
}

export default App;
