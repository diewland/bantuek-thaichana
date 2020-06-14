// find back camera
function find_back_camera (devices) {
  // validate input
  if (!Array.isArray(devices)) return null;

  // (1) find android back camera ( camera2 0, facing back )
  let an_cams = devices.filter(d => d.label.search(/camera2 0.+back/i) > -1);
  if (an_cams.length > 0) return an_cams[an_cams.length-1];

  // (2) find iOS back camera ( Back Camera )
  let ios_cams = devices.filter(d => d.label.search(/back/i) > -1);
  if (ios_cams.length > 0) return ios_cams[ios_cams.length-1];

  // (3) fallback, return last device
  return devices[devices.length-1];
}
