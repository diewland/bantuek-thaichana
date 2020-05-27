let APP_TITLE = 'DIEWLAND_BTCCN';
let APP_VERSION = '0.0.1';

let FMT_DATETIME = 'YYYY/MM/DD H:mm:ss';

// common

let ts = _ => +(new Date());

// storage

let Db = {

  list: _ => {
    return Disk.get(APP_TITLE, []);
  },

  add: (url) => {
    let data = Db.list();
    let row = data.filter(r => r.url == url)[0];
    if (row) { // update timestamp
      row.timestamp = ts();
    }
    else { // add new row
      data.push({
        title: moment().format(FMT_DATETIME),
        url: url,
        timestamp: ts(),
      });
    }
    return Disk.set(APP_TITLE, data);
  },

};
