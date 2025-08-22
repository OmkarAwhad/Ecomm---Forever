exports.newsletterWelcome = (email, name) => {
   return `
      <!DOCTYPE html>
      <html>

      <head>
         <meta charset="UTF-8">
         <title>Welcome to Forever Newsletter - 20% Off Inside!</title>
         <style>
               body {
                  background-color: #f8f9fa;
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
                  background-color: #ffffff;
                  border-radius: 10px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
               }

               .header {
                  background: linear-gradient(135deg, #000000 0%, #333333 100%);
                  color: white;
                  padding: 40px 30px;
                  text-align: center;
               }

               .brand {
                  font-size: 28px;
                  font-weight: bold;
                  margin-bottom: 10px;
               }

               .welcome-message {
                  font-size: 20px;
                  margin: 0;
               }

               .body-content {
                  padding: 40px 30px;
                  text-align: center;
               }

               .discount-section {
                  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
                  color: white;
                  padding: 30px;
                  border-radius: 10px;
                  margin: 30px 0;
               }

               .discount-title {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
               }

               .discount-code {
                  background-color: white;
                  color: #ff6b6b;
                  padding: 15px 30px;
                  border-radius: 50px;
                  font-size: 20px;
                  font-weight: bold;
                  display: inline-block;
                  margin: 20px 0;
                  letter-spacing: 2px;
               }

               .cta-button {
                  background-color: #000000;
                  color: white;
                  padding: 15px 40px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  display: inline-block;
                  margin: 20px 0;
                  transition: background-color 0.3s ease;
               }

               .cta-button:hover {
                  background-color: #333333;
               }

               .benefits-section {
                  margin: 40px 0;
                  text-align: left;
               }

               .benefit-item {
                  display: flex;
                  align-items: center;
                  margin: 15px 0;
                  padding: 15px;
                  background-color: #f8f9fa;
                  border-radius: 8px;
               }

               .benefit-icon {
                  width: 40px;
                  height: 40px;
                  background-color: #000000;
                  color: white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 15px;
                  font-weight: bold;
               }

               .benefit-text {
                  flex: 1;
               }

               .benefit-title {
                  font-weight: bold;
                  margin-bottom: 5px;
               }

               .benefit-desc {
                  color: #666;
                  font-size: 14px;
               }

               .footer {
                  background-color: #f8f9fa;
                  padding: 30px;
                  text-align: center;
                  color: #666;
                  font-size: 14px;
               }

               .social-links {
                  margin: 20px 0;
               }

               .social-links a {
                  display: inline-block;
                  margin: 0 10px;
                  padding: 10px;
                  background-color: #333;
                  color: white;
                  border-radius: 50%;
                  text-decoration: none;
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  line-height: 20px;
               }

               .highlight {
                  color: #ff6b6b;
                  font-weight: bold;
               }

               @media only screen and (max-width: 600px) {
                  .container {
                     margin: 0;
                     border-radius: 0;
                  }
                  
                  .header,
                  .body-content,
                  .footer {
                     padding: 20px;
                  }
                  
                  .benefit-item {
                     flex-direction: column;
                     text-align: center;
                  }
                  
                  .benefit-icon {
                     margin-right: 0;
                     margin-bottom: 10px;
                  }
               }
         </style>
      </head>

      <body>
         <div class="container">
               <div class="header">
                  <div class="brand">Forever</div>
                  <div class="welcome-message">Welcome to our exclusive community!</div>
               </div>
               
               <div class="body-content">
                  <h2>Hello ${name ? name : 'Valued Customer'},</h2>
                  
                  <p>Thank you for subscribing to the <strong>Forever Newsletter</strong>! 🎉</p>
                  
                  <p>You've just joined thousands of fashion enthusiasts who stay ahead of the latest trends, 
                  exclusive deals, and insider updates delivered straight to their inbox.</p>
                  
                  <div class="discount-section">
                     <div class="discount-title">Your Welcome Gift</div>
                     <p>As promised, here's your exclusive 20% discount code:</p>
                     <div class="discount-code">WELCOME20</div>
                     <p><small>Valid for your first purchase. Expires in 30 days.</small></p>
                  </div>
                  
                  <a href="#" class="cta-button">SHOP NOW & SAVE 20%</a>
                  
                  <div class="benefits-section">
                     <h3 style="text-align: center; margin-bottom: 30px;">What to Expect:</h3>
                     
                     <div class="benefit-item">
                           <div class="benefit-icon">✨</div>
                           <div class="benefit-text">
                              <div class="benefit-title">Latest Collections</div>
                              <div class="benefit-desc">Be the first to discover our newest arrivals and trending styles</div>
                           </div>
                     </div>
                     
                     <div class="benefit-item">
                           <div class="benefit-icon">🎯</div>
                           <div class="benefit-text">
                              <div class="benefit-title">Exclusive Offers</div>
                              <div class="benefit-desc">Subscriber-only discounts and flash sales you won't find anywhere else</div>
                           </div>
                     </div>
                     
                     <div class="benefit-item">
                           <div class="benefit-icon">📰</div>
                           <div class="benefit-text">
                              <div class="benefit-title">Style Updates</div>
                              <div class="benefit-desc">Fashion tips, styling guides, and seasonal trend reports</div>
                           </div>
                     </div>
                     
                     <div class="benefit-item">
                           <div class="benefit-icon">🎁</div>
                           <div class="benefit-text">
                              <div class="benefit-title">Special Events</div>
                              <div class="benefit-desc">VIP access to sales, new launches, and exclusive member events</div>
                           </div>
                     </div>
                  </div>
                  
                  <p>We promise to keep our emails valuable, relevant, and never spam your inbox. 
                  You can unsubscribe at any time if you change your mind.</p>
               </div>
               
               <div class="footer">
                  <div class="social-links">
                     <a href="#">f</a>
                     <a href="#">t</a>
                     <a href="#">i</a>
                  </div>
                  
                  <p>This email was sent to <span class="highlight">${email}</span></p>
                  <p>© 2025 Forever. All rights reserved.</p>
                  <p>
                     <a href="#" style="color: #666;">Unsubscribe</a> | 
                     <a href="#" style="color: #666;">Update Preferences</a> | 
                     <a href="#" style="color: #666;">Contact Us</a>
                  </p>
                  <p><small>Forever Fashion Store, 123 Style Street, Fashion District, NY 10001</small></p>
               </div>
         </div>
      </body>

      </html>`;
};
