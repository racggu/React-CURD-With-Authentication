import React, { useState, useEffect, useCallback, useRef } from 'react';

function Category(props) {
    const [categories, setCategories] = useState([]);
    const [firstCategory, setFirstCategory] = useState('');
    const [secondCategory, setSecondCategory] = useState('');
    const [thirdCategory, setThirdCategory] = useState('');



	useEffect(() => {
		fetchData();
	}, []); 

    const fetchData = async () => {
      try {
        fetch('http://localhost:8080/api/v1/category')
			.then(response => response.json())
			.then(data => {
                console.log(data)   ;
			let modifiedArr = data.categories.map(function(element){
				return { value: element.id , label: element.code };
			});
            console.log('modifiedArr', modifiedArr)   ;
			setCategories(data.categories);
			setFirstCategory(modifiedArr);
            console.log(categories)
			})
			.catch(error => {
			console.error('Error fetching options:', error);
			});
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const handleFirstCategoryChange = (e) => {
        console.log(e)
      setFirstCategory(e.target.value);
      // 1차 카테고리가 변경될 때 2차, 3차 카테고리 초기화
      setSecondCategory('');
      setThirdCategory('');
    };
  
    const handleSecondCategoryChange = (e) => {
      setSecondCategory(e.target.value);
      // 2차 카테고리가 변경될 때 3차 카테고리 초기화
      setThirdCategory('');
    };
  
    const handleThirdCategoryChange = (e) => {
      setThirdCategory(e.target.value);
    };
  


	return (
		<div className="frmWr">
        <select value={firstCategory} onChange={handleFirstCategoryChange}>
        <option value="">1차 카테고리 선택</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.code}</option>
        ))}
      </select>
      {firstCategory && (
        <select value={secondCategory} onChange={handleSecondCategoryChange}>
          <option value="">2차 카테고리 선택</option>
          {/* 1차 카테고리에 따라 동적으로 옵션을 불러옴 */}
          {categories.find(category => category.id === parseInt(firstCategory))?.children.map(subcategory => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.code}</option>
          ))}
        </select>
      )}
      {secondCategory && (
        <select value={thirdCategory} onChange={handleThirdCategoryChange}>
          <option value="">3차 카테고리 선택</option>
          {/* 2차 카테고리에 따라 동적으로 옵션을 불러옴 */}
          {categories.find(category => category.id === parseInt(firstCategory))?.children.find(subcategory => subcategory.id === parseInt(secondCategory))?.children.map(subsubcategory => (
            <option key={subsubcategory.id} value={subsubcategory.id}>{subsubcategory.code}</option>
          ))}
        </select>
      )}
    </div>
	);
}

export default Category
