import { useState , useRef} from "react";

import Table from "../Table/Table";

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
  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      <dialog ref={dialogRef}>
       <Table  isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
};
export default MyStore