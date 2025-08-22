exports.otpEmail = (email, otp) => {
	return `
      <!DOCTYPE html>
      <html>

      <head>
         <meta charset="UTF-8">
         <title>OTP Verification - Forever</title>
         <style>
               body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #333333;
                  margin: 0;
                  padding: 0;
               }

               .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
               }

               .logo {
                  max-width: 200px;
                  margin-bottom: 30px;
               }

               .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 30px;
                  border-radius: 10px 10px 0 0;
               }

               .message {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
               }

               .body-content {
                  background-color: #f8f9fa;
                  padding: 30px;
                  border-radius: 0 0 10px 10px;
               }

               .greeting {
                  font-size: 18px;
                  margin-bottom: 20px;
                  color: #333;
               }

               .otp-container {
                  background-color: #ffffff;
                  border: 2px dashed #667eea;
                  border-radius: 8px;
                  padding: 20px;
                  margin: 30px 0;
               }

               .otp-code {
                  font-size: 32px;
                  font-weight: bold;
                  color: #667eea;
                  letter-spacing: 8px;
                  margin: 0;
               }

               .otp-label {
                  font-size: 14px;
                  color: #666;
                  margin-bottom: 10px;
               }

               .instructions {
                  font-size: 16px;
                  color: #555;
                  margin: 20px 0;
               }

               .warning {
                  background-color: #fff3cd;
                  color: #856404;
                  padding: 15px;
                  border-radius: 5px;
                  font-size: 14px;
                  margin: 20px 0;
                  border-left: 4px solid #ffc107;
               }

               .footer {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
               }

               .highlight {
                  color: #667eea;
                  font-weight: bold;
               }

               .brand {
                  color: #667eea;
                  font-weight: bold;
                  font-size: 20px;
               }
         </style>
      </head>

      <body>
         <div class="container">
               <div class="header">
                  <div class="brand">Forever</div>
                  <div class="message">OTP Verification</div>
               </div>
               
               <div class="body-content">
                  <div class="greeting">Hello Sir/Ma'am</div>
                  
                  <p class="instructions">
                     We received a request to verify your account. Please use the following
                     <span class="highlight">One-Time Password (OTP)</span> to complete your verification:
                  </p>
                  
                  <div class="otp-container">
                     <div class="otp-label">Your OTP Code</div>
                     <div class="otp-code">${otp}</div>
                  </div>
                  
                  <p class="instructions">
                     This OTP is valid for <strong>10 minutes</strong> only. Please do not share this code with anyone.
                  </p>
                  
                  <div class="warning">
                     <strong>Security Notice:</strong> If you didn't request this verification, please ignore this email 
                     or contact our support team immediately.
                  </div>
               </div>
               
               <div class="footer">
                  <p>This email was sent to <span class="highlight">${email}</span></p>
                  <p>If you have any questions, please contact us at 
                     <a href="mailto:support@forever.com" style="color: #667eea;">support@forever.com</a>
                  </p>
                  <p>© 2025 Forever. All rights reserved.</p>
               </div>
         </div>
      </body>

      </html>`;
};
