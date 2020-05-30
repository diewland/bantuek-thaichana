let Thaichana = {

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
  check_in: (app_id, shop_id, flag=true) => {
    let url = flag ? Thaichana.URL_CHECK_IN
                   : Thaichana.URL_CHECK_OUT;
    url = url.replace('<app_id>', app_id);
    url = url.replace('<shop_id>', shop_id);
    Thaichana.jump_to(url);
  },

  // common
  jump_to: url => {
    if (Thaichana.is_safari()) {
      window.open(url);
      location.href = './list.html';
    }
    else {
      location.href = url;
    }
  },
  is_safari: _ => {
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
           navigator.userAgent &&
           navigator.userAgent.indexOf('CriOS') == -1 &&
           navigator.userAgent.indexOf('FxiOS') == -1;
  },

}
