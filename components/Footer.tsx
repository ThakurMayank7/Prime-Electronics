import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="hover:text-teal-400">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:text-teal-400">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-teal-400">Careers</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-teal-400">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="hover:text-teal-400">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-teal-400">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-teal-400">Returns & Exchanges</Link></li>
              <li><Link href="/contact-us" className="hover:text-teal-400">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates, offers, and discounts!</p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg text-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 4: Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-500">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-500">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-500">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-500">
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Developer Credits */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your E-Commerce Name. All rights reserved. 
            <br />
            Developed with <span role="img" aria-label="love">❤️</span> by 
            <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-500">
              Your Name
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer