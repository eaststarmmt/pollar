export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          flex: '1 1 auto',
          textAlign: 'center',
          maxWidth: 'unset !important',
          minWidth: 'unset !important',
          minHeight: 'unset !important',
          fontSize: theme.typography.h2,
          fontWeight: theme.typography.fontWeightBold,
          textTransform: 'none',
          lineHeight: 'inherit',
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadiusMd,
          // borderRadius: theme.borders.flexDirectionborderRadius.lg,
          color: `${theme.palette.primary.dark} !important`,
          opacity: '1 !important',

          '& .material-icons, .material-icons-round': {
            marginBottom: '0 !important',
            marginRight: theme.spacing(6),
          },

          '& svg': {
            marginBottom: '0 !important',
            marginRight: theme.spacing(6),
          },

          '& i.MuiTab-iconWrapper': {
            marginBottom: 0,
          },
        },

        labelIcon: {
          paddingTop: theme.spacing(4),
        },
      },
    },
  };
}
