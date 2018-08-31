import React from 'react'
import style from '../styl/index.styl'
import MyAccordion from './MyAccordion'
import MyCollapse from './MyCollapse.js'

function getPosts(ctx){
  fetch(`https://content.guardianapis.com/search?api-key=b69c7ad6-778c-43c2-a36b-856c5e7881ca`)
  .then(function(a){
    return a.json();
  })
  .then(function(json){
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
        
        <MyCollapse posts={this.state.posts} />
      </div>
    )
  }
}

export default App