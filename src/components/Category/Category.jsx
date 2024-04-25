import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';


function GridModal({ isOpen, onClose, onSave, initialValue  }) {

    const handleSave = (clickrow) => {
      onClose();
      onSave( clickrow.id );
      onClose(); // Close the modal without saving
    };

    const columns = [
        { field: 'id', headerName: 'id', width: 100},
		{ field: 'first', headerName: '1차카타고리', width: 100},
		{ field: 'second', headerName: '2차카타고리', width: 100} ,
        { field: 'third', headerName: '3차카타고리', width: 100}
	];

    return (

            <div className="DataGrid" >
                {isOpen === true ?<DataGrid autoheight style={{ width: 410 }}
                    rows={initialValue}
                    getRowId={initialValue.id}
                    columns={columns}
                    initialState={{ pagination: {  paginationModel: { page: 0, pageSize: 5 }, }, }}
                    pageSizeOptions={[5, 10]}
                    onCellDoubleClick={(clickrow) => handleSave(clickrow)} 
                /> : null}
            </div>

    );
  }


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [firstCategory, setFirstCategory] = useState('');
    const [secondCategory, setSecondCategory] = useState('');
    const [thirdCategory, setThirdCategory] = useState('');
    const [inputText, setInputText] = useState('1');
    const [GridData, setGridData] = useState([]);
    const dialogRef = useRef(null);
    const [modalValue, setModalValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchData();
	}, []); 

	const openDialog = () => {
        handleSearchClick()

		dialogRef.current.showModal();
		setIsModalOpen(true);
	  };
	
    const closeDialog = () => {
        dialogRef.current.close();
        setIsModalOpen(false);
    };

    const handleSave = (value) => {
        for (let i = 0; i < GridData.length; i++) {
            if (GridData[i].id === value) {
              setFirstCategory(GridData[i].firstid);
              setSecondCategory(GridData[i].secondid);
              setThirdCategory([GridData[i].thirdid]);
            }
          }

    setModalValue(value); // Save the value received from the modal
    };

    const fetchData = async () => {
      try {
        fetch('http://localhost:8080/api/v1/category')
			.then(response => response.json())
			.then(data => {

			let modifiedArr = data.categories.map(function(element){
				return { value: element.id , label: element.code };
			});

			setCategories(data.categories);

			})
			.catch(error => {
			console.error('Error fetching options:', error);
			});
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const handleCategoryini = () => {
      setFirstCategory();
      setSecondCategory();
      setThirdCategory();
    };

    const handleFirstCategoryChange = (e) => {
      setFirstCategory(e.target.value);
      // 1차 카테고리가 변경될 때 2차, 3차 카테고리 초기화
      setSecondCategory();
      setThirdCategory();
    };
  
    const handleSecondCategoryChange = (e) => {
      setSecondCategory(e.target.value);
      // 2차 카테고리가 변경될 때 3차 카테고리 초기화
      setThirdCategory();
    };
  
    const handleThirdCategoryChange = (e) => {
      setThirdCategory(e.target.value);
    };

    function handleSearchClick(){
        let tempGridData = []

        for (let id in categories) {
            let firstname =  categories[id].code
            let firstid =  categories[id].id
            if (categories[id].code.indexOf(inputText) !== -1) {
                tempGridData.push({
                    'id':categories[id].id, 
                    'firstid':firstid, 'first': categories[id].code, 
                    'secondid':'', 'second':'', 
                    'thirdid':'', 'third': ''})
            }
            if (categories[id].children.length){
                let obj1 = categories[id].children;
                for (let id in obj1) {
                    let secondname =  obj1[id].code
                    let secondid = obj1[id].id
                    if (obj1[id].code.indexOf(inputText) !== -1) {
                        tempGridData.push({
                            'id':secondid, 
                            'firstid':firstid, 'first': firstname, 
                            'secondid':secondid, 'second':secondname, 
                            'thirdid':'', 'third': ''})
                    }
                    if (obj1[id].children.length){
                        let obj2 = obj1[id].children;
                        for (let id in obj2) {
                            let thirdname =  obj2[id].code
                            if (obj2[id].code.indexOf(inputText) !== -1) {
                                tempGridData.push({
                                    'id':obj2[id].id, 
                                    'firstid':firstid, 'first': firstname, 
                                    'secondid':secondid, 'second':secondname, 
                                    'thirdid':obj2[id].id, 'third': thirdname})
                            }
                        }
                    }
                    
                }
            } 
            
        }
        setGridData(tempGridData)
    }

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

	const closeModal = () => {
        setIsModalOpen(false);
        dialogRef.current.close();
      };

      function SelectWithOptions({ options, selectedOption, onChange }) {
        return (
          <select value={selectedOption} onChange={onChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }

	return (
		<div className="frmWr">
            <div className="a-sch01">
                <div className="frm">
                    <input className="schKey" type="text" value={inputText} onChange={handleInputChange} />
                    <button type="button" className="cp-bBtn" onClick={openDialog}><span>검색</span></button>
                </div>
                <div className="modal-search-result DataGrid" style={{ width: 590}}>
                <dialog ref={dialogRef} style={{ border: '2px solid blue', borderRadius: '5px', padding: '10px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
						<GridModal  isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} initialValue={GridData} />
							<button className="cw-sBtn hasIco" onClick={closeDialog}>닫기</button>
				</dialog>

                </div>
                <div className="frm">


                    <select multiple={false} value={firstCategory} onChange={handleFirstCategoryChange}>
                        <option value="">1차 카테고리 선택</option>
                        {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.code}</option>
                        ))}
                    </select>
                    {firstCategory && (
                        <select multiple={false} value={secondCategory} onChange={handleSecondCategoryChange}>
                            <option value="">2차 카테고리 선택</option>
                            {/* 1차 카테고리에 따라 동적으로 옵션을 불러옴 */}
                            {categories.find(category => category.id === parseInt(firstCategory))?.children.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.code}</option>
                            ))}
                        </select>
                    )}
                    {secondCategory && (
                        <select  multiple={false} value={thirdCategory} onChange={handleThirdCategoryChange}>
                            <option value="">3차 카테고리 선택</option>
                            {/* 2차 카테고리에 따라 동적으로 옵션을 불러옴 */}
                            {categories.find(category => category.id === parseInt(firstCategory))?.children.find(subcategory => subcategory.id === parseInt(secondCategory))?.children.map(subsubcategory => (
                            <option key={subsubcategory.id} value={subsubcategory.id}>{subsubcategory.code} </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="btn">
                    <button type="button" className="cp-bBtn" onClick={() => handleCategoryini()} ><span>초기화</span></button>
                </div>

                    {parseInt(firstCategory)}{parseInt(secondCategory)}{parseInt(thirdCategory)}
            </div>
        </div>
	);
}

export default Category
