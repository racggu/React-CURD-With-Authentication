import { LOCAL_shopizer } from '../../config';
import React , { useState ,useEffect} from 'react'
import {Tab, Tabs, Container, Row, Col, Button} from 'react-bootstrap';
import Select from "react-select";
import { DataGrid } from '@mui/x-data-grid';
import WebService from '../../api/webService';


let modifiedArr =[]

const options2 = [
  { value: 1, label: '2차카타고리 12' },
  { value: 50, label: "2차카타고리 23" },
  { value: 51, label: "2차카타고리 33" },
];

const options3 = [
  { value: 1, label: "3차카타고리 1" },
  { value: 0.8, label: "3차카타고리 2" },
  { value: 0.55, label: "3차카타고리 3" },
];

const options5 = [
  { value: 1, label: "검색대상 1" },
  { value: 0.8, label: "검색대상 2" },
  { value: 0.55, label: "검색대상 3" },
];

const options6 = [
  { value: 10, label: "10개씩 보기" },
  { value: 25, label: "25개씩 보기" },
  { value: 50, label: "50개씩 보기" },
  { value: 100, label: "100개씩 보기" },
];

const DownloadExcelButton = ({ apiRef }) => {
  const handleDownloadExcel = () => {
    apiRef.current.exportDataAsExcel();
  };

  return <button onClick={handleDownloadExcel}>Download Excel</button>;
};


