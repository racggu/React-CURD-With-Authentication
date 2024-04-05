import React, { useState, useEffect } from 'react';

import WebService from '../../api/webService';

const CrudTable = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await WebService.get('http://localhost:8080/api/v1/products?&lang=en&page=0&count=10&category=51');
      console.log('lakku List',  response.products)
      setData(response.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId === null) {
      // Create new record
      try {
        const response = await WebService.get('products');
        console.log('getProductList', response)
      } catch (error) {
        console.error('Error creating record:', error);
      }
    } else {
      // Update existing record
      try {
        const response = await fetch(`https://api.example.com/data/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const updatedData = await response.json();
        setData(data.map(item => (item.id === editingId ? updatedData : item)));
        setFormData({ name: '', email: '' });
        setEditingId(null);
      } catch (error) {
        console.error('Error updating record:', error);
      }
    }
  };

  const handleEdit = id => {
    const selectedItem = data.find(item => item.id === id);
    setFormData({ name: selectedItem.name, email: selectedItem.email });
    setEditingId(id);
  };

  const handleDelete = async id => {
    try {
      await fetch(`https://api.example.com/data/${id}`, {
        method: 'DELETE'
      });
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>판매자 id</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>MOQ</th>
            <th>가격</th>
            <th>판매량(누적)</th>
            <th>게시일</th>
            <th>수정일</th>            
            <th>승인</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productShipeable}</td>
              <td>{<img src={item.image.imageUrl} width = "40"/>}</td>
              <td>{item.description.name}</td>
              <td>{item.sortOrder}</td>
              <td>{item.price}</td>
              <td>{item.dateAvailable}</td>
              <td>{item.creationDate}</td>
              <td>{item.productShipeable}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;