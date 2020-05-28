let APP_TITLE = 'DIEWLAND_BTCCN';
let APP_VERSION = '0.0.2';

// common

let ts = _ => +(new Date());

// storage

let Db = {

  list: _ => {
    return Disk.get(APP_TITLE, []);
  },

  add: (url, app_id, shop_id, callback) => {
    let data = Db.list();
    let row = data.filter(r => r.url == url)[0];
    // update timestamp
    if (row) {
      // update data
      row.timestamp = ts();
      // save & callback
      Disk.set(APP_TITLE, data);
      callback();
    }
    // add new row
    else {
      Thaichana.get_shop_info (app_id, shop_id, info => {
        // update data
        data.push({
          title: info.shopName,
          url: url,
          timestamp: ts(),
        });
        // save & callback
        Disk.set(APP_TITLE, data);
        callback();
      });
    }
  },

};
