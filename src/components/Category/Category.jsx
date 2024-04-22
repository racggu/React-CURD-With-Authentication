import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

const Category = ({onClose, onSave}) => {
    const [categories, setCategories] = useState([]);
    const [firstCategory, setFirstCategory] = useState([]);
    const [secondCategory, setSecondCategory] = useState([]);
    const [thirdCategory, setThirdCategory] = useState([]);
    const [inputText, setInputText] = useState('1');
    const [GridData, setGridData] = useState([]);
    const [searchResult, setSearchResult] = useState('');

	useEffect(() => {
		fetchData();
	}, []); 

    const fetchData = async () => {
      try {
        fetch('http://localhost:8080/api/v1/category')
			.then(response => response.json())
			.then(data => {

			let modifiedArr = data.categories.map(function(element){
				return { value: element.id , label: element.code };
			});

			setCategories(data.categories);
			setFirstCategory(modifiedArr);

			})
			.catch(error => {
			console.error('Error fetching options:', error);
			});
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  

    const handleCategoryini = () => {
      setFirstCategory([]);
      setSecondCategory([]);
      setThirdCategory([]);
    };

    const handleFirstCategoryChange = (e) => {
      setFirstCategory(e.target.value);
      // 1차 카테고리가 변경될 때 2차, 3차 카테고리 초기화
      setSecondCategory([]);
      setThirdCategory([]);
    };
  
    const handleSecondCategoryChange = (e) => {
      setSecondCategory(e.target.value);
      // 2차 카테고리가 변경될 때 3차 카테고리 초기화
      setThirdCategory([]);
    };
  
    const handleThirdCategoryChange = (e) => {
      setThirdCategory(e.target.value);
    };

    function handleSearchClick(){
        console.log('fcdata', categories, categories[0].code)
        let tempGridData = []

        for (let id in categories) {
            console.log('fcdata i', id, categories[id].code, inputText)
            let firstname =  categories[id].code
            if (categories[id].code.indexOf(inputText) !== -1) {
                tempGridData.push({'id':categories[id].id, 'first': categories[id].code, 'second':'', 'third': ''})
                
            }
            if (categories[id].children.length){
                let obj1 = categories[id].children;
                for (let id in obj1) {
                    let secondname =  obj1[id].code
                    console.log('obj1', obj1)
                    if (obj1[id].code.indexOf(inputText) !== -1) {
                        tempGridData.push({'id':obj1[id].id, 'first': firstname, 'second':secondname, 'third': ''})
                    }
                    if (obj1[id].children.length){
                        let obj2 = obj1[id].children;
                        for (let id in obj2) {
                            let thirdname =  obj2[id].code
                            if (obj2.hasOwnProperty(id)) {
                                console.log('id', id);
                            }
                            if (obj2[id].code.indexOf(inputText) !== -1) {
                                tempGridData.push({'id':obj2[id].id, 'first': firstname, 'second':secondname, 'third': thirdname})
                            }
                        }
                    }
                    
                }
            } 
            
        }
        setGridData(tempGridData)
        console.log('outva', GridData, tempGridData)

    }

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

	const columns = [
        { field: 'id', headerName: 'id', width: 100},
		{ field: 'first', headerName: '1차카타고리', width: 100},
		{ field: 'second', headerName: '2차카타고리', width: 100} ,
        { field: 'third', headerName: '3차카타고리', width: 100}
	];

    const generateId = () => {
		return uuidv4();
	};
    const getRowId = (row) => {
		return row.id || generateId(); // If row.id doesn't exist, generate a new ID
	};

	const handleClose = (clickrow) => {
		onSave( 'id: ' + clickrow.id  );
		onClose(); // Close the modal without saving
	};


	return (
		<div className="frmWr">
            <div className="a-sch01">
                <div className="frm">
                    <input className="schKey" type="text" value={inputText} onChange={handleInputChange} />
                    <button type="button" className="cp-bBtn" onClick={handleSearchClick}><span>검색</span></button>
                </div>
                <div className="modal-search-result DataGrid" style={{ width: 590}}>
				<DataGrid
					rows={GridData}
					getRowId={getRowId}
					columns={columns}
					initialState={{ pagination: {  paginationModel: { page: 0, pageSize: 5 }, }, }}
					pageSizeOptions={[5, 10]}
					onCellDoubleClick={(clickrow) => handleClose(clickrow)} //console.log(clickrow)}
                    />
                </div>
                <div className="frm">
                    <ul className="lv1">
                        <li className="w100p">
                            <div className="schCateWr">
                                <ol>
                                    <li>
                                        <select value={firstCategory} onChange={handleFirstCategoryChange}>
                                            <option value="">1차 카테고리 선택</option>
                                            {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.code}</option>
                                            ))}
                                        </select>
                                    </li>
                                    <li>
                                        {firstCategory && (
                                            <select value={secondCategory} onChange={handleSecondCategoryChange}>
                                                <option value="">2차 카테고리 선택</option>
                                                {/* 1차 카테고리에 따라 동적으로 옵션을 불러옴 */}
                                                {categories.find(category => category.id === parseInt(firstCategory))?.children.map(subcategory => (
                                                <option key={subcategory.id} value={subcategory.id}>{subcategory.code}</option>
                                                ))}
                                            </select>
                                        )}
                                    </li>
                                    <li>
                                        {secondCategory && (
                                            <select value={thirdCategory} onChange={handleThirdCategoryChange}>
                                                <option value="">3차 카테고리 선택</option>
                                                {/* 2차 카테고리에 따라 동적으로 옵션을 불러옴 */}
                                                {categories.find(category => category.id === parseInt(firstCategory))?.children.find(subcategory => subcategory.id === parseInt(secondCategory))?.children.map(subsubcategory => (
                                                <option key={subsubcategory.id} value={subsubcategory.id}>{subsubcategory.code} </option>
                                                ))}
                                            </select>
                                        )}
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ul>
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
