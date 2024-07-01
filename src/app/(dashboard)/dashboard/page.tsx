import { Flex, Grid, GridCol } from '@mantine/core';
import { auth } from '@/auth';
import { ProfileCard } from '@/components/Dashboard/ProfileCard';
import { WelcomeCard } from '@/components/Dashboard/WelcomeCard';
import { PageContainer } from '@/components/PageContainer';
import { ChangeHistory } from '@/components/Dashboard/ChangeHistory/ChangeHistory';

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <PageContainer title="Dashboard">
        <Grid>
          <GridCol span={{ sm: 14, md: 12, lg: 4 }}>
            <ProfileCard {...{ session }} />
          </GridCol>
          <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
            <Flex direction="column" h="100%" justify="space-between" gap="md">
              <WelcomeCard {...{ session }} />
            </Flex>
          </GridCol>
          <GridCol span={12}>
            <ChangeHistory />
          </GridCol>
        </Grid>
      </PageContainer>
    </>
  );
}
