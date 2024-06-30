/* eslint-disable max-len */

'use client';

import { Autocomplete, Button, Center, Container, Group, Paper, Switch, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import isCidr from 'is-cidr';
import cidrTools from 'cidr-tools';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import prisma from '@/lib/prismaClient';

const roaSchema = z.object({
  IPv4Prefix: z.custom<{ arg: string }>((data) => {
    if (!data) return false;
    return isValidCIDR4(data);
  }).optional().nullable().or(z.literal('')),
  IPv6Prefix: z.custom<{ arg: string }>((data) => {
    if (!data) return false;
    return false;
  }).optional().nullable().or(z.literal('')),
  asn: z.string().min(1).regex(/^(?!(0|23456|6449[6-9]|6450[0-9]|6451[0-1]|65535|6553[6-9]|6554[0-9]|6555[0-1]|4294967295)$)\d{1,10}$/),
});

function isValidCIDR4(cidr: string): boolean {
  // Check if it's a valid IPv4 CIDR notation
  if (!isCidr.v4(cidr)) return false;

  // Extract prefix and subnet from CIDR notation
  const [prefix, subnetStr] = cidr.split('/');
  const subnet = parseInt(subnetStr, 10);

  // Ensure subnet is within valid range (adjust as necessary)
  if (subnet < 0 || subnet > 32) return false;

  // Convert CIDR subnet to netmask format
  const cidrToNetmask = (bits: number): string => {
    if (bits === 0) return '0.0.0.0';

    const fullOctets = Math.floor(bits / 8);
    const remainderBits = bits % 8;
    const octets = [];

    for (let i = 0; i < fullOctets; i++) {
      octets.push(255);
    }

    if (remainderBits > 0) {
      octets.push(256 - Math.pow(2, 8 - remainderBits));
    }

    while (octets.length < 4) {
      octets.push(0);
    }

    return octets.join('.');
  };

  // Calculate netmask from the subnet
  const calculatedNetmask = cidrToNetmask(subnet);

  // Split prefix into octets
  const prefixOctets = prefix.split('.').map(Number);

  // Split calculated netmask into octets
  const netmaskOctets = calculatedNetmask.split('.').map(Number);

  // Check if the network portion (defined by the subnet) matches the prefix
  for (let i = 0; i < 4; i++) {
    if ((prefixOctets[i] & netmaskOctets[i]) !== prefixOctets[i]) {
      return false;
    }
  }

  return true;
}

export default function CreateROA() {
  const session = useSession();
  // const userDB = prisma.user.findFirst({ where: { email: String(session?.data?.user?.email) } });

  const [creationError, setCreationError] = useState('');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      asn: '',
      ipv6: true,
      IPv4Prefix: '',
      IPv6Prefix: '',
    },

    validate: zodResolver(roaSchema),
  });

  // useEffect(() => {
  //   if (form.getValues().ipv6) {
  //     form.setFieldValue('IPv4Prefix', '');
  //   } else {
  //     form.setFieldValue('IPv6Prefix', '');
  //   }
  // }, [form.getValues().ipv6]);

  function submitForm(values: any) {
    if (creationError) setCreationError('');

    if (values.IPv6Prefix && values.IPv4Prefix) {
      setCreationError('You can only create a ROA for either IPv4 or IPv6, not both.');
    }

    if (!values.IPv6Prefix && !values.IPv4Prefix) {
      setCreationError('You must provide either an IPv4 or IPv6 prefix.');
    }
  }

  return (
    <>
      <Container size="sm" mt="10rem">
        <Center>
          <Paper shadow="xs" radius="md" withBorder p="30px" style={{ width: '100%' }}>
            <form onSubmit={form.onSubmit(async (values: any) => { submitForm(values); })}>
              <Autocomplete
                required
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

              <Switch
                defaultChecked
                color="violet"
                label="IPv6"
                description="IPv6 prefix?"
                radius="lg"
                mt="lg"
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
