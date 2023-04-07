import Header from './Header';
import Footer from './Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default RootLayout;
