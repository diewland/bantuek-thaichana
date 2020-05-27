let APP_TITLE = 'DIEWLAND_BTCCN';
let APP_VERSION = '0.0.1';

let FMT_DATETIME = 'YYYY/MM/DD H:mm:ss';

// storage

let Db = {

  // TODO remove later
  /*
  sample: [
    {
      title: 'True Space สาขา UTCC #1',
      url: 'https://qr.thaichana.com/?appId=0001&shopId=S0000054079',
      timestamp: 1590592774594,
    },
    {
      title: 'True Space สาขา UTCC #2',
      url: 'https://qr.thaichana.com/?appId=0001&shopId=S0000054079',
      timestamp: 1590592777594,
    },
    {
      title: 'True Space สาขา UTCC #3',
      url: 'https://qr.thaichana.com/?appId=0001&shopId=S0000054079',
      timestamp: 1590592775594,
    },
  ],
  */

  list: _ => {
    return Disk.get(APP_TITLE, []);
  },
  list_desc: _ => {
    return Db.list().sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  },

  add: (url) => {
    let data = Db.list();
    let row = data.filter(r => r.url == url)[0];
    let ts = +(new Date());
    if (row) { // update timestamp
      row.timestamp = ts;
    }
    else { // add new row
      data.push({
        title: moment().format(FMT_DATETIME),
        url: url,
        timestamp: ts,
      });
    }
    return Disk.set(APP_TITLE, data);
  },

};
