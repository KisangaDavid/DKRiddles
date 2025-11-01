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
      textAlign: "center",
			backgroundImage:
				"radial-gradient(ellipse 80% 50% at 50% -5%, hsla(210, 98%, 19%, 1.00), hsla(213, 38%, 6%, 1.00))",
		}}
	>
		{children}
	</Box>
);

export default RootBackground;
