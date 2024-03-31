import { Helmet } from "react-helmet";

import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home: Harvest Mater</title>
      </Helmet>

      <Footer />
    </>
  );
}
