import { Helmet } from "react-helmet";
import HomeUpperPart from "src/components/home/homeUpperPart";
import HomeMiddlePart from "src/components/home/homeMiddlePart";
import FooterForHome from "src/components/footer/footerForHome";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home: Harvest Mater</title>
      </Helmet>
      <HomeUpperPart />
      <HomeMiddlePart />
      <FooterForHome />
    </>
  );
}
