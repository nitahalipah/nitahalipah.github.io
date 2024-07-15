<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

ob_start(); // Start output buffering

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate form data
    if (!empty($name) && !empty($email) && !empty($phone) && !empty($subject) && !empty($message)) {
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);

        try {
            // Enable SMTP debugging
            $mail->SMTPDebug = 2; // or 3 for more detailed debug output
            $mail->Debugoutput = 'html';

            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
            $mail->SMTPAuth = true;
            $mail->Username = 'nitahalipah441@gmail.com'; // SMTP username
            $mail->Password = 'achk tqku sbnk dqsc'; // SMTP password (App Password)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress('nitahalipah441@gmail.com'); // Add a recipient

            // Content
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = "Contact Form Submission: $subject";
            $mail->Body = "You have received a new message from $name.<br><br>".
                          "Email: $email<br>".
                          "Phone: $phone<br><br>".
                          "Message:<br>$message";
            $mail->AltBody = "You have received a new message from $name.\n\n".
                            "Email: $email\n".
                            "Phone: $phone\n\n".
                            "Message:\n$message";

            $mail->send();
            ob_end_clean(); // Clean (erase) the output buffer and turn off output buffering
            header('Location: thank_you.html');
            exit;
        } catch (Exception $e) {
            ob_end_clean(); // Clean (erase) the output buffer and turn off output buffering
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        ob_end_clean(); // Clean (erase) the output buffer and turn off output buffering
        echo 'Error: All fields are required.';
    }
} else {
    ob_end_clean(); // Clean (erase) the output buffer and turn off output buffering
    echo 'Error: Invalid request method.';
}
?>
