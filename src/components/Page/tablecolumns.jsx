const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'selid', headerName: '판매자 id', width: 130 },
    { field: 'image', headerName: '이미지', width: 130 ,  renderCell: (params) => <img src={params.value} width = "40"/> },
    { field: 'name', headerName: '상품명', width: 130 },
    { field: 'sortOrder', headerName: 'MOQ', width: 130 },
    { field: 'price', headerName: '가격', width: 130 },
    { field: 'qny', headerName: '판매량(누적)', width: 130 },
    { field: 'dateAvailable', headerName: '게시일', width: 130 },
    { field: 'creationDate', headerName: '수정일', width: 130 }, 
    { field: '승인', headerName: '승인', width: 130 },
  ];

  export default columns