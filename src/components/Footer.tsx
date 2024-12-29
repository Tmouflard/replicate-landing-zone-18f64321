const Footer = () => {
  return (
    <footer className="w-full bg-white/50 py-6 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-600">
          <a
            href="/politique-confidentialite"
            className="hover:text-primary transition-colors"
          >
            Politique de protection des données
          </a>
          <span className="hidden md:inline">•</span>
          <a
            href="/mentions-legales"
            className="hover:text-primary transition-colors"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;