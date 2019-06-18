
let Ip: any = {}
if (document.location.hostname == 'wms.yncic.com') {
    //正式环境
    Ip = {
        IpMain: 'http://api.wms.yncic.com/sys',
        IpBase: 'http://api.wms.yncic.com/sap',
        IpOrder: 'http://api.wms.yncic.com/pmc',
        IpAccept: 'http://api.wms.yncic.com/bs',
        IpAmount:'http://api.wms.yncic.com/bs',
        href: 'http://wms.yncic.com/login',
    }
}
// 测试环境
else {
    Ip = {
        IpMain: 'http://172.16.36.174:6001',
        IpBase: 'http://172.16.36.174:6002',
        IpOrder: 'http://172.16.36.174:6003',
        IpAccept: 'http://172.16.36.174:6004',
        IpAmount:'http://172.16.36.174:6125',
        href: 'http://wms_dev.yncic.com/login',

    }
}

export default Ip;
