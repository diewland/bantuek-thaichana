let Thaichana = {

  // api
  URL_SHOP_INFO: 'https://api-customer.thaichana.com/shop/<app_id>/<shop_id>/qr',

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

}
