import React from 'react'
import style from '../styl/index.styl'
import MyAccordion from './MyAccordion'


function getPosts(ctx, page){
  fetch(`http://content.guardianapis.com/search?api-key=b69c7ad6-778c-43c2-a36b-856c5e7881ca${page && `&page=${page}` || ''}`)
  .then(function(a){
    return a.json();
  })
  .then(function(json){
    ctx.setState({
      numberOfPages: json.response.pages,
      currentPage: json.response.currnetPage,
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
      posts: [],
      numberOfPages: 0,
      currentPage: 1
    };
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(e){
    if (e.key == 'Enter') {
      getPosts(this, document.getElementById('pageInput').value);
    }
  }

  componentDidMount(){
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
              getPosts(this, this.state.currentPage - 1)
            }>{'< Previous Page'}</button>
          <div className='pages'>
            <p>{'['}</p>
            <input type="number" id="pageInput" min='1' max={this.state.numberOfPages} defaultValue={this.state.currentPage} onKeyPress={this.onEnter}
            />
            <p>{'] of ' + this.state.numberOfPages}</p></div>
          <button className="nextPage" 
            onClick={() =>
              getPosts(this, this.state.currentPage + 1)
            }>{'Next Page >'}</button>
        </div>

      </div>
    )
  }
}

export default App