
import React , { useState }from 'react'


function Table ({isOpen, content, closeModal}) {
	return (
		<div
		  style={{
			display: isOpen ? "block" : "none",
		  }}
		>
			<button onClick={closeModal}>다이어로그 테스트트트트트트트 </button>

		</div>
	  );
}
export default Table;