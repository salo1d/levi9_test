import React from 'react'
import style from '../styl/index.styl'
import MyAccordion from './MyAccordion'

var numberOfPages, currentPage;

function getPosts(ctx, page){
  fetch(`http://content.guardianapis.com/search?api-key=b69c7ad6-778c-43c2-a36b-856c5e7881ca${page && `&page=${page}` || ''}`)
  .then(function(a){
    return a.json();
  })
  .then(function(json){
    currentPage = json.response.currentPage;
    numberOfPages = json.response.pages;
    ctx.setState({
      posts: json.response.results
        .map(function(item){
          return {
            title: item.webTitle,
            apiUrl: item.apiUrl
          };
        })
    });
  })
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount(){
    console.log(this);
    getPosts(this);
  }

  render(){
    return (
      <div className={style.app}>
        <h1>The Guardian News</h1>
        <button id='refresh'
          onClick={() => 
            getPosts(this)
          }
        >Refresh</button>
        {
          this.state.posts.length && 
          this.state.posts.map(it => <MyAccordion title={it.title} apiUrl={it.apiUrl} key={it.title} />)
          || <h3 id='error'>{'Sorry, we couldn\`t find news for you. Please try again later.'}</h3>
        }

        <div className="pagination">
          <button className="prevPage" 
            onClick={() =>
              getPosts(this, currentPage - 1)
            }>{'< Previous Page'}</button>
          <div className='pages'><p>{'[' + currentPage + '] of ' + numberOfPages}</p></div>
          <button className="nextPage" 
            onClick={() =>
              getPosts(this, currentPage + 1)
            }>{'Next Page >'}</button>
        </div>

      </div>
    )
  }
}

export default App