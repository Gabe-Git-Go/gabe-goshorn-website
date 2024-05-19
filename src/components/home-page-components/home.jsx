import AboutMe from "./about-me";
import '../../styles/home.css'
import MyPictures from "./my-pictures";
export default function Home(){

    return (
    <div id="home-wrapper">
        <AboutMe/>
        <hr/>
        <MyPictures/>
    </div>
            )
}