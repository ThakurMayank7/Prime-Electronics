import React from "react";

function TermsAndConditions() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      <hr className="my-6" />
      <h2>Effective Date: 1st of January 2025</h2>
      <hr className="my-6" />

      <p className="mb-6">
        Welcome to Prime Electronics! These Terms and Conditions
        (&quotTerms&quot) govern your use of our website and services. By
        accessing or using our website, you agree to comply with these Terms.
        Please read them carefully.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">1. General Information</h2>
      <p className="mb-4">
        <strong>1.1. About Us:</strong> This website is operated using the
        Next.js framework and leverages Firebase for authentication and data
        storage and Cloudinary for media management.
      </p>
      <p className="mb-6">
        <strong>1.2. Eligibility:</strong> To use our services, you must be at
        least 18 years old or have parental consent if you are a minor.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">
        2. Accounts and Authentication
      </h2>
      <p className="mb-4">
        <strong>2.1. Google Authentication:</strong>
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>We use Google Authentication to log in or create an account.</li>
        <li>
          By signing in with Google, you agree to abide by Google’s Terms of
          Service and Privacy Policy.
        </li>
      </ul>
      <p className="mb-6">
        <strong>2.2. Account Responsibility:</strong>
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </li>
        <li>
          Notify us immediately if you suspect unauthorized use of your account.
        </li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">3. Data Storage and Privacy</h2>
      <p className="mb-4">
        <strong>3.1. Firebase Storage:</strong> Your account details and
        purchase data are securely stored in Firebase. By using our website, you
        consent to Firebase’s Terms of Service and Privacy Policy.
      </p>
      <p className="mb-4">
        <strong>3.2. Cloudinary Media Storage:</strong> Product images and
        user-uploaded media are stored and managed via Cloudinary. By using our
        services, you agree to Cloudinary’s Terms of Service and Privacy Policy.
      </p>
      <p className="mb-6">
        <strong>3.3. Data Privacy:</strong> We collect, store, and process your
        data in accordance with our [Privacy Policy](#). You have the right to
        request access to, correction of, or deletion of your personal data.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">4. Purchases and Payments</h2>
      <p className="mb-4">
        <strong>4.1. Orders:</strong>
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          All orders placed through our website are subject to acceptance and
          availability.
        </li>
        <li>
          We reserve the right to refuse or cancel any order for any reason.
        </li>
      </ul>
      <p className="mb-4">
        <strong>4.2. Payments:</strong> Payments are processed securely using
        third-party payment gateways. We are not responsible for payment
        processing errors or issues arising from third-party services.
      </p>
      <p className="mb-6">
        <strong>4.3. Refunds and Returns:</strong> Refund and return policies
        are detailed on our [Refund Policy Page](#).
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">5. User Conduct</h2>
      <p className="mb-4">You agree not to:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>Use the website for unlawful activities.</li>
        <li>Upload malicious code, viruses, or any harmful software.</li>
        <li>
          Violate the rights of others, including intellectual property rights.
        </li>
      </ul>
      <p className="mb-6">
        We reserve the right to suspend or terminate your account for violating
        these Terms.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
      <p className="mb-6">
        All content, trademarks, logos, and intellectual property on this
        website are owned by Prime Electronics or licensed to us. You may not
        reproduce, distribute, or use any content without our written
        permission.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
      <p className="mb-4">We are not liable for:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Any direct, indirect, or consequential damages arising from the use of
          our website.
        </li>
        <li>Delays, interruptions, or data loss due to technical failures.</li>
      </ul>
      <p className="mb-6">Your use of this website is at your own risk.</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
      <p className="mb-6">
        Our website integrates third-party services such as Firebase,
        Cloudinary, and Google Authentication. We are not responsible for the
        actions or policies of these third-party providers.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">9. Modifications to Terms</h2>
      <p className="mb-6">
        We reserve the right to update or modify these Terms at any time. Any
        changes will be effective immediately upon posting on this page.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
      <p className="mb-6">
        These Terms are governed by and construed in accordance with the laws of
        India. Any disputes will be resolved in the courts of India.
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
      <p className="mb-6">
        For any questions or concerns regarding these Terms, please contact us
        at:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Email:</strong> mayanksingh8181335335@gmail.com
        </li>
        <li>
          <strong>Phone:</strong> can not
        </li>
        <li>
          <strong>Address:</strong> can not
        </li>
      </ul>

      <p className="text-gray-600">
        By using our website, you confirm that you have read, understood, and
        agreed to these Terms and Conditions.
      </p>

      <p className="text-gray-600 font-bold mt-6">
        **Thank you for shopping with us!**
      </p>
    </div>
  );
}

export default TermsAndConditions;
