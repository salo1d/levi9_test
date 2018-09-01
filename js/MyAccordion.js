import React from 'react'

function MyAccordion(props){
  return(
    <div className='MyAccordion'>
      <button className="accordion" onClick={
        function(e) {
          e.target.classList.toggle("active");
          var panel = e.target.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            fetch(props.apiUrl + '?show-blocks=body&api-key=b69c7ad6-778c-43c2-a36b-856c5e7881ca')
            .then(function(a){
              return a.json();
            })
            .then(function(json){
              // console.log(json.response.content)
              panel.getElementsByClassName('panelText')[0].innerText = json.response.content.blocks.body[json.response.content.blocks.body.length - 1].bodyTextSummary.slice(0,500) + '...';
              panel.getElementsByClassName('panelA')[0].href = json.response.content.webUrl;
            })
            panel.style.display = "block";
          }
        }
      }>{props.title}</button>
      <div className="panel">
        <p className="panelText"></p>
        <a className="panelA">Read full news</a>
      </div>
    </div>
    )
}

// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.display === "block") {
//             panel.style.display = "none";
//         } else {
//             panel.style.display = "block";
//         }
//     });
// }

export default MyAccordion;