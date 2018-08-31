import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import React from 'react';

var accCtx = [];

function getTexts(url) {
    var fetchUrl = url + '?show-blocks=body&api-key=b69c7ad6-778c-43c2-a36b-856c5e7881ca';
    fetch(fetchUrl)
    .then(function(a) {
        return a.json();
    })
    .then(function(json){
        accCtx.push(json.response.content)
    })
}

function getItemsHelp(posts) {
    var help = []
    for (let i = 0, len = posts.length; i < len; i++) {
        getTexts(posts[i].apiUrl);
        help.push({title: posts[i].title})
    }
    for (let i = 0, len = accCtx.length; i < len; i++) {
        help[i].apiUrl = accCtx[i].apiUrl;
        help[i].texts = accCtx[i].blocks.body[accCtx[i].blocks.body.length - 1].bodyTextSummary;
    }
    return help;
}

function clickListener(e){
    console.log(e);
}

function getItems(posts) {
   	const items = [];
    var help = getItemsHelp(posts);
   	for (let i = 0, len = posts.length; i < len; i++) {
        items.push(
   		    <Panel header={help[i].title}  key={posts[i].title} >
   		        <p>{help[i].texts}</p>
                <a id='readMore' href={help[i].apiUrl}>Read full news</a>
 		    </Panel>
   		);
	}
    return items;
}

function MyCollapse(props) {
    return (
    	<div id='acc' style={{ margin: 20, width: 800 }}>
    		<Collapse>
    			{getItems(props.posts)}
    		</Collapse>
   		</div>
   	);
}

export default MyCollapse;