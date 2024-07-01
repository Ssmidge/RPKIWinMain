'use client';

import { ScrollArea } from '@mantine/core';

import { SessionContextValue } from 'next-auth/react';
import { UserButton } from '@/components/UserButton';
import classes from './Navbar.module.css';
import { NavLinksGroup } from './NavLinksGroup';
import { NavItem } from '@/types/navItem';

interface Props {
    data: NavItem[];
    hidden?: boolean;
    session: SessionContextValue<any>;
}

export function Navbar({ data, session }: Props) {
    const links = data.map(item => <NavLinksGroup key={item.label} {...item} />);

    return (
        <>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton
                image={String(session?.data?.user?.image || '/assets/img/avatar.png')}
                name={String(session?.data?.user?.name)}
                email={String(session?.data?.user?.email)}
                />
            </div>
        </>
    );
}
