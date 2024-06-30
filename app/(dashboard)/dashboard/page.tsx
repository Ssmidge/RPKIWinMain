import { Container, Flex, Grid, GridCol } from '@mantine/core';
import { auth } from '@/auth';
import { ProfileCard } from '@/components/Dashboard/ProfileCard';
import { WelcomeCard } from '@/components/Dashboard/WelcomeCard';

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <Container size="xl">
        <Grid>
          <GridCol span={{ sm: 14, md: 12, lg: 4 }}>
            <ProfileCard {...{ session }} />
          </GridCol>
          <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
            <Flex direction="column" h="100%" justify="space-between" gap="md">
              <WelcomeCard {...{ session }} />
              {/* <StatsGroup data={mockData} /> */}
            </Flex>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
