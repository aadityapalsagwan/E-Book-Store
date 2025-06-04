import { logoutUser } from '../auth';
import { useNavigate } from 'react-router-dom';
import HeroSection from './Hero';
import Books from './Books';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';


export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <>
          <Helmet>
        <title>E-Book Store | Buy Online Books</title>
        <meta
          name="description"
          content={`Purchase " securely online. Add to cart now and get instant access to your favorite ebook.`}
        />
        <meta
          name="keywords"
          content={` ebook, online book purchase, digital ebook store`}
        />
              <meta name="google-site-verification" content="googlee69265a6530ed2e3" />

      </Helmet>
    <HeroSection/>
    <Books/>
    <Footer/>
    </>
  );
}
