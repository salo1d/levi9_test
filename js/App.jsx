import React from 'react'
import style from '../styl/index.styl'

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
            title: item.webTitle
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
      buttons: {
        a: 1
      }
    };
  }

  componentDidMount(){
    getPosts(this);
  }

  render(){
    return (
      <div className={style.app}>
        <h1>The Guardian News</h1>
        <ul>
          {
            this.state.posts.length && 
            this.state.posts.map(it => <li key={it.title}>{it.title}</li>)
            || <h3>Sorry</h3>
          }
        </ul>
      </div>
    )
  }
}

export default App