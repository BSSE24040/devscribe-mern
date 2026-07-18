import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} DevScribe. Built with the MERN stack.</p>
    </footer>
  );
};

export default Footer;
