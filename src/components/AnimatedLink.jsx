import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { heroExit } from '../animations/heroAnimation';
import { aboutExit } from '../animations/aboutAnimation';
import { collectionExit } from '../animations/collectionAnimation';
import { galleryExit } from '../animations/galleryAnimation';

export const exitAnimations = {
  "/": heroExit,
  "/about": aboutExit,
  "/collection": collectionExit,
  "/gallery": galleryExit
};

const AnimatedLink = React.forwardRef(({ to, className, children }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClick = async (e) => {
    e.preventDefault();

    const exitFn = exitAnimations[currentPath];
    if (exitFn) {
      await exitFn();
    }

    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} ref={ref}>
      {children}
    </a>
  );
});

export default AnimatedLink;
