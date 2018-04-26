import React from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

const PLACES = [
    'Achara',
    'Boonsri',
    'Busarakhan',
    'Chai',
    'Decha',
    'Kannika',
    'Kohsoom',
    'Sakda',
    'Somchair',
    'Tansanee'
];

const Side = ({ record, onChange }) => (
    <Tree checkable onSelect={() => {}} onCheck={() => {}}>
        <TreeNode title="Places" key="Places">
            {PLACES.map(p => <TreeNode title={p} key={p} />)}
        </TreeNode>
    </Tree>
);

export default Side;
