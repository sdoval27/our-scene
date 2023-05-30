import React from 'react';
import LForm from '../components/LForm'



const styles = {

  Center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Space: {
    padding: '10px'
  },
  Disk: {
    borderStyle: 'solid',
    borderRadius: '5px'
  }
}

export default function Login() {
  return (
    <div style={styles.Center}>
      <div className="row" style={styles.Space}></div>

      <div className="row">        
      </div>
      <LForm />
    </div>
  )
};