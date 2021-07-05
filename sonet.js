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
const $req = req();

var body = $response.body;
console.log("start upload");
const testServer = {
    url: 'http://bcr.xmsl.icu:8082/postData',
    body: btoa(body)
  };
  $req.post(testServer, function(error, response, data) {
    if (!error) {
      console.log("success");
    }else{
        console.log("failed");
    }
    $req.end()
  })
$done(body);


function req() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) return $done({})
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, post, end }
};
