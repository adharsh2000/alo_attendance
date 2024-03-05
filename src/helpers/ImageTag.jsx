import React from 'react';

const ImageTag = ({ src, alt, className, onClick }) => {
    return (
        <img src={src} alt={alt} className={className} onClick={onClick} crossOrigin="anonymous" />
    )
};
export default ImageTag;