import { IconCloudComputing, IconDashboard, IconNetwork } from '@tabler/icons-react';
import { NavItem } from '@/types/navItem';

export const navItems: NavItem[] = [
    { label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },

    {
        label: 'ASNs',
        icon: IconNetwork,
        initiallyOpened: true,
        links: [
            {
                label: 'Manage',
                link: '/asns/manage',
            },
            {
                label: 'Add',
                link: '/asns/add',
            },
        ],
    },
    {
        label: 'Subnets',
        icon: IconCloudComputing,
        initiallyOpened: true,
        links: [
            {
                label: 'Manage',
                link: '/subnets/manage',
            },
            {
                label: 'ROAs',
                link: '/rpki/roa/list',
            },
        ],
    },
];
