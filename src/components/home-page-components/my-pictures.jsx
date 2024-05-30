import { useEffect, useState } from "react";
import { PICTURES } from "../../constants/home/pictures.ts"

export default function MyPictures() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            handleSwipe('left');
        } else if (isRightSwipe) {
            handleSwipe('right');
        }
    }
    useEffect(() => {
        document.querySelector(':root').style.setProperty('--picture-index', currentIndex);
    }, [currentIndex])
    useEffect(() => {
        document.querySelector(':root').style.setProperty('--picture-length', PICTURES.length);
    })
    const handleSwipe = (direction) => {
        if (direction === 'right') {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? PICTURES.length - 1 : prevIndex - 1));
        } else if (direction === 'left') {
            setCurrentIndex((prevIndex) => (prevIndex === PICTURES.length - 1 ? 0 : prevIndex + 1));
        }
    };


    return (
        <div id="my-picture-pile">
            <h1>Pictures of Me</h1>
            <button className="left-arrow-btn" onClick={() => handleSwipe('right')}>&lt;</button>
            <button className="right-arrow-btn" onClick={() => handleSwipe('left')}>&gt;</button>
            <div id='my-pictures-wrapper' className="stacked-images">
                {
                    PICTURES.map((picture, index) => {
                        return (
                            <div
                                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
                                key={index}
                                className={(index === currentIndex ? 'focused' : '') + ' picture-frame'}
                                alt={`image ${index}`}>
                                <img className="inline-picture" src={picture.imgFile} alt={picture.displayTitle} />
                                <div className="picture-text-wrapper">
                                    <h1 className="picture-title">{picture.displayTitle}</h1>
                                    <p className="picture-description josefin-sans-fancy">{picture.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}