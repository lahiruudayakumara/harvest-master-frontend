import { Helmet } from "react-helmet";
import HomeUpperPart from "src/components/home/homeUpperPart";
import HomeMiddlePart from "src/components/home/homeMiddlePart";

import { NavBar } from "src/components/nav-bar";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home: Harvest Mater</title>
      </Helmet>
      
      
      <HomeUpperPart />
      <HomeMiddlePart />
      
    </>
  );
}
