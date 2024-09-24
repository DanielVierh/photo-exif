document.getElementById('upload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const inp_camera = document.getElementById('inp_camera');
  const inp_focal_length = document.getElementById('inp_focal_length');
  const inp_f_stop = document.getElementById('inp_f_stop');
  const inp_shutter_speed = document.getElementById('inp_shutter_speed');
  const inp_iso = document.getElementById('inp_iso');
  const inp_date = document.getElementById('inp_date');

  const outp_camera = document.getElementById('outp_camera');
  const outp_focalLength = document.getElementById('outp_focalLength');
  const outp_fstop = document.getElementById('outp_fstop');
  const outp_shutterspeed = document.getElementById('outp_shutterspeed');
  const outp_iso = document.getElementById('outp_iso');


  const wrapper_camera = document.getElementById('wrapper_camera');
  const wrapper_focallength = document.getElementById('wrapper_focallength');
  const wrapper_fstop = document.getElementById('wrapper_fstop');
  const wrapper_shutterspeed = document.getElementById('wrapper_shutterspeed');
  const wrapper_iso = document.getElementById('wrapper_iso');

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById('bg_img').src = e.target.result;
      img_wrapper.classList.add('active')

      // Sobald das Bild geladen wurde, lese die EXIF-Daten
      EXIF.getData(file, function () {

        let cameraModel = EXIF.getTag(this, "Model");
        let exposureTime = EXIF.getTag(this, "ExposureTime");
        let fNumber = EXIF.getTag(this, "FNumber");
        let iso = EXIF.getTag(this, "ISOSpeedRatings");
        let focalLength = EXIF.getTag(this, "FocalLength");
        let formattedExposureTime = formatExposureTime(exposureTime);

        setTimeout(() => {
          if (inp_camera.checked === true) {
            wrapper_camera.classList.add('active');
            if (cameraModel === undefined) {
              cameraModel = '-'
            }
            outp_camera.innerHTML = cameraModel;
          }

          if (inp_focal_length.checked === true) {
            wrapper_focallength.classList.add('active');
            if (focalLength === undefined) {
              outp_focalLength.innerHTML = `-`;
            } else {
              outp_focalLength.innerHTML = `${parseInt(focalLength)}mm`;
            }

          }

          if (inp_f_stop.checked === true) {
            wrapper_fstop.classList.add('active');
            if (fNumber === undefined) {
              outp_fstop.innerHTML = `-`;
            } else {

              fNumber = parseFloat(fNumber).toFixed(1)

              switch (fNumber) {
                case '2.0':
                  fNumber = '2';
                  break;
                case '4.0':
                  fNumber = '4';
                  break;
                case '5.0':
                  fNumber = '5';
                  break;
                case '8.0':
                  fNumber = '8';
                  break;
                case '9.0':
                  fNumber = '9';
                  break;
                case '10.0':
                  fNumber = '10';
                  break;
                case '11.0':
                  fNumber = '11';
                  break;
                case '13.0':
                  fNumber = '13';
                  break;
                case '14.0':
                  fNumber = '14';
                  break;
                case '16.0':
                  fNumber = '16';
                  break;
                case '18.0':
                  fNumber = '18';
                  break;
                case '20.0':
                  fNumber = '20';
                  break;
                case '22.0':
                  fNumber = '22';
                  break;
                case '25.0':
                  fNumber = '25';
                  break;
                case '29.0':
                  fNumber = '29';
                  break;
                case '32.0':
                  fNumber = '32';
                  break;

                default:
                  break;
              }


              outp_fstop.innerHTML = `f/${fNumber}`;
            }
          }

          if (inp_shutter_speed.checked === true) {
            wrapper_shutterspeed.classList.add('active');

            if (formattedExposureTime === '1/NaN') {
              outp_shutterspeed.innerHTML = `-`;
            } else {
              outp_shutterspeed.innerHTML = `${formattedExposureTime}s`;
            }

          }

          if (inp_iso.checked === true) {
            wrapper_iso.classList.add('active');

            if (iso === undefined) {
              iso = '-'
            }
            outp_iso.innerHTML = `${parseInt(iso)}`;
          }
        }, 500);

      });
    };

    reader.readAsDataURL(file); // Lies die Datei ein
  }
});

function formatExposureTime(exposureTime) {
  if (exposureTime >= 1) {
    return exposureTime.toFixed(1);
  } else {
    const denominator = Math.round(1 / exposureTime);
    return `1/${denominator}`;
  }
}