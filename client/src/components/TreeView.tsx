import React from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { treeItems } from './TreeViewData';

export default function CustomTreeView() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={['1']}
      getItemId={(item) => item.itemId}
    >
      {treeItems.map((item) => (
        <TreeItem 
          key={item.itemId}
          nodeId={item.itemId}
          label={item.label}
        />
      ))}
    </TreeView>
  );
}
