import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Welcome To ShopIt",
  description: "We sell the most valuable products",
  keywords: "electronics, buy electronics, quality electronics",
};

export default Meta;
