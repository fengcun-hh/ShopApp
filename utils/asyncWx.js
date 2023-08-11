
//弹出交互
export const showModal = (conntent) => {
    return new Promise((reslove, reject) => {
        wx.showModal({
            title: '提示',
            content: conntent,
            success(res) {
                if (res.confirm) {
                    reslove(res)
                } else if (res.cancel) {
                    return
                }
            }
        })
    })
};

//结算吐司提醒
export const showToast = (title) => {
    return new Promise((reslove, reject) => {
        wx.showToast({
            title: title,
            icon: "none",
            duration: 2000
        })
    })
};

//获取code
export const login = () => {
    return new Promise((reslove, reject) => {
        wx.login({
            success: (res) => {
                reslove(res.code)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
};

//微信支付请求
export const requestPayment = (pay) => {
    return new Promise((reslove, reject) => {
        wx.requestPayment({
            ...pay,
            success(res) {
                reslove(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
};