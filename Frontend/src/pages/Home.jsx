import React from "react";
import Hero from "../components/endUser/Hero";
import LatestCollection from "../components/endUser/LatestCollection";
import BestSeller from "../components/endUser/BestSeller";
import OurPolicy from "../components/endUser/OurPolicy";
import NewsLetterBox from "../components/endUser/NewsLetterBox";

function Home() {
	return (
		<div>
			<Hero />
			<LatestCollection />
			<BestSeller />
			<OurPolicy />
			<NewsLetterBox />
		</div>
	);
}

export default Home;
