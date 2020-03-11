function requestUrl(data, uri) {
    let that = this
    return new Promise(function(resolve, reject) {
        wx.request({
            url: uri,
            method: 'GET',
            data: data,
            complete: function(res) {
                resolve(res.data)
            }
        })
    })
}

function requestUrlSession(data, uri) {
    let that = this
    return new Promise(function(resolve, reject) {
        wx.request({
            url: uri,
            method: 'GET',
            data: data,
            complete: function(res) {
                resolve(res)
            }
        })
    })
}

function showSuccess(msg) {
    wx.showToast({
        title: msg,
        duration: 1000
    })
}

function showError(msg) {
    wx.showToast({
        title: msg,
        duration: 2000,
        icon: 'none'
    })
}

function chooseimage(count, files, name, url) {
    let that = this
    return new Promise(function(resolve, reject) {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            count: count,
            success: function(res) {
                if (res.tempFilePaths.length + files.length > count) {
                    that.showError('请上传少于' + count + '张图片')
                } else {
                    Promise.all(res.tempFilePaths.map((fileurl) => {
                        return new Promise(function(resolve, reject) {
                            wx.uploadFile({
                                url: url,
                                filePath: fileurl,
                                name: name,
                                formData: {
                                    'type': name
                                },
                                success: function(res) {
                                    if (res.statusCode === 200) {
                                        resolve(res.data)
                                    }
                                }

                            })
                        })
                    })).then(res => {
                        resolve(res)
                    })
                }
            }
        })


    })
}



module.exports = {
    showSuccess: showSuccess,
    showError: showError,
    requestUrl: requestUrl,
    requestUrlSession: requestUrlSession,
    chooseimage: chooseimage
}