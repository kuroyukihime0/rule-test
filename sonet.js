/*
pcr upload

***************************
QuantumultX:

[rewrite_local]
https:\/\/api-pc\.so-net\.tw\/.* url script-response-body sonet.js

[mitm]
hostname = api-pc.so-net.tw

***************************
Surge4 or Loon:

[Script]
http-response https:\/\/api-pc\.so-net\.tw\/.* requires-body=1,max-size=0,script-path=sonet.js

[MITM]
hostname = api-pc.so-net.tw

**************************/

var body = $response.body;
console.log("1234567");
console.log(body);
console.log("1234567");
var httpRequest = new XMLHttpRequest();
httpRequest.open('POST', 'https://ptsv2.com/t/5y3is-1625470771/post', true); 
httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
httpRequest.send("123");
$done(body);
