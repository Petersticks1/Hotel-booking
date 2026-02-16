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
    var roomSelect = document.getElementById("booking-room");

    // Fetch rooms and populate dropdown
    if (roomSelect) {
      fetch('https://demo.altairattic.net/hotel-two/api/rooms')
        .then(response => response.json())
        .then(data => {
          const rooms = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);

          if (rooms.length > 0) {
            // Clear existing options, keep the first one (placeholder)
            roomSelect.innerHTML = '<option value="">Select room type</option>';

            rooms.forEach(room => {
              const option = document.createElement('option');
              option.value = room.id;

              const displayPrice = room.price_per_night
                ? ` - ₦${Number(room.price_per_night).toLocaleString()}/night`
                : '';

              const displayName = room.room_type || room.name || `Room ${room.room_number}`;

              option.textContent = `${displayName}${displayPrice}`;
              roomSelect.appendChild(option);
            });

            // Check for room_id in URL and select it
            var urlParams = new URLSearchParams(window.location.search);
            var urlRoomId = urlParams.get('room_id');
            if (urlRoomId) {
              roomSelect.value = urlRoomId;
              // Trigger change event for Select2 or other libraries if needed
              $(roomSelect).trigger('change');
            }
          }
        })
        .catch(console.error);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(form);

      // Helper to format date to YYYY-MM-DD
      function toIsoDate(dateStr) {
        if (!dateStr) return null;
        // If it's already YYYY-MM-DD, just return it
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

        var date = parseDate(dateStr);
        if (!date || isNaN(date.getTime())) return dateStr;
        var y = date.getFullYear();
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
      }

      var checkInDate = toIsoDate(formData.get("checkin"));
      var checkOutDate = toIsoDate(formData.get("checkout"));

      // Get room_id from form (dropdown values are IDs)
      var roomId = parseInt(formData.get("room_type") || "0", 10);
      var specialRequests = formData.get("special_requests") || "";

      var data = {
        room_id: roomId,
        check_in: checkInDate,
        check_out: checkOutDate,
        customer_name: formData.get("name") || "",
        customer_email: formData.get("email") || "",
        customer_phone: formData.get("phone") || "",
        adults: parseInt(formData.get("adults") || "1", 10),
        children: parseInt(formData.get("children") || "0", 10),
        special_requests: specialRequests
      };

      var $messageEl = $(messageEl);
      hideMessage($messageEl);

      // Validation
      var validationData = {
        name: data.customer_name,
        email: data.customer_email,
        phone: data.customer_phone,
        checkin: formData.get("checkin"),
        checkout: formData.get("checkout"),
        room_type: roomId // Pass ID for validation
      };

      var errors = validateBookingForm(validationData);
      if (errors.length > 0) {
        showMessage($messageEl, errors.join(" "), true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "Submitting...";
      }

      console.log('Sending booking payload:', data); // Debugging

      fetch("https://demo.altairattic.net/hotel-two/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json().then(function (json) {
            if (response.ok) {
              return json;
            }
            // Construct detailed error message
            var errorMsg = json.message || 'Server returned ' + response.status;
            if (json.errors) {
              if (typeof json.errors === 'object') {
                var details = Object.values(json.errors).flat().join(' ');
                errorMsg += ': ' + details;
              } else {
                errorMsg += ': ' + JSON.stringify(json.errors);
              }
            }
            throw new Error(errorMsg);
          }).catch(function (e) {
            // Handle non-JSON responses or JSON parse errors
            if (response.ok) return {};
            throw new Error(e.message || 'Server returned ' + response.status);
          });
        })
        .then(function (result) {
          // Success
          showMessage(
            $messageEl,
            "Booking request received successfully! We will confirm your reservation via email within 24 hours.",
            false
          );
          form.reset();
          // Reset Select2 and Datepicker if they exist
          if (typeof $ !== "undefined") {
            if ($.fn.select2) $(".select2").val(null).trigger("change");
            if ($.fn.datepicker) $(".datepicker").datepicker("setDate", null);
          }
        })
        .catch(function (err) {
          console.error('Booking submission error:', err);
          showMessage(
            $messageEl,
            err.message || "Unable to submit booking. Please check your connection or call us at +2347077195098.",
            true
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
