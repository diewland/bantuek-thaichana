let Thaichana = {

  // const
  WIN: 'WIN_BTCCN',

  // api
  URL_SHOP_INFO: 'https://api-customer.thaichana.com/shop/<app_id>/<shop_id>/qr',
  URL_CHECK_IN:  'https://qr.thaichana.com/callback?appId=<app_id>&shopId=<shop_id>&type=checkin&token=&mode=line&closeBtn=',
  URL_CHECK_OUT: 'https://qr.thaichana.com/callback?appId=<app_id>&shopId=<shop_id>&type=checkout&token=&mode=line',

  // extract shop url
  extract_shop_url: url => {
    let result = url.match(/^https:\/\/qr.thaichana.com.+appId=(.+)\&shopId=(.+)$/);
    if (result === null) return null;
    let [ _, app_id, shop_id ] = result;
    return {
      url: url,
      app_id: app_id,
      shop_id: shop_id,
    }
  },

  // get shop info
  get_shop_info: (app_id, shop_id, callback) => {
    let url = Thaichana.URL_SHOP_INFO;
    url = url.replace('<app_id>', app_id);
    url = url.replace('<shop_id>', shop_id);
    $.get(url, info => callback(info));
  },

  // check-in/out
  check_in: (app_id, shop_id, flag=true, screen=false) => {
    let url = flag ? Thaichana.URL_CHECK_IN
                   : Thaichana.URL_CHECK_OUT;
    url = url.replace('<app_id>', app_id);
    url = url.replace('<shop_id>', shop_id);
    Thaichana.jump_to(url, screen);
  },

  // re-direct page logic
  jump_to: (url, screen) => {
    if (Thaichana.is_safari()) {
      if (screen) { // from scan screen
        Thaichana.push_pending_url(url, _ => {
          location.href = './check_in.html';
        });
      }
      else { // from list screen
        window.open(url, Thaichana.WIN);
        location.href = './list.html';
      }
    }
    else { // chrome
      location.href = url;
    }
  },

  // check browsers
  is_safari: _ => {
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
           navigator.userAgent &&
           navigator.userAgent.indexOf('CriOS') == -1 &&
           navigator.userAgent.indexOf('FxiOS') == -1;
  },
  is_chrome: _ => !Thaichana.is_safari(),

  // pending url
  KEY_PENDING_URL: 'DIEWLAND_BTCCN_PENDING_URL',
  push_pending_url: (url, callback) => {
    localStorage.setItem(Thaichana.KEY_PENDING_URL, url);
    setTimeout(callback, 100);
  },
  pop_pending_url: _ => {
    let url = localStorage.getItem(Thaichana.KEY_PENDING_URL) || null;
    if (url !== null) localStorage.removeItem(Thaichana.KEY_PENDING_URL);
    return url;
  },

}
