'use client';

import { Autocomplete, Button, Center, Checkbox, Container, Group, Paper, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prismaClient';

export default function CreateROA() {
  const session = useSession();
  // const userDB = prisma.user.findFirst({ where: { email: String(session?.data?.user?.email) } });

  const [creationError, setCreationError] = useState('');
  const [isIPv6, setIsIPv6] = useState(true);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      asn: '',
      ipv6: false,
      IPv4Prefix: '',
      IPv6Prefix: '',
    },

    validate: {
      asn: (value) => (/^(?!(0|23456|6449[6-9]|6450[0-9]|6451[0-1]|65535|6553[6-9]|6554[0-9]|6555[0-1]|4294967295)$)\d{1,10}$/.test(value) ? null : 'Invalid ASN'),
      IPv4Prefix: (value) => (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(value) ? null : 'Invalid prefix'),
    },
  });

  useEffect(() => {
    if (form.getValues().ipv6) {
      form.setFieldValue('IPv4Prefix', '');
    } else {
      form.setFieldValue('IPv6Prefix', '');
    }
  }, [form.getValues().ipv6]);

  return (
    <>
      <Container size="sm" mt="10rem">
        <Center>
          <Paper shadow="xs" radius="md" withBorder p="30px" style={{ width: '100%' }}>
            <form onSubmit={form.onSubmit(async (values: any) => { console.log(values); })}>
              <Autocomplete
                label="ASN"
                placeholder="65535"
                data={['65535', '65534', '65533', '65532', '65531']}
                mt="xs"
                key={form.key('asn')}
                {...form.getInputProps('asn')}
              />

              {
                form.getValues().ipv6 ?
                  <TextInput
                    label="IPv6 Prefix"
                    placeholder="2001:db8::/32"
                    mt="md"
                    key={form.key('IPv6Prefix')}
                    {...form.getInputProps('IPv6Prefix')}
                  />
                :
                  <TextInput
                    label="IPv4 Prefix"
                    placeholder="1.1.1.0/24"
                    mt="md"
                    key={form.key('IPv4Prefix')}
                    {...form.getInputProps('IPv4Prefix')}
                  />
              }

              <Checkbox
                defaultChecked
                color="violet"
                label="IPv6"
                description="IPv4 or IPv6"
                radius="lg"
                mt="md"
                key={form.key('ipv6')}
                {...form.getInputProps('ipv6', {
                  type: 'checkbox',
                })} />
                <Group justify="center" mt="md">
                  {
                    creationError ?
                      <p style={{ color: 'red' }}>{creationError}</p>
                    : null
                  }
                  <Button type="submit" style={{ width: '100%' }} radius="md" size="md">Submit</Button>
                </Group>
            </form>
          </Paper>
        </Center>
      </Container>
    </>
  );
}
