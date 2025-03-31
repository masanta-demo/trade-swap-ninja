
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-aqua flex items-center justify-center">
            <span className="text-white font-bold">TS</span>
          </div>
          <span className="text-xl font-bold gradient-text">TradeSwap</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-crypto-purple transition-colors">
            Home
          </Link>
          <Link to="/markets" className="font-medium hover:text-crypto-purple transition-colors">
            Markets
          </Link>
          <Link to="/swap" className="font-medium hover:text-crypto-purple transition-colors">
            Swap
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-purple/50 w-40 transition-all duration-300 focus:w-60"
            />
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" onClick={openLoginModal} className="text-crypto-purple border-crypto-purple hover:bg-crypto-purple/5">
            Login
          </Button>
          <Button onClick={openSignupModal} className="bg-crypto-purple hover:bg-crypto-light-purple text-white">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 absolute top-16 left-0 right-0 shadow-md z-50">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2 hover:text-crypto-purple" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/markets" className="font-medium py-2 hover:text-crypto-purple" onClick={() => setIsMenuOpen(false)}>
              Markets
            </Link>
            <Link to="/swap" className="font-medium py-2 hover:text-crypto-purple" onClick={() => setIsMenuOpen(false)}>
              Swap
            </Link>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-purple/50 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={openLoginModal} className="w-full justify-center">
                Login
              </Button>
              <Button onClick={openSignupModal} className="w-full justify-center">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </nav>
  );
};

export default Navbar;
