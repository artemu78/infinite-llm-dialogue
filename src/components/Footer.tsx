
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-4">
          <Link
            to="/privacy"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
