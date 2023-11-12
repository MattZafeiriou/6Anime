import React from 'react';

class Submit_success extends React.Component {
  
  constructor(proms)
  {
    super(proms);
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
          <div className="gradient"></div>
          <div style={{color: 'white', margin: '10vw', marginTop: '0'}}>
              <h1>Form submitted succesfully!</h1>
          </div>
      </>
    );
  };
}
export default Submit_success;