import { useState , useRef} from "react";

import * as Net  from "../../api/apiLoging";


const MyStore= () =>  {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalValue, setModalValue] = useState('');

  const closeDialog = () => {
    dialogRef.current.close();
  };
	const openModal = () => {
	  setIsModalOpen(true);
	};

	const closeModal = () => {
	  setIsModalOpen(false);
	};

	const handleSave = (value) => {
	  setModalValue(value); // Save the value received from the modal
	};

  const saveToFile = (data) => {

    const postData = {
      'asdf': '1' // JSON 형태의 데이터를 전송한다는 것을 명시
    };
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(postData) // 데이터를 JSON 문자열로 변환하여 body에 설정
    };
          
    Net.requestFetch("http://localhost:5000", //process.env.REACT_APP_LOGING,
      requestOptions,
      (resp) => {
        console.log(resp.result);
      },
      function (resp) {
        console.log("err response : ", resp);
      }
    )


  };


  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>


      <div className="App">
          <h1>{process.env.REACT_APP_LOGING}</h1>
      </div>
      <button onClick={() => saveToFile({added: "123213json"})}>Add Log</button>
    </div>
  );
};
export default MyStore