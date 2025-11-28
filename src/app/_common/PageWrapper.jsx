import Box from "@mui/material/Box";

const PageWrapper = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: "90em",
			maxWidth: "90vw",
			pb: "2vh",
			mb: {xs: "10em", sm: "0em"},
      		textAlign: "center",
		}}
	>
		{children}
	</Box>
);

export default PageWrapper;