const MARKETING_CATEGORY_INIT = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    //getCategoryHierarchy();
    //fetchData();
  }, []);

  const getCategoryHierarchy = async () => {
    try {
      let response = await WebService.get(LOCAL_shopizer + 'category');
      if ( response ) {
        modifiedArr = response.categories.map(function(element){
          return { value: element.id , label: element.code };
        }); 
        setCategoryData(modifiedArr);
      }
    } catch (error) {
    // console.log(error.messages)
    }
  }

  const [selectedOption, setSelectedOption] = useState({
    fromCurrency: null,
    toCurrency: null,
    amount: "",
  });

  const handleChnage = (name, value) => {
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setSelectedOption({ ...selectedOption, amount });
  };

  const handleCurrencyChange = (name, selectedOption) => {
    handleChnage(name, selectedOption);
  };

  const fetchData = async (clickvalue) => {
    try {
      const response = await WebService.get(LOCAL_shopizer + 'products?&lang=en&page=0&count=10&category=' + clickvalue);
      modifiedArr = response.products.map(function(element){
        return { id: element.id , image: element.image.imageUrl , name: element.description.name, sortOrder :element.sortOrder, 
        price: element.price, dateAvailable: element.dateAvailable, creationDate :element.creationDate};
      });
      console.log('fetchData1', modifiedArr)
      setData(modifiedArr);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 4. 상품 삭제
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDelete = () => {
    console.log(selectedIds.length)
    if(selectedIds.length === 0){
      alert("아무것도 선택되지 않았습니다.");
    }
    else if(selectedIds.length > 1) //multi del 
    {
      try {
        const id = selectedIds.map((id) => ({ id }))
        console.log(id)
        const response = WebService.delete(LOCAL_shopizer +`auth/product/${id}`);
        setData(data.filter(item => item.id !== id));
        alert("상품이 성공적으로 삭제되었습니다.");
      } catch (error) {
        alert("상품삭제에 실패하였습니다.");
        console.error('Error deleting record:', error);
      }
    }
    else {
      try {
        const id = selectedIds.map((id) => ({ id }))
        const response = WebService.delete(LOCAL_shopizer +`auth/product/${id}`);
        setData(data.filter(item => item.id !== id));
        alert("상품이 성공적으로 삭제되었습니다.");
      } catch (error) {
        alert("상품삭제에 실패하였습니다.");
        console.error('Error deleting record:', error);
      }
    };
  };

  const onclick_test = (temp) =>{
    try {
      let clickvalue = temp.value;
      fetchData(clickvalue);
    } catch (error) {}
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'selid', headerName: '판매자 id', width: 130 },
    { field: 'image', headerName: '이미지', width: 130 ,  renderCell: (params) => <img src={params.value} width = "40"/> },
    { field: 'name', headerName: '상품명', width: 130 },
    { field: 'sortOrder', headerName: 'MOQ', width: 130 },
    { field: 'price', headerName: '가격', width: 130 },
    { field: 'qny', headerName: '판매량(누적)', width: 130 },
    { field: 'dateAvailable', headerName: '게시일', width: 130 },
    { field: 'creationDate', headerName: '수정일', width: 130 }, 
    { field: '승인', headerName: '승인', width: 130 ,  renderCell: (params) => <Button onClick={() => onclick_test(selectedOption.fromCurrency)}>선택 승인</Button>},
  ];

  return (
  <Container>
    <Row>
      <ol>
        <li>
          <span className="selectDefaultPack">
            <Select id = "schCate1"
              value={selectedOption.fromCurrency}
              placeholder={"1차카타고리"}
              onClick ={() => getCategoryHierarchy()}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={categoryData}
              isClearable
            />
          </span>
        </li>
        <div className="Select">
          <Select
            value={selectedOption.fromCurrency}
            placeholder={"2차카타고리"}
            onChange={(selectedOption) =>
              handleCurrencyChange("fromCurrency", selectedOption)
            }
            options={options2}
            isClearable
          />
        </div>
        <div className="Select">
          <Select
            value={selectedOption.fromCurrency}
            placeholder={"3차카타고리"}
            onChange={(selectedOption) =>
              handleCurrencyChange("fromCurrency", selectedOption)
            }
            options={options3}
            isClearable
          />
        </div>
        <div className="Select">
          <Select
            value={selectedOption.fromCurrency}
            placeholder={"검색대상"}
            onChange={(selectedOption) =>
              handleCurrencyChange("fromCurrency", selectedOption)
            }
            options={options5}
            isClearable
          />
        </div>
        <div className="text">
          <input
            type="text"
            className="categoty005"
            value={selectedOption.amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="Button">
          <Button onClick={() => onclick_test(selectedOption.fromCurrency)}>조회</Button>
        </div>
      </ol>
    </Row>
    <Row>
      <div className="col col-lg-4">
        <Tabs defaultActiveKey="profile" id="fill-tab-example" fill>
          <Tab eventKey="ALL" title="전체"> Tab content for Home </Tab>
          <Tab eventKey="KOR" title="한국"> Tab content for Profile </Tab>
          <Tab eventKey="CH" title="중국"> Tab content for Loooonger Tab </Tab>
          <Tab eventKey="JP" title="일본"> Tab content for Contact </Tab>
          <Tab eventKey="1688" title="1688">  Tab content for Contact </Tab>
        </Tabs>
      </div>
    </Row>
    <div className="text"> 전체 상품 수 </div>
    <div className="text"> 000,000,000 </div>
    <div className="text"> 개 </div>
    <div className="text"> 한국 상품 수 </div>
    <div className="text"> 000,000,000 </div>
    <div className="text"> 개 </div>
    <div className="Button">
      <Button onClick={() => onclick_test(selectedOption.fromCurrency)}>선택 승인</Button>
    </div>
    <div className="Button">
      <Button onClick={() => handleDelete() }>선택 삭제</Button>
    </div>

    <div className="Select">
      <Select
        options={options6}
        isClearable
      />
    </div>

    <div className="DataGrid">
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectedIds) => {
          setSelectedIds(newSelectedIds);
        }}
        selectedIds={selectedIds}
        components={{
          Toolbar: DownloadExcelButton,
        }}
        excelExport

      />
    </div>
    <button id="openModal">Open the modal</button>

<dialog id="modal">
  <p>Modal content of your choice. Click the below button or press the escape key to close this.</p>
  <button id="closeModal">Close this modal</button>
</dialog>
  </Container>
  );
}
export default MARKETING_CATEGORY_INIT
