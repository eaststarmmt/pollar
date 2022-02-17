import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'About',
  //   path: '/about',
  //   icon: getIcon(pieChart2Fill),
  // },
  {
    title: 'Trending',
    path: '/trending',
    icon: getIcon(peopleFill),
  },
  {
    title: 'Polls',
    path: '/polls',
    icon: getIcon(shoppingBagFill),
  },
  {
    title: 'Members',
    path: '/users/all',
    icon: getIcon(shoppingBagFill),
  },
];

export default sidebarConfig;
