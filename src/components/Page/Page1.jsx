import React , { useState ,useEffect}from 'react'
import {Tab, Tabs, Container, Row, Col, Button} from 'react-bootstrap';
import Select from "react-select";
import WebService from '../../api/webService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductDescriptionInfo = () => {
	useEffect(() => {
		// console.log(strings);
		getDefualtsOption()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getDefualtsOption = async () => {
    try {
      let response = await axios.get('http://localhost:8080/api/v1/category')
      let modifiedArr = response.data.categories.map(function(element){
        return { value: element.id , label: element.code };
      });
    
      console.log(modifiedArr)
      return(modifiedArr);
      
    } catch (error) {
      console.log(error);
    }
	}
}



async function handleSubmit() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/category')
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}


const options = [
  { value: 1, label: "1차카타고리 1" },
  { value: 0.8, label: "1차카타고리 2" },
  { value: 0.55, label: "1차카타고리 3" },
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

const changeing = [
  { value: 80, label: "Indian Rupee" },
  { value: 50, label: "Nepal" },
];

const Page1 = () => {

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

  const handleCalculate = () => {
    const { fromCurrency, toCurrency, amount } = selectedOption;

    if (fromCurrency && toCurrency && amount) {
      const conversionRate = toCurrency.value / fromCurrency.value;
      const convertedAmount = amount * conversionRate;
      setConvertedAmount(convertedAmount.toFixed(2));
    } else {
      setConvertedAmount("");
    }
  };


  return (
    <Container>
      <Row>

         <div class="col col-lg-1">
          <Select
              className="rounded-2xl w-56"
              value={selectedOption.fromCurrency}
              placeholder={"1차카타고리"}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={options}
              isClearable
          />
        </div>
        <div class="col col-lg-1">
          <Select
              className="rounded-2xl w-56"
              value={selectedOption.fromCurrency}
              placeholder={"2차카타고리"}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={options2}
              isClearable
          />
        </div>
        <div class="col col-lg-1">
          <Select
              className="rounded-2xl w-56"
              value={selectedOption.fromCurrency}
              placeholder={"3차카타고리"}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={options3}
              isClearable
          />
        </div>
        <div class="col col-lg-1">
          <Select
              className="rounded-2xl w-56"
              value={selectedOption.fromCurrency}
              placeholder={"검색대상"}
              onChange={(selectedOption) =>
                handleCurrencyChange("fromCurrency", selectedOption)
              }
              options={options5}
              isClearable
          />
        </div>
        <div class="col col-lg-1">
          <input
              type="text"
              className="rounded-lg h-10"
              value={selectedOption.amount}
              onChange={handleAmountChange}
          />
        </div>
        <div class="col col-lg-1">
          <Button variant="primary">조회</Button>{' '}
        </div>
      </Row>
      <Row>
        <div class="col col-lg-4">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
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
    </Container>
  );
}

export default Page1
