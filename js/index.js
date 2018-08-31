import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'



ReactDOM.render(
  <App myProp={123}/>,
  document.getElementById('app')
);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}