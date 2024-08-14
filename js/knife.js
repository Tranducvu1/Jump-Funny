game.drawKnife = function (knife) {
      var knifeImage = new Image();
      knifeImage.src = 'knife.png';
      
      console.log("Creating knife image:", knifeImage);
    
      knifeImage.onload = function() {
        console.log("Knife image loaded.");
        game.context.drawImage(
          knifeImage,
          knife.x,
          knife.y,
          knife.width,
          knife.height
        );
      };
    
      knifeImage.onerror = function() {
        console.error("Failed to load knife image.");
      };
    };
    