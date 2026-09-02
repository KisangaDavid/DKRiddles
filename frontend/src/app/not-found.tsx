'use client';

import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TopBar from './_common/TopBar';
import { HOME_SLUG, standardTextFade } from './_common/constants';
import Fade from '@mui/material/Fade';
import Link from 'next/link';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <TopBar text="Page Not Found" isPuzzlePage={false} resetFunc={undefined} />

      <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: '2vh',
            mb: '8vh',
          }}
        >
          <Card
            sx={{
              width: 'var(--pageWidthPercent)',
              maxWidth: 620,
              background: 'hsla(220, 35%, 3%, 0.4)',
              border: '1px solid hsla(0, 0%, 23%, 0.60)',
              boxShadow:
                'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
            }}
          >
              <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Oops! You seem to have lost your way while exploring.
                </Typography>

                <Link
                    href={HOME_SLUG}
                >
                  Click here to return home
                </Link>
              </CardContent>
          </Card>
        </Box>
      </Fade>
    </>
  );
}
