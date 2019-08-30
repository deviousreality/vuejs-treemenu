import Vue from 'vue';
import TreeNode from './tree-node.vue';
import { TreeMenu, TreeNodeDataModel, StyleObject } from 'index';


export default {
    components: {
        'tree-node': TreeNode,
    },
    props: {
        cssClassLi: {
            type: [String, Array, Object]
        },
        cssClassLiCondition: {
            type: Function,
            default(): StyleObject | null {
                return null;
            }
        },
        cssClassUl: {
            type: [String, Array, Object]
        },
        id: {
            type: String
        },
        nodeData: {
            type: Array
        }
    },
    data(): {} {
        return {
            children: [] as TreeNodeDataModel[],
        }
    },
    methods: {  // PROPS before created?
        fetchData(this: TreeMenu): void {
            const data = this.nodeData.slice();
            addProperty.call(this, data, 'isExpanded', false);
            addProperty.call(this, data, 'tabindex', - 1);
            this.children = data;
        },
        keydown(this: TreeMenu, event: KeyboardEvent): void {
            this.$emit('keydown', event);
        },
        nodeBlur(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep) {
                    child.tabindex = -1;
                }
            });
        },
        nodeCollapse(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            if (indices.length && indices.length === 1) {
                children[indices[0]].tabindex = -1;
                children[0].tabindex = 0;
            } else {
                indices.forEach((index, currentLevel) => {
                    child = children[index];
                    children = child.children || [];
                    if (currentLevel === levelsDeep - 1) {
                        child.tabindex = 0;
                        child.isExpanded = false;
                        updateScroll.call(this, (<Vue>this.$refs.treenode).$el, event.currentTarget);
                    }
                    if (currentLevel === levelsDeep) {
                        child.tabindex = -1;
                    }
                });
            }
        },
        nodeExpand(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep && children.length) {
                    child.tabindex = -1;
                    child.isExpanded = true;
                    children[0].tabindex = 0;
                    updateScroll.call(this, (<Vue>this.$refs.treenode).$el, event.currentTarget);
                }
            });
        },
        nodeFocus(this: TreeMenu, event: Event, indices: [number], isFocus: boolean): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                const siblingChildren = children;
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep) {
                    if (isFocus) {
                        const childChildren = children;
                        childrenResetFocus(childChildren)
                    } else {
                        childrenResetFocus(siblingChildren, [index]);
                    }
                    child.tabindex = 0;
                }
            });
        },
        nodeMovedown(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                const siblingChildren = children;
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep) {
                    const nextIndex = index + 1;
                    if (nextIndex < siblingChildren.length) {
                        childrenCollapse(siblingChildren, [nextIndex]);
                        siblingChildren[nextIndex].tabindex = 0;
                    }
                }
            });
        },
        nodeMoveup(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                const siblingChildren = children;
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep) {
                    const nextIndex = index - 1;
                    if (nextIndex >= 0) {
                        childrenCollapse(siblingChildren, [nextIndex]);
                        siblingChildren[nextIndex].tabindex = 0;
                    }
                }
            });
        },
        nodeSelect(this: TreeMenu, event: Event, indices: [number]): void {
            const levelsDeep = indices.length - 1;
            let children = this.children;
            let child: TreeNodeDataModel;
            indices.forEach((index, currentLevel) => {
                const siblingChildren = children;
                child = children[index];
                children = child.children || [];
                if (currentLevel === levelsDeep) {
                    if (child.children.length > 0) {
                        if (child.isExpanded) {
                            const childChildren = children;
                            // collapse all children
                            childrenCollapse(childChildren);
                        } else {
                            // collapse all siblings
                            childrenCollapse(siblingChildren, [index]);
                        }

                        child.isExpanded = !child.isExpanded;
                        if (child.isExpanded && child.children && child.children.length) {
                            child.tabindex = -1;
                            child.children[0].tabindex = 0;
                        } else {
                            child.tabindex = 0;
                        }
                        updateScroll.call(this, (<Vue>this.$refs.treenode).$el, event.currentTarget);
                    } else {
                        if (child.target) {
                            window.open(child.url, child.target);
                        } else {
                            window.location.href = child.url;
                        }
                    }

                }
            });
        },
    },
    watch: {
        nodeData(this: TreeMenu, newVal: TreeNodeDataModel[]): void {
            this.children = newVal;
        }
    },
    created(this: TreeMenu): void {
        this.fetchData();
    }
}

function addProperty(this: TreeMenu, children: TreeNodeDataModel[], name: string, value: any): void {
    children.forEach((child) => {
        this.$set(child, name, value);
        if (child.children) {
            addProperty.call(this, child.children, name, value);
        }
    });
}

function childCollapse(child: TreeNodeDataModel): void {
    child.isExpanded = false;
    child.tabindex = -1;
    if (child.children && child.children.length) {
        child.children.forEach(n => childCollapse(n));
    }
}

function childrenCollapse(children: TreeNodeDataModel[], ignoreIndices?: [number]): void {
    children.forEach((child, index) => {
        if (!ignoreIndices || ignoreIndices.indexOf(index) === -1) {
            childCollapse(child);
        }
    });
}

function childFocus(child: TreeNodeDataModel): void {
    child.tabindex = -1;
    if (child.children && child.children.length) {
        child.children.forEach(n => childFocus(n));
    }
}

function childrenResetFocus(children: TreeNodeDataModel[], ignoreIndices?: [number]): void {
    children.forEach((child, index) => {
        if (!ignoreIndices || ignoreIndices.indexOf(index) === -1) {
            childFocus(child);
        }
    });
}

function updateScroll(this: TreeMenu, topElement: Element | HTMLElement, targetElement: EventTarget | null): void {
    if (!targetElement) {
        return;
    }
    const top = topElement.getBoundingClientRect().top + (<HTMLElement>targetElement).getBoundingClientRect().top;
    this.$nextTick(function () {
        topElement.scrollTop = top;
    });
}