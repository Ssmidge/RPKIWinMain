import { IconProps } from '@tabler/icons-react';

export interface NavItem {
    label: string;
    icon: (props: IconProps) => JSX.Element | any;
    link?: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}
