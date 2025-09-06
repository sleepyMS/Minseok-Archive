const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="absolute top-0 left-0 m-3 p-3 bg-secondary text-primary transform -translate-y-20 focus:translate-y-0 transition-transform duration-300 z-[9999]"
    >
      본문으로 바로가기
    </a>
  );
};

export default SkipToContent;
