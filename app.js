let APP_TITLE = 'DIEWLAND_BTCCN';
let APP_VERSION = '0.0.5';

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
      // calc new checked-in
      let new_checked_in = !row.checked_in;
      // update data
      row.timestamp = ts();
      row.checked_in = new_checked_in;
      // save & callback
      Disk.set(APP_TITLE, data);
      callback(new_checked_in);
    }
    // add new row
    else {
      Thaichana.get_shop_info (app_id, shop_id, info => {
        // update data
        data.push({
          app_id: app_id,
          shop_id: shop_id,
          title: info.shopName,
          url: url,
          timestamp: ts(),
          checked_in: true,
        });
        // save & callback
        Disk.set(APP_TITLE, data);
        callback(true);
      });
    }
  },

};
