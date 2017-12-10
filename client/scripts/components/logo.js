import React from 'react';

class LogoImg extends React.Component {
  render() {
    const { imgClass } = this.props;
    return <div className='logo'>
      <img src="/logo.png" className={ imgClass } />
    </div>
  }
}

export default LogoImg;
