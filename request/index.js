export const request = (params) => {
	wx.showLoading({
	  title: '页面加载中',
	  mask: true
	})
	const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1" 
	return new Promise((resolve, reject) => {
		wx.request({
		  ...params,
		  url: baseUrl + params.url,
		  success: (res) => {
			  resolve(res)
		  },
		  fail: (err) => {
			  reject(err)
		  },
		  complete: () => {
			  wx.hideLoading()
		  }
		})
	})
}