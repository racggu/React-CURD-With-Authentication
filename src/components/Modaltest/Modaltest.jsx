import React, { useState, useEffect, useCallback, useRef } from 'react';

function ChildComponent({ onUpdate }) {
    const [value, setValue] = useState('');
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      onUpdate(newValue); // 값이 변경될 때마다 부모 컴포넌트에 변경된 값을 전달
    };
  
    return (
      <div>
        <input type="text" value={value} onChange={handleChange} />
        <p>Current Value: {value}</p>
      </div>
    );
  }
  
  function Modaltest() {
    const [childValue, setChildValue] = useState('');
  
    const handleChildUpdate = (value) => {
      setChildValue(value); // 자식 컴포넌트에서 변경된 값을 부모 컴포넌트 상태에 업데이트
    };
  
    return (
      <div>
        <h2>Parent Component</h2>
        <p>Child Value: {childValue}</p>
        <ChildComponent onUpdate={handleChildUpdate} />
      </div>
    );
  }
  
export default Modaltest;