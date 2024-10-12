import React from 'react';

import prove from './prove-in-piscina.jpg';
import eventi from './eventi.jpg';
import { Link } from 'gatsby';

const FocusBar = () => {
  return (
    <nav className="mb-16 hidden justify-center lg:flex ">
      <Link
        to="/prove-gratuite-in-piscina"
        className="focus-bar-box"
        style={{ backgroundImage: `url(${prove})` }}
      >
        <div className="text-xl font-bold text-white">Prove gratuite</div>
      </Link>
      <Link
        to="/eventi"
        className="focus-bar-box"
        style={{ backgroundImage: `url(${eventi})` }}
      >
        <div className="text-xl font-bold text-white">Eventi</div>
      </Link>
    </nav>
  );
};

export default FocusBar;
