import React, { Component } from 'react'

export default class Input extends Component {
  render () {
    const { name, value, type = 'text', onChange, label } = this.props
    return (
      <div className='form-group'>
        <label className='form-control-label' htmlFor={name}>{label}</label>
        <input className='form-control'
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
        {false && <div className='form-control-feedback'>This input value is invalid</div>}
      </div>
    )
  }
}
