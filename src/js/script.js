document.getElementById('upload').addEventListener('change', function(event) {
    var file = event.target.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        document.getElementById('bg_img').src = e.target.result;
        img_wrapper.classList.add('active')

        // Sobald das Bild geladen wurde, lese die EXIF-Daten
        EXIF.getData(file, function() {
          const cameraModel = EXIF.getTag(this, "Model");
          const exposureTime = EXIF.getTag(this, "ExposureTime");
          const fNumber = EXIF.getTag(this, "FNumber");
          const isoSpeed = EXIF.getTag(this, "ISOSpeedRatings");
          const focalLength = EXIF.getTag(this, "FocalLength");
          const formattedExposureTime = formatExposureTime(exposureTime);

          // Daten ausgeben
          document.getElementById('label').innerHTML = `
            Kamera: ${cameraModel} <br/>
            Verschlusszeit: ${formattedExposureTime} s <br/>
            Blende: f/${fNumber} <br/>
            ISO: ${isoSpeed} <br/>
            Brennweite: ${focalLength} mm
          `;
        });
      };

      reader.readAsDataURL(file); // Lies die Datei ein
    }
  });

  function formatExposureTime(exposureTime) {
    if (exposureTime >= 1) {
      // Verschlusszeit größer oder gleich 1 Sekunde (keine Bruchdarstellung)
      return exposureTime.toFixed(1);
    } else {
      // Verschlusszeit kleiner als 1 Sekunde, Umwandlung in Bruch
      var denominator = Math.round(1 / exposureTime);
      return `1/${denominator}`;
    }
  }