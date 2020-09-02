import React, { useState, useCallback, useRef, useMemo } from "react";
import { render } from "react-dom";
import ImageViewer from "react-simple-image-viewer";

export function App1() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [header,setHeader] = useState('Header');
  const [images,setImages] = useState( [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/800/1200/nature",
    "http://placeimg.com/1920/1080/nature",
    "http://placeimg.com/1500/500/nature"
  ])

  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
        <h1 onClick={() => setHeader('header updated')}>{header}</h1>
      <Images imagesArr={images} openImageViewerHandler={openImageViewer}/>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
    </div>
  );
}

const Images = React.memo((props) => {

    let renderRef = useRef(0);
    console.log(renderRef.current++);

    return(
        props.imagesArr.map((src, index) => (
          <img
            src={src}
            onClick={() => props.openImageViewerHandler(index)}
            width="300"
            key={index}
            style={{ margin: "2px" }}
            alt=""
          />
        ))
    );
})