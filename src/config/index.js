export const SERVER_URL = "http://"+process.env.REACT_APP_EGOV_CONTEXT_URL; // REST API 서버 Domain URL
export const LOCAL_shopizer = "http://localhost:8080/api/v1/"
export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // default = 공지사항 게시판 아이디
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // 공지사항 게시판 아이디
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB"; // 갤러리 게시판 아이디

//export const ADDRESS_SEARCH_URL = "http://localhost:5000/test"
export const ADDRESS_SEARCH_URL = "http://business.juso.go.kr/addrlink/addrLinkApi.do"
export const ADDRESS_SEARCH_KEY = "U01TX0FVVEgyMDI0MDQxMTEwMzQ0NjExNDY4MDc="  //개발용 임시 키

//export const APP_API_LOGING_URL = "http://192.168.0.229:5000/"
export const APP_API_LOGING_URL = "http://"+process.env.REACT_APP_LOGING;
