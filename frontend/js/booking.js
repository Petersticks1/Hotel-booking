/**
 * Booking form validation and submission
 * The Max Luxury Hotel
 */
(function () {
  "use strict";

  function parseDate(str) {
    if (!str) return null;
    var parts = str.split(/[\/\-\.]/);
    if (parts.length === 3) {
      var m = parseInt(parts[0], 10);
      var d = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        return new Date(y, m - 1, d);
      }
    }
    return new Date(str);
  }

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showMessage(el, msg, isError) {
    el.removeClass("alert-success alert-danger")
      .addClass(isError ? "alert-danger" : "alert-success")
      .text(msg)
      .fadeIn();
  }

  function hideMessage(el) {
    el.fadeOut();
  }

  function validateBookingForm(data) {
    var errors = [];
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Please enter your full name.");
    }
    if (!data.email || !validateEmail(data.email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!data.phone || data.phone.trim().length < 5) {
      errors.push("Please enter a valid phone number.");
    }
    if (!data.checkin) {
      errors.push("Please select check-in date.");
    }
    if (!data.checkout) {
      errors.push("Please select check-out date.");
    }
    if (data.checkin && data.checkout) {
      var checkIn = parseDate(data.checkin);
      var checkout = parseDate(data.checkout);
      if (checkIn && checkout && checkout <= checkIn) {
        errors.push("Check-out date must be after check-in date.");
      }
    }
    if (!data.room_type) {
      errors.push("Please select a room type.");
    }
    return errors;
  }

  function initBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;

    var messageEl = document.getElementById("booking-message");
    var submitBtn = document.getElementById("booking-submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var data = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        checkin: formData.get("checkin") || "",
        checkout: formData.get("checkout") || "",
        adults: formData.get("adults") || "1",
        children: formData.get("children") || "0",
        room_type: formData.get("room_type") || "",
        special_requests: formData.get("special_requests") || "",
      };

      var $messageEl = $(messageEl);
      hideMessage($messageEl);

      var errors = validateBookingForm(data);
      if (errors.length > 0) {
        showMessage($messageEl, errors.join(" "), true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "Submitting...";
      }

      fetch("api/send-booking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json().catch(function () {
            return { success: false, message: "Invalid server response." };
          });
        })
        .then(function (result) {
          if (result.success) {
            showMessage(
              $messageEl,
              result.message ||
                "Booking request received successfully! We will confirm your reservation via email within 24 hours.",
              false,
            );
            form.reset();
            if (typeof $ !== "undefined" && $.fn.select2) {
              $(".select2").val(null).trigger("change");
            }
            if (typeof $ !== "undefined" && $.fn.datepicker) {
              $(".datepicker").datepicker("setDate", null);
            }
          } else {
            showMessage(
              $messageEl,
              result.message ||
                "Sorry, something went wrong. Please try again or call us at +2347077195098.",
              true,
            );
          }
        })
        .catch(function (err) {
          showMessage(
            $messageEl,
            "Unable to submit booking. Please check your connection or call us at +2347077195098.",
            true,
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.querySelector("span").textContent = "Submit Reservation";
          }
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBookingForm);
  } else {
    initBookingForm();
  }
})();
