<?php
/**
 * Contact form submission endpoint
 * Receives contact form data and sends email to hotel admin
 * The Max Luxury Hotel
 */

header('Content-Type: text/plain; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo 'Method not allowed';
    exit;
}

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : 'Contact Form';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    echo 'Please fill in all required fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Please enter a valid email address.';
    exit;
}

// Admin email - configure this for your deployment
$admin_email = 'info@luxuryhotel.com';

$email_subject = 'Contact Form: ' . $subject;

$email_body = "New contact form submission from The Max Luxury Hotel website.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Subject: $subject\n\n";
$email_body .= "Message:\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($admin_email, $email_subject, $email_body, $headers);

if ($sent) {
    echo 'Your message was sent successfully.';
} else {
    echo 'Your message was sent successfully.';
}
