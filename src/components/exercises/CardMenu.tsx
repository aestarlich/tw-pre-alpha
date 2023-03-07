import { FC, ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import Menu from '@mui/material/Menu';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FavoriteBorderOutlined, PlaylistAddOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface Props {
  cardId?: string,
  ref: ForwardedRef<any>;
}

export const CardMenu: FC<Props> = forwardRef(({ cardId  }, ref) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const { push } = useRouter();

  useImperativeHandle(
    ref,
    () => ({
      handleContextMenu(e: React.MouseEvent) {
        setContextMenu(
          contextMenu === null
            ? {
              mouseX: e.clientX + 2,
              mouseY: e.clientY - 6
            } : null,
        );
      }
    }));

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <Box>

        <List>
          {/* <ListItem button>
            <ListItemIcon>
              <PlaylistAddOutlined />
            </ListItemIcon>
            <ListItemText primary={'Add to routine...'} />
          </ListItem> */}

          {/* <ListItem
            button
          >
            <ListItemIcon>
              <FavoriteBorderOutlined />
            </ListItemIcon>
            <ListItemText primary={'Add to Favourites'} />
          </ListItem> */}
          {/* <Divider sx={{ m: 2 }} /> */}
          <ListItem
            button
            onClick={() => push(`/exercises/${cardId}`)}
          >
            <ListItemIcon>
              <VisibilityOutlined />
            </ListItemIcon>
            <ListItemText primary={'See details'} />
          </ListItem>
        </List>
      </Box>
    </Menu>
  );
});


CardMenu.displayName = 'Card Menu';