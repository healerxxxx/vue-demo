export default () => {
  const gwDownloadUrl = {
    apk: 'http://static.ws.126.net/163/apk/hongcai/gw_lotterynews-app-f_online-release.apk?download=gw_lotterynews-app-f_online-release.apk',
    wx: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.netease.lotterynews',
    iOS: 'https://itunes.apple.com/cn/app/wang-yi-hong-cai/id1171321498?mt=8'
  }
  const ua = window.navigator.userAgent
  if (/micromessenger/gi.test(ua)) {
    window.location.href = gwDownloadUrl.wx
  } else {
    if (/iphone/gi.test(ua)) {
      window.location.href = gwDownloadUrl.iOS
    } else {
      window.location.href = gwDownloadUrl.apk
    }
  }
}
