window.addEventListener('scroll', function() {
    var services = document.querySelectorAll('.card');
    services.forEach(function(service) {
      if (isElementPartiallyInViewport(service) && !service.classList.contains('slide-in')) {
        service.classList.add('slide-in');
      }
    });
});
window.addEventListener('scroll', function() {
    var services = document.querySelectorAll('.card2');
    services.forEach(function(service) {
      if (isElementPartiallyInViewport(service) && !service.classList.contains('sideslide-in')) {
        service.classList.add('sideslide-in');
      }
    });
});

window.onload = function() {
  var services = document.querySelectorAll('.card');
  services.forEach(function(service) {
    if (isElementPartiallyInViewport(service) && !service.classList.contains('slide-in')) {
      service.classList.add('slide-in');
    }
  });
}

function isElementPartiallyInViewport(element) {
var rect = element.getBoundingClientRect();
var windowHeight = window.innerHeight || document.documentElement.clientHeight;
var threshold = 0.6; // Adjust this threshold as needed

// Check if at least 50% of the element is visible
return (
    rect.bottom >= 0 &&
    rect.top <= windowHeight &&
    rect.bottom <= windowHeight * (1 + threshold) &&
    rect.top >= -rect.height * threshold
);
}
