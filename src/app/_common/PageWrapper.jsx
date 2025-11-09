import Box from "@mui/material/Box";

const PageWrapper = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: "100vh",
			width: "100vw",
			overflow: "auto",
      		textAlign: "center",
		}}
	>
		{children}
	</Box>
);

export default PageWrapper;
