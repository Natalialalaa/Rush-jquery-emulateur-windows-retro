$(document).ready(function () {
  var imageUrls = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg",
    "img/image5.jpg",
    "img/image6.jpg",
    "img/image7.jpg",
    "img/image8.jpg",
    "img/image9.jpg",
  ];

  function createGallery() {
    $("#gallery-container").empty();

    $.each(imageUrls, function (index, url) {
      var img = $("<img>").attr("src", url);
      $("#gallery-container").append(img);
    });

    $("#gallery-container").lightGallery({
      selector: "img",
      mode: "lg-fade",
      download: false,
      counter: false,
      fullScreen: false,
      zoom: false,
    });
  }

  $(".case-app-photo").click(function (event) {
    createGallery();
    $(".overlay").show();
    event.stopPropagation();
  });

  $(document).click(function (event) {
    if (
      !$(event.target).closest(".case-app-photo").length &&
      !$(event.target).closest(".overlay").length
    ) {
      $(".overlay").hide();
    }
  });

  $.fn.bulles = function (options) {
    var settings = $.extend(
      {
        nb: 100,
        colors: ["red", "green", "cyan", "purple", "yellow", "orange", "pink"],
        speed: 2000,
      },
      options
    );

    return this.each(function () {
      var $container = $(this);

      $container.click(function (e) {
        var containerOffset = $container.offset();
        var clickX = e.pageX - containerOffset.left;
        var clickY = e.pageY - containerOffset.top;

        for (var i = 0; i < settings.nb; i++) {
          var randomColor =
            settings.colors[Math.floor(Math.random() * settings.colors.length)];
          var size = Math.floor(Math.random() * 6) + 5;

          var startX = clickX;
          var startY = clickY;

          var endX = Math.random() * 300 - 150 + clickX;
          var endY = Math.random() * 300 - 150 + clickY;

          var $bubble = $('<div class="bubble"></div>').css({
            "background-color": randomColor,
            width: size + "px",
            height: size + "px",
            opacity: 0,
            position: "absolute",
            top: startY + "px",
            left: startX + "px",
            "border-radius": "50%",
          });

          $container.append($bubble);

          $bubble.animate(
            {
              left: endX + "px",
              top: endY + "px",
              opacity: 1,
            },
            settings.speed,
            function () {
              $(this).remove();
            }
          );
        }
      });
    });
  };

  $(".case-app").bulles();
});
