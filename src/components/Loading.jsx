export default function Loading() {
	const loaders = [AcrobaticLoader, ScateboardLoader, BouncingLoading];
	const random_loader = Math.floor(Math.random() * loaders.length + 0); // random from 0 to length of loaders
	const Loader = loaders[random_loader];
	return <Loader />;
}

function AcrobaticLoader() {
	return (
		<div id="loading-wrapper">
			<main>
				<svg
					className="ap"
					viewBox="0 0 128 256"
					width="128px"
					height="256px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="ap-grad1"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="0%" stopColor="hsl(223,90%,55%)" />
							<stop offset="100%" stopColor="hsl(253,90%,55%)" />
						</linearGradient>
						<linearGradient
							id="ap-grad2"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="0%" stopColor="hsl(193,90%,55%)" />
							<stop offset="50%" stopColor="hsl(223,90%,55%)" />
							<stop offset="100%" stopColor="hsl(253,90%,55%)" />
						</linearGradient>
					</defs>
					<circle
						className="ap__ring"
						r="56"
						cx="64"
						cy="192"
						fill="none"
						stroke="#ddd"
						strokeWidth="16"
						strokeLinecap="round"
					/>
					<circle
						className="ap__worm1"
						r="56"
						cx="64"
						cy="192"
						fill="none"
						stroke="url(#ap-grad1)"
						strokeWidth="16"
						strokeLinecap="round"
						strokeDasharray="87.96 263.89"
					/>
					<path
						className="ap__worm2"
						d="M120,192A56,56,0,0,1,8,192C8,161.07,16,8,64,8S120,161.07,120,192Z"
						fill="none"
						stroke="url(#ap-grad2)"
						strokeWidth="16"
						strokeLinecap="round"
						strokeDasharray="87.96 494"
					/>
				</svg>
			</main>
		</div>
	);
}
function ScateboardLoader() {
	return (
		<div className="loading-wrapper-scateboard">
			<main>
				<svg
					className="pl"
					viewBox="0 0 176 160"
					width="176px"
					height="160px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="pl-grad"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="0%" stopColor="hsl(33,90%,55%)" />
							<stop offset="30%" stopColor="hsl(33,90%,55%)" />
							<stop offset="100%" stopColor="hsl(3,90%,55%)" />
						</linearGradient>
					</defs>
					<g fill="none" strokeWidth="16" strokeLinecap="round">
						<circle
							className="pl__ring"
							r="56"
							cx="88"
							cy="96"
							stroke="hsla(0,10%,10%,0.1)"
						/>
						<path
							className="pl__worm1"
							d="M144,96A56,56,0,0,1,32,96"
							stroke="url(#pl-grad)"
							strokeDasharray="43.98 307.87"
						/>
						<path
							className="pl__worm2"
							d="M32,136V96s-.275-25.725,14-40"
							stroke="hsl(33,90%,55%)"
							strokeDasharray="0 40 0 44"
							strokeDashoffset="0.001"
							visibility="hidden"
						/>
						<path
							className="pl__worm3"
							d="M144,136V96s.275-25.725-14-40"
							stroke="hsl(33,90%,55%)"
							strokeDasharray="0 40 0 44"
							strokeDashoffset="0.001"
							visibility="hidden"
						/>
					</g>
				</svg>
			</main>
		</div>
	);
}
function BouncingLoading() {
	return (
		<div className="loading-wrapper-bouncing">
			<svg
				className="pl"
				viewBox="0 0 128 128"
				width="128px"
				height="128px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="hsl(193,90%,55%)" />
						<stop offset="100%" stopColor="hsl(223,90%,55%)" />
					</linearGradient>
				</defs>
				<circle
					className="pl__ring"
					r="56"
					cx="64"
					cy="64"
					fill="none"
					stroke="hsla(0,10%,10%,0.1)"
					strokeWidth="16"
					strokeLinecap="round"
				/>
				<path
					className="pl__worm"
					d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
					fill="none"
					stroke="url(#pl-grad)"
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeDasharray="44 1111"
					strokeDashoffset="10"
				/>
			</svg>
		</div>
	);
}
