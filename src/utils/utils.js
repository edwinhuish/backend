import utils from 'hey-utils'

export default utils.extend({}, utils, {
  getClass(elem) {
    return (elem.getAttribute && elem.getAttribute('class')) || ''
  },
  hasClass(elem, selector) {
    const className = ` ${selector} `
    if (elem.nodeType === 1 && ` ${this.getClass(elem)} `.replace(/[\t\r\n\f]/g, ' ').indexOf(className) > -1) {
      return true
    }

    return false
  },
  exportExcel(data, filename, sheetName) {
    const XLSX = require('xlsx')
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, filename)
  },
  currentDate() {
    const DateFormat = (fmt, date) => {
      date = date || new Date()
      // author: meizz
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return fmt
    }

    return DateFormat('yyyy-MM-dd hh:mm:ss')
  }
})
