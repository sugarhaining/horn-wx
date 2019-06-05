const ajax = function(url,data={},method='GET',headers = {'Content-Type': 'application/json'}){
    return new Promise((resolve,reject)=>{
        if(method==='POST' || method==='DELETE'){
            headers= {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        wx.request({
            url, 
            method,
            data,
            header:headers,
            success(res){
                if(res.data.errcode ==-1){
                    reject(res)
                }
                else{
                    resolve(res)
                }
            },
            fail(err){
                reject(err)
            }
        })
    })
}
export default ajax