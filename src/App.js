import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Header from './components/shared/header';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import './styles/shared.css'
import MyMusic from './components/my-music';
import HireMe from './components/hire-me';

// document.onmousemove = handleMouseMove;
// function handleMouseMove(event) {
//     var eventDoc, doc, body;
//     var r = document.querySelector(':root');
//     event = event || window.event; // IE-ism
//     var rs = getComputedStyle(r);
//     // If pageX/Y aren't available and clientX/Y are,
//     // calculate pageX/Y - logic taken from jQuery.
//     // (This is to support old IE)
//     if (event.pageX == null && event.clientX != null) {
//         eventDoc = (event.target && event.target.ownerDocument) || document;
//         doc = eventDoc.documentElement;
//         body = eventDoc.body;

//         event.pageX = event.clientX +
//           ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
//           ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
//         event.pageY = event.clientY +
//           ((doc && doc.scrollTop)  || (body && body.scrollTop)  || 0) -
//           ((doc && doc.clientTop)  || (body && body.clientTop)  || 0 );
//     }
//     if(document.getElementById("my-cursor"))
//       document.getElementById("my-cursor").remove()
//     let cursorDiv = document.createElement("div");
//     cursorDiv.setAttribute("id","my-cursor");
//     cursorDiv.setAttribute("background-color","blue");
//     cursorDiv.style.position = "absolute"
//     cursorDiv.style.left = (event.pageX-10) +'px';
//     cursorDiv.style.top = (event.pageY-10) + 'px';
//     r.style.setProperty('--top', event.pageY);
//     r.style.setProperty('--left', event.pageX);
//     document.getElementById("root").appendChild(cursorDiv);

//     // Use event.pageX / event.pageY here
// }
function App() {
  return (
    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');
      </style>
    <BrowserRouter >
      <Header/>
      <Routes>
        <Route path="/" index element={<Home/>}/>
        <Route path="/music" element={<MyMusic/>}/>
        <Route path="/hire-me" element={<HireMe/>}/>
      </Routes>
      </BrowserRouter>
      <Outlet/>
    </div>
  );
}

export default App;
