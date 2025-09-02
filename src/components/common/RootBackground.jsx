import Box from "@mui/material/Box";

const RootBackground = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: "100vh",
			width: "100vw",
			overflow: "auto",
			backgroundImage:
				"radial-gradient(ellipse 80% 50% at 50% -15%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
		}}
	>
		{children}
	</Box>
);

export default RootBackground;
