import React from "react";

function ImageCarousel() {
  return (
    <div
      className="carousel rounded-box h-96 carousel-center mt-10 mb-10"
      style={{ width: "100%" }}
    >
      <div className="carousel-item">
        <img src="https://image.freepik.com/free-photo/young-beautiful-woman-with-curly-hair-holiday-hat-holding-birthday-cake-happy-surprised-standing-orange-wall_141793-57024.jpg" />
      </div>

      <div className="carousel-item">
        <img src="https://img.freepik.com/free-photo/young-beautiful-woman-with-curly-hair-holiday-cap-holding-birthday-cake-hapy-cheerful-birthday-party-concept-pink_141793-58910.jpg?size=626&ext=jpg" />
      </div>

      <div className="carousel-item">
        <img src="https://image.freepik.com/free-photo/middle-age-woman-party-hat-holding-birthday-cake-looking-it-with-confuse-expression-celebrating-birthday-party-standing-orange-wall_141793-100813.jpg" />
      </div>
    </div>
  );
}

export default ImageCarousel;
