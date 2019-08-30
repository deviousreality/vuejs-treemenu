// Type definition for Vue-TreeNode 0.1.0
import Vue from 'vue';

export type StyleObject = { [name: string]: boolean | string } | (string | { [name: string]: boolean | string })[];

export interface TreeMenu extends Vue {
    // props
    readonly cssClassLi: StyleObject;
    readonly cssClassLiCondition: (node: TreeNodeDataModel) => StyleObject;
    readonly cssClassUl: StyleObject;
    readonly id: string;
    readonly nodeData: TreeNodeDataModel[];
    // data
    children: TreeNodeDataModel[];
    //methods
    fetchData: () => void;
    keydown: (event: Event) => void;
    navigate: (event: Event, { target, title, url }) => void;
    nodeCollapse: (event: Event, indices: [number]) => void;
    nodeExpand: (event: Event, indices: [number]) => void;
    nodeFocus: (event: Event, indices: [number]) => void;
    nodeMovedown: (event: Event, indices: [number]) => void;
    nodeMoveup: (event: Event, indices: [number]) => void;
    nodeSelect: (event: Event, indices: [number]) => void;
}

export interface TreeNode extends Vue {
    // props
    readonly cssClassLi: StyleObject;
    readonly cssClassLiCondition: (node: TreeNodeDataModel) => StyleObject;
    readonly cssClassUl: StyleObject;
    readonly index: number;
    readonly nodeData: TreeNodeDataModel[];
    readonly tabindex: number;
    // data
    hasLocalFocus: boolean;
    isLocalExpanded: boolean;
    // computed
    // methods
    anchorBlur: (event: Event, index: number) => void;
    anchorClick: (event: MouseEvent, index: number) => void;
    anchorFocus: (event: Event, index: number) => void;
    anchorKeydown: (event: KeyboardEvent, index: number) => void;
    hasChildren: (node: TreeNodeDataModel) => boolean;
    nodeLiClass: (node: TreeNodeDataModel) => {} | [] | string;
    nodeBlur: (event: Event, indices: [number], index: number) => void;
    nodeCollapse: (event: Event, indices: [number], index: number) => void;
    nodeExpand: (event: Event, indices: [number], index: number) => void;
    nodeFocus: (event: Event, indices: [number], index: number) => void;
    nodeMovedown: (event: Event, indices: [number], index: number) => void;
    nodeMoveup: (event: Event, indices: [number], index: number) => void;
    nodeSelect: (event: Event, indices: [number], index: number) => void;
}

export interface TreeNodeAnchor extends Vue {
    // props
    readonly isExpanded: boolean;
    readonly node: TreeNodeDataModel;
    readonly tabindex: number;
    // data
    // computed
    ariaControls: string | null;
    ariaExpanded: string | null;
    ariaPopup: string | null;
    hasChildren: boolean;
    // methods
    handleClick: (event: Event) => void;
    //handleFocus: (event: Event) => void;
    handleKey: (event: Event) => void;
}

export interface TreeNodeDataModel {
    icon: string;
    id: string;
    isExpanded?: boolean;
    landingPageType: number;
    tabindex?: number;
    target: string;
    title: string;
    url: string;
    children: TreeNodeDataModel[];
}
