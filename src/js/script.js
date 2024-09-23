document.getElementById('upload').addEventListener('change', function(event) {
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

      reader.onload = function(e) {
        document.getElementById('bg_img').src = e.target.result;
        img_wrapper.classList.add('active')

        // Sobald das Bild geladen wurde, lese die EXIF-Daten
        EXIF.getData(file, function() {
            console.log(file);
            
          const cameraModel = EXIF.getTag(this, "Model");
          const exposureTime = EXIF.getTag(this, "ExposureTime");
          const fNumber = EXIF.getTag(this, "FNumber");
          const iso = EXIF.getTag(this, "ISOSpeedRatings");
          const focalLength = EXIF.getTag(this, "FocalLength");
          const formattedExposureTime = formatExposureTime(exposureTime);
          
          if(inp_camera.checked === true) {
            wrapper_camera.classList.add('active');
            outp_camera.innerHTML = cameraModel;
          }

          if(inp_focal_length.checked === true) {
            wrapper_focallength.classList.add('active');
            outp_focalLength.innerHTML = `${focalLength}mm`;
          }

          if(inp_f_stop.checked === true) {
            wrapper_fstop.classList.add('active');
            outp_fstop.innerHTML = `f/${fNumber}`;
          }

          if(inp_shutter_speed.checked === true) {
            wrapper_shutterspeed.classList.add('active');
            outp_shutterspeed.innerHTML = `${formattedExposureTime}s`;
          }

          if(inp_iso.checked === true) {
            wrapper_iso.classList.add('active');
            outp_iso.innerHTML = `${iso}`;
          }

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