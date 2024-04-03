import React , { useState ,useEffect}from 'react'
import {Tab, Tabs, Container, Row, Button} from 'react-bootstrap';
import { StyledEngineProvider } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Select from "react-select";
import { isCheckValueAndSetParams } from '../../util/helper';


import WebService from '../../api/webService';
import 'bootstrap/dist/css/bootstrap.min.css';
let categoryID = 0
let modifiedArr =[]
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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

const Page1 = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [offset, setOffset] = useState(0);
  const pageLimit = 10;
  useEffect(() => {
		getCategoryHierarchy();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryID, offset]);
  const getCategoryHierarchy = async () => {
		try {
			let response = await WebService.get('http://localhost:8080/api/v1/category');
			if ( response ) {

        modifiedArr = response.categories.map(function(element){
          return { value: element.id , label: element.code };
        }); 
        setCategoryData(modifiedArr);
			}
		} catch (error) {
			// console.log(error.messages)
			// console.log(error)
			// history.push('/not-found')
		}
	}
  const getProductList = async (categoryid, size, manufacture) => {
  	//let action = `${'http://localhost:8080/api/v1/products'}?${'&category=', categoryid}${'&count=', pageLimit}${'&lang=en'} ${'&page=', offset}`;
    let action = `${'http://localhost:8080/api/v1/products'}?${isCheckValueAndSetParams('&lang=', 'en')}${isCheckValueAndSetParams('&page=', offset)}${isCheckValueAndSetParams('&count=', pageLimit)}${isCheckValueAndSetParams('&category=', categoryid)}${isCheckValueAndSetParams('&optionValues=', size.join())}${isCheckValueAndSetParams('&manufacturer=', manufacture.join())}`;


    try {
			let response = await WebService.get(action);

      console.log('getProductList', action, response)
		} catch (error) {
		}
	}
  const [selectedOption, setSelectedOption] = useState({
    fromCurrency: null,
    toCurrency: null,
    amount: "",
  });
  const [convertedAmount, setConvertedAmount] = useState("");

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

  const onclick_test = (temp) =>{
    try {
			let clickvalue = temp.value;
      console.log('onclick test', clickvalue);
      getProductList(clickvalue, [], []);
		} catch (error) {
		}
  };
  return (
    <Container>

      <Row>
      <div className="col col-lg-1">
      {setProductData}
        </div>

         <div className="col col-lg-1">
          <Select
              value={selectedOption.fromCurrency}
              placeholder={"1차카타고리"}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={categoryData}
              isClearable
          />
        </div>
        <div className="col col-lg-1">
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
        <div className="col col-lg-1">
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
        <div className="col col-lg-1">
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
        <div className="col col-lg-1">
          <input
              type="text"
              value={selectedOption.amount}
              onChange={handleAmountChange}
          />
        </div>
        <div className="col1 col-lg-1">
          <Button variant="primary" onClick={onclick_test(selectedOption.fromCurrency)}>조회</Button>
        </div>
      </Row>
      <Row>
        <div className="col col-lg-4">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            fill
          >
            <Tab eventKey="ALL" title="전체">
              Tab content for Home
            </Tab>
            <Tab eventKey="KOR" title="한국">
              Tab content for Profile
            </Tab>
            <Tab eventKey="CH" title="중국">
              Tab content for Loooonger Tab
            </Tab>
            <Tab eventKey="JP" title="일본" disabled>
              Tab content for Contact
            </Tab>
            <Tab eventKey="1688" title="1688" disabled>
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </Row>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </Container>
  );
}

export default Page1
