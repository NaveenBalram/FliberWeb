import axios from 'axios';

const OLD_API_BASE = 'http://52.176.146.117:8000/' 

const PULSE_LAB = 'https://alchemy-service.pulselabs.co.in/kyc/'

const IFSC_CODE = 'https://ifsc.firstatom.org/key/4VqHlQcj8dYFkcwrKSK0He05E/ifsc/'

const API_BASE = 'https://fliberdevapi.azurewebsites.net/v1/'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH',
  'Accept' : 'application/json',
  'Access-Control-Allow-Origin': '*'
};


const blankheaders = {
};


export async function getRequest (path, params) {
  const res = await axios.get (API_BASE + path, {headers, params});
  return res;
}

export async function postRequest (path, body) {
  const res = await axios.post(API_BASE + path, body, {headers});    //('https://cors-anywhere.herokuapp.com/'+API_BASE + path, body, {headers});
  return res;
}

export async function patchRequest(path,body){
  const res = await axios.patch(API_BASE + path, body, {headers});
  return res;
}

export async function deleteRequest (path, params) {
  const res = await axios.delete (API_BASE + path, {headers, params});
  return res;
}


export async function postPulseLabRequest(path,body){
  const res = await axios.post ('https://cors-anywhere.herokuapp.com/'+PULSE_LAB + path, body, {headers});
  return res;
}

export async function getIfscCodeRequest(path,params){
  const res = await axios.get(IFSC_CODE + path, {headers, params});
  return res;
}
