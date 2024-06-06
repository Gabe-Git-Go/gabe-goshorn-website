import './App.css';
import Header from './components/shared/header';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './styles/shared/shared.css'
import MyMusic from './components/my-music/my-music';
import HireMe from './components/hire-me/hire-me';
import Home from './components/home-page-components/home';
import Footer from './components/shared/footer';
import { AppProvider} from './config/app-context';
import ToastMessage from './components/shared/toast-message';

// THIS CODE WAS FOR TESTING A CURSOR TRACKER THING
// document.onmousemove = handleMouseMove;
// function handleMouseMove(event) {
//     var eventDoc, doc, body;
//     var r = document.querySelector(':root');
//     event = event || window.event; // IE-ism
//     var rs = getComputedStyle(r);
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
    <AppProvider>
      <div className="App josefin-sans-fancy">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Jacquard+12&family=Jersey+15&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        </style>
        <BrowserRouter >
          <Header />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/music" element={<MyMusic />} />
            <Route path="/hire-me" element={<HireMe />} />
          </Routes>
          <ToastMessage/>
        </BrowserRouter>
        <Outlet />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
