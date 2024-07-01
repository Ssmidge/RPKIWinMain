'use client';

import { Card, Title } from '@mantine/core';
import classes from '../Dashboard.module.css';

export function ChangeHistory() {
 return (
  <Card radius="md">
   <Card.Section className={classes.section}>
    <Title order={5}>Latest Block</Title>
   </Card.Section>
   <Card.Section className={classes.section}>
   </Card.Section>
  </Card>
 );
}
