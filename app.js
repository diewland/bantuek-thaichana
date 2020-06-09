let APP_TITLE = 'DIEWLAND_BTCCN';
let APP_VERSION = '0.0.7';
let KEY_CAMERAS = `${APP_TITLE}_CAMERAS`;
let KEY_CAM_LIB = `${APP_TITLE}_CAM_LIB`;

// datetime

let FMT_DATETIME = 'YYYY/MM/DD H:mm:ss';
let ts = _ => +(new Date());

// camera libraries

let cam_libs = {
  'JsQRScanner':  './scan.html',
  'html5-qrcode': './scan_v2.html',
};

let get_scan_url = _ => cam_libs[Db.get_cam_lib()];

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

  // cameras
  save_cams: (cameras) => Disk.set(KEY_CAMERAS, cameras),
  load_cams: () => Disk.get(KEY_CAMERAS),
  remove_cams: () => Disk.remove(KEY_CAMERAS),

  // camera lib
  set_cam_lib: (lib_name) => Disk.set(KEY_CAM_LIB, lib_name),
  get_cam_lib: _ => Disk.get(KEY_CAM_LIB) || 'html5-qrcode',
  remove_cam_lib: _ => Disk.remove(KEY_CAM_LIB),

};
