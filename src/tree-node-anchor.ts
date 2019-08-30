import { TreeNodeAnchor } from 'index';

export default {
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        },
        node: {
            type: Object
        },
        tabindex: {
            type: Number,
            default: -1,
        }
    },
    computed: {
        ariaControls: function (this: TreeNodeAnchor): string | null {
            return this.hasChildren ? `${this.node.id}-child` : null;
        },
        ariaExpanded: function (this: TreeNodeAnchor): string | null {
            return this.hasChildren ? `${this.isExpanded}` : null;
        },
        ariaPopup: function (this: TreeNodeAnchor): string | null {
            return this.hasChildren ? 'true' : null;
        },
        hasChildren: function (this: TreeNodeAnchor): boolean {
            return this.node.children.length > 0;
        },
    },
    watch: {
        tabindex(this: TreeNodeAnchor, tabindex: number): void {
            if (tabindex === 0) {
                (<HTMLElement>this.$refs.anchor).focus();
            }
        }
    },
    methods: {
        handleClick: function (this: TreeNodeAnchor, event: Event): void {
            this.$emit('click', event, this.node);
        },
        handleFocus: function (event: Event): void {
            if (event.target) {
                if (event.type === 'focus') {
                    this.$emit('focus', event);
                } else if (event.type === 'blur') {
                    this.$emit('blur', event);
                }
            }
        },
        handleKey: function (this: TreeNodeAnchor, event: Event): void {
            this.$emit('keydown', event);
        }
    }
}