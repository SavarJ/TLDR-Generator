interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-center p-8 font-mono text-white from-blue-900 to-purple-900 bg-gradient-to-b w-full min-h-screen">
      <div className="flex flex-col space-y-8 max-w-2xl">{children}</div>
    </div>
  );
};

export default MainWrapper;
