import Box from "@mui/material/Box";

const PageWrapper = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: "100vh",
			width: "90em",
			maxWidth: "90vw",
			pb: "2vh",
      		textAlign: "center",
		}}
	>
		{children}
	</Box>
);

export default PageWrapper;
