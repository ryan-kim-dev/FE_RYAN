interface IconButtonProps {
  icon: React.ReactNode;
}

const IconButton = ({ icon }: IconButtonProps) => {
  return <button>{icon}</button>;
};

export default IconButton;
