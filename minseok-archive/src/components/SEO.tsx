interface SEOProps {
  title?: string;
  description?: string;
}

const SEO = ({ title, description }: SEOProps) => {
  const defaultTitle = "Minseok Archive | Digital Atelier";
  const defaultDescription = "최민석의 인터랙티브 웹 포트폴리오입니다.";

  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {/* <meta property="og:image" content="미리보기_이미지_URL" /> */}
    </>
  );
};

export default SEO;
