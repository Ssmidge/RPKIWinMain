import { Center, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import classes from './Logo.module.css';

interface Props {
  width?: string;
  height?: string;
}

export const Logo: React.FC<Props> = () => (
    <Flex direction="row" align="center" gap={4}>
        <Center>
            <Link href="/" style={{ textDecoration: 'none' }} className={classes.heading}>
                <Text fw="bolder" size="xl" variant="gradient" gradient={{ from: 'grape', to: 'red', deg: 64 }}>
                    RPKI.WIN
                </Text>
            </Link>
        </Center>
    </Flex>
  );
