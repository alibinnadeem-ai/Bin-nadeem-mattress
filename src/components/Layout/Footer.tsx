import React from 'react';

/**
 * FOOTER COMPONENT
 * Trust Signals | Contact Info | Quick Links
 */

const Footer: React.FC = () => {
  return (
    <footer className="bg-master-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-master-navy font-bold text-xl">
                BN
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">BIN NADEEM</span>
                <span className="text-xs text-master-gold tracking-widest font-semibold">MATTRESS HOUSE</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bin Nadeem Mattress House - Your trusted partner for quality sleep.
              Bringing 10 years of sleep science to your bedroom.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI'].map((social) => (
                <div key={social} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-master-gold hover:text-master-navy transition cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* SHOP COLUMN */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-master-gold">Shop</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/shop" className="hover:text-white transition">All Mattresses</a></li>
              <li><a href="/shop?type=memory-foam" className="hover:text-white transition">Memory Foam</a></li>
              <li><a href="/shop?type=ortho" className="hover:text-white transition">Orthopedic</a></li>
              <li><a href="/shop?type=hybrid" className="hover:text-white transition">Hybrid Elite</a></li>
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-master-gold">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/mattress-finder" className="hover:text-white transition">Sleep Quiz</a></li>
              <li><a href="/warranty" className="hover:text-white transition">Warranty Claim</a></li>
              <li><a href="/returns" className="hover:text-white transition">Returns Policy</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-master-gold">Contact</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-master-gold">📍</span>
                <span>Bin Nadeem Tower,<br />Next to Audi building,<br />Golra moor road, Islamabad</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-master-gold">📞</span>
                <span>+92 300 8540914</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-master-gold">✉️</span>
                <span>support@binnadeem.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bin Nadeem Mattress House. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
