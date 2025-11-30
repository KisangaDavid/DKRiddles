import Box from "@mui/material/Box";

const PageWrapper = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			minHeight: "100vh",
			flexDirection: "column",
			alignItems: "center",
			width: "90em",
			maxWidth: "90vw",
			pb: {xs: "10em", sm: "2em"},
      		textAlign: "center",
		}}
	>
		{children}
	</Box>
);

export default PageWrapper;
