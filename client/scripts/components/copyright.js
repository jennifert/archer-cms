import React from 'react';

class Copyright extends React.Component {
  render() {
    return <div className='copyright'>
      <p>Archer CMS &#169;Copyright {(new Date().getFullYear())} Jennifer Tesolin</p>
    </div>
  }
}

export default Copyright;
