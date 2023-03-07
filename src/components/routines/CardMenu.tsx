import { FC, ForwardedRef, forwardRef, useContext, useImperativeHandle, useState } from 'react';
import Menu from '@mui/material/Menu';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { BoltOutlined, CreateOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { IRoutine } from '../../../interfaces';
import { UiContext } from '../../../context';

interface Props {
  item: IRoutine,
  ref: ForwardedRef<any>;
  deleteItemDialog: (open: boolean) => void;
}

export const CardMenu: FC<Props> = forwardRef(({ item, deleteItemDialog  }, ref) => {
  const { push } = useRouter();
  const { handleAlertMessage } = useContext(UiContext);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);


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

  const openItem = () => {
    if(item.routine.length <= 0) {
      handleAlertMessage({ alertMessage: "You need add exercises to the routine.", displayAlert: true, severity: "error" });
      return;
    }
    push(`/workout/${item._id}`);
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
          <ListItem 
            button
            onClick={openItem}
          >
            <ListItemIcon>
              <BoltOutlined />
            </ListItemIcon>
            <ListItemText primary={'Start routine'} />
          </ListItem>

          <ListItem
            button
            onClick={() => push(`/routines/${item._id}`)}
          >
            <ListItemIcon>
              <CreateOutlined />
            </ListItemIcon>
            <ListItemText primary={'Edit Routine'} />
          </ListItem>
          <Divider sx={{ m: 2 }} />
          <ListItem
            button
            onClick={() => {handleClose(); deleteItemDialog(true);}}
          >
            <ListItemIcon>
              <DeleteOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary={'Delete Routine'} />
          </ListItem>
        </List>
      </Box>
    </Menu>
  );
});

CardMenu.displayName = 'Card Menu';
