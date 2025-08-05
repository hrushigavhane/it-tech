<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Initialize response array
$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    // Sanitize and validate inputs
    $name = isset($input['name']) ? sanitize_input($input['name']) : '';
    $email = isset($input['email']) ? sanitize_input($input['email']) : '';
    $phone = isset($input['phone']) ? sanitize_input($input['phone']) : '';
    $subject = isset($input['subject']) ? sanitize_input($input['subject']) : '';
    $message = isset($input['message']) ? sanitize_input($input['message']) : '';
    $service = isset($input['service']) ? sanitize_input($input['service']) : '';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!validate_email($email)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    if (empty($subject)) {
        $subject = "New Contact Form Submission";
    }
    
    // If there are errors, return them
    if (!empty($errors)) {
        $response['success'] = false;
        $response['errors'] = $errors;
        echo json_encode($response);
        exit;
    }
    
    // Email configuration
    $to = "info@hgctech.com"; // Change this to your email
    $from = $email;
    $reply_to = $email;
    
    // Email headers
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=UTF-8";
    $headers[] = "From: HGc Tech Contact Form <noreply@hgctech.com>";
    $headers[] = "Reply-To: " . $name . " <" . $email . ">";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    // Email body
    $email_body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #4F46E5; }
            .footer { background: #1F2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>HGc Tech - Professional IT Solutions</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span><br>
                    " . htmlspecialchars($name) . "
                </div>
                <div class='field'>
                    <span class='label'>Email:</span><br>
                    " . htmlspecialchars($email) . "
                </div>";
                
    if (!empty($phone)) {
        $email_body .= "
                <div class='field'>
                    <span class='label'>Phone:</span><br>
                    " . htmlspecialchars($phone) . "
                </div>";
    }
    
    if (!empty($service)) {
        $email_body .= "
                <div class='field'>
                    <span class='label'>Service Interested In:</span><br>
                    " . htmlspecialchars($service) . "
                </div>";
    }
    
    $email_body .= "
                <div class='field'>
                    <span class='label'>Subject:</span><br>
                    " . htmlspecialchars($subject) . "
                </div>
                <div class='field'>
                    <span class='label'>Message:</span><br>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
                <div class='field'>
                    <span class='label'>Submitted:</span><br>
                    " . date('Y-m-d H:i:s') . "
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from the HGc Tech contact form.</p>
                <p>Please reply directly to this email to respond to the sender.</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Send email
    $mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Auto-reply to sender
        $auto_reply_subject = "Thank you for contacting HGc Tech";
        $auto_reply_body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); color: white; padding: 20px; text-align: center; }
                .content { background: #f8f9fa; padding: 30px; }
                .footer { background: #1F2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>Thank You for Contacting HGc Tech</h2>
                </div>
                <div class='content'>
                    <p>Dear " . htmlspecialchars($name) . ",</p>
                    <p>Thank you for reaching out to HGc Tech. We have received your message and will get back to you within 24 hours.</p>
                    <p>Our team of experts is ready to help you with your IT needs and digital transformation goals.</p>
                    <p><strong>Your message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
                    <p>Best regards,<br>The HGc Tech Team</p>
                </div>
                <div class='footer'>
                    <p>HGc Tech - Professional IT Solutions</p>
                    <p>Email: info@hgctech.com | Website: www.hgctech.com</p>
                </div>
            </div>
        </body>
        </html>";
        
        $auto_reply_headers = array();
        $auto_reply_headers[] = "MIME-Version: 1.0";
        $auto_reply_headers[] = "Content-type: text/html; charset=UTF-8";
        $auto_reply_headers[] = "From: HGc Tech <info@hgctech.com>";
        
        mail($email, $auto_reply_subject, $auto_reply_body, implode("\r\n", $auto_reply_headers));
        
        $response['success'] = true;
        $response['message'] = "Thank you for your message! We'll get back to you within 24 hours.";
    } else {
        $response['success'] = false;
        $response['errors'] = array("Sorry, there was an error sending your message. Please try again or contact us directly.");
    }
} else {
    $response['success'] = false;
    $response['errors'] = array("Invalid request method");
}

echo json_encode($response);
?>