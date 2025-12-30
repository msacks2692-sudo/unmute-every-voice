import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Unmute1</title>
        <meta name="description" content="Read the terms and conditions for using Unmute1's accessibility platform." />
      </Helmet>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 30, 2024</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Unmute1's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users, including those with disabilities who rely on our accessibility features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unmute1 provides an AI-powered accessibility platform designed to help individuals with speech and communication challenges. Our services include voice synthesis, communication assistance, and various accessibility tools. We strive to make technology accessible to everyone.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must notify us immediately of any unauthorized access</li>
                  <li>Accounts may be created by caregivers or guardians on behalf of users who need assistance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the service for any unlawful purpose</li>
                  <li>Impersonate others or misrepresent your identity</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the AI voice features to deceive or defraud others</li>
                  <li>Violate the rights of other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of Unmute1 are owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our content without explicit permission. However, we encourage sharing information about accessibility resources.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of any content you create or upload. By using our services, you grant us a license to use, store, and process your content to provide and improve our accessibility services. We handle voice data and personal communications with the utmost care and confidentiality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Accessibility Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to making our platform accessible to all users. We continuously work to improve accessibility features and welcome feedback from users with disabilities. If you encounter any accessibility barriers, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are provided "as is" without warranties of any kind. While we strive to provide reliable accessibility tools, we cannot guarantee uninterrupted or error-free service. We recommend users have backup communication methods available when needed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Unmute1 shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. This includes any communication failures or accessibility issues beyond our reasonable control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Modifications to Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or discontinue any part of our service at any time. We will provide reasonable notice of significant changes, especially those affecting accessibility features that users depend on.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account for violations of these terms. Upon termination, your right to use the service ceases immediately. We will provide data export options to ensure you don't lose important communication data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through good-faith negotiation, with accessibility accommodations provided as needed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:legal@unmute1.com" className="text-primary hover:underline">
                    legal@unmute1.com
                  </a>
                  . We are committed to responding in accessible formats upon request.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
