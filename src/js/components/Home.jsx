import React from "react";

import AudioPlayer from "./audioplayerComponent/AudioPlayer";

//create your first component
const Home = () => {
	return (
		<div style={{minHeight:"100vh"}} className="bg-black text-center d-flex justify-content-center align-items-center">
			<AudioPlayer/>
		</div>
	);
};

export default Home;