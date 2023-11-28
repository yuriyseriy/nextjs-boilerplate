import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-neutral-900 py-8">
      <div className="container">
        <div className="flex gap-8">
          <Logo style="light" />
          <div>
            <h3 className="text-white text-lg font-medium mb-4">About</h3>
            <div className="flex flex-col">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-white mb-1">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="text-gray-300 hover:text-white mb-1">
                Terms of Use
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white">
                About Us
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Help</h3>
            <div className="flex flex-col">
              <Link href="/faq" className="text-gray-300 hover:text-white mb-1">
                FAQ
              </Link>
              <Link href="/terms-of-use" className="text-gray-300 hover:text-white">
                Contacts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
