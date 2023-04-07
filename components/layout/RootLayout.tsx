import Header from './Header';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Header></Header>
    </>
  );
};

export default RootLayout;
