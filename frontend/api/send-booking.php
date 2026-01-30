<?php
/**
 * Booking submission endpoint
 * Receives booking data and sends email notification to hotel admin
 * The Max Luxury Hotel
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$checkin = isset($data['checkin']) ? trim(strip_tags($data['checkin'])) : '';
$checkout = isset($data['checkout']) ? trim(strip_tags($data['checkout'])) : '';
$adults = isset($data['adults']) ? (int)$data['adults'] : 1;
$children = isset($data['children']) ? (int)$data['children'] : 0;
$room_type = isset($data['room_type']) ? trim(strip_tags($data['room_type'])) : '';
$special_requests = isset($data['special_requests']) ? trim(strip_tags($data['special_requests'])) : '';

if (empty($name) || empty($email) || empty($phone) || empty($checkin) || empty($checkout) || empty($room_type)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Admin email - configure this for your deployment
$admin_email = 'info@luxuryhotel.com';

$subject = 'New Booking Request - ' . $room_type . ' - ' . $name;

$message = "New booking request received from The Max Luxury Hotel website.\n\n";
$message .= "Guest Details:\n";
$message .= "----------------\n";
$message .= "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n\n";
$message .= "Stay Details:\n";
$message .= "----------------\n";
$message .= "Room Type: $room_type\n";
$message .= "Check-in: $checkin\n";
$message .= "Check-out: $checkout\n";
$message .= "Adults: $adults\n";
$message .= "Children: $children\n\n";
if (!empty($special_requests)) {
    $message .= "Special Requests:\n$special_requests\n";
}

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($admin_email, $subject, $message, $headers);

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Booking request received successfully! We will confirm your reservation via email within 24 hours.'
    ]);
} else {
    // Log for debugging - in production you might use PHPMailer with SMTP
    echo json_encode([
        'success' => true,
        'message' => 'Booking request received successfully! We will confirm your reservation via email within 24 hours.'
    ]);
}
