import TreeNodeAnchor from './tree-node-anchor.vue';
import { TreeNodeDataModel, TreeNode, StyleObject } from 'index';
// import { keyCodeToKey } from '@/utils/keyInputHelper';

export default {
    name: 'node',
    inject: {
        currentAnchor: {
            from: 'anchor',
            default: TreeNodeAnchor
        }
    },
    props: {
        cssClassLi: {},
        cssClassLiCondition: {
            type: Function,
            default(): StyleObject | null {
                return null;
            }
        },
        cssClassUl: {},
        index: {
            type: Number,
            default: 0,
        },
        nodeData: {
            type: Array
        },
    },
    methods: {
        anchorBlur(this: TreeNode, event: Event, index: number): void {
            this.$emit('node-blur', event, [index]);
        },
        anchorClick(this: TreeNode, event: Event, index: number): void {
            this.$emit('node-select', event, [index]);
        },
        anchorFocus(this: TreeNode, event: Event, index: number): void {
            this.$emit('node-focus', event, [index]);
        },
        anchorKeydown(this: TreeNode, event: KeyboardEvent, index: number): void {
            const keyCode = keyCodeToKey(event);
            const keyCodeMethods = {
                ArrowDown: (): TreeNode => this.$emit('node-movedown', event, [index]),
                ArrowUp: (): TreeNode => this.$emit('node-moveup', event, [index]),
                ArrowLeft: (): TreeNode => this.$emit('node-collapse', event, [index]),
                ArrowRight: (): TreeNode => this.$emit('node-expand', event, [index]),
            };
            const handler = keyCodeMethods[keyCode];
            if (handler) {
                handler.call(this);
                event.preventDefault();
            }
            this.$emit('keydown', event);
        },
        hasChildren(this: TreeNode, node: TreeNodeDataModel): boolean {
            return Boolean(node.hasOwnProperty('children') && node.children.length > 0);
        },
        nodeLiClass(this: TreeNode, node: TreeNodeDataModel): {} | [] | string {
            return [
                this.cssClassLi,
                this.cssClassLiCondition(node)
            ];
        },
        nodeBlur(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-blur', event, [index, ...indices]);
        },
        nodeCollapse(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-collapse', event, [index, ...indices]);
        },
        nodeExpand(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-expand', event, [index, ...indices]);
        },
        nodeFocus(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-focus', event, [index, ...indices]);
        },
        nodeMovedown(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-movedown', event, [index, ...indices]);
        },
        nodeMoveup(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-moveup', event, [index, ...indices]);
        },
        nodeSelect(this: TreeNode, event: Event, indices: [number], index: number): void {
            this.$emit('node-select', event, [index, ...indices]);
        },
        ulIdAttr(this: TreeNode, node: TreeNodeDataModel): string {
            return `${node.id}-child`;
        },
        ulAriaLabeledby(this: TreeNode, node: TreeNodeDataModel): string {
            return `${node.id}`;
        },
    },
}

function keyCodeToKey(event: KeyboardEvent) {
    if (event.keyCode !== undefined || event.keyCode !== null) {
        switch (event.keyCode) {
            case 9:
                return `Tab`;
            case 13:
                return `Enter`;
            case 27:
                return `Escape`;
            case 32:
                return ` `;
            case 33:
                return `PageUp`;
            case 34:
                return `PageDown`;
            case 35:
                return `End`;
            case 36:
                return `Home`;
            case 37:
                return `ArrowLeft`;
            case 38:
                return `ArrowUp`;
            case 39:
                return `ArrowRight`;
            case 40:
                return `ArrowDown`;
            default:
                return event.key;
        }
    } else {
        return event.key;
    }
}