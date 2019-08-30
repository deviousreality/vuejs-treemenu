<template>
  <ul 
    :class="cssClassUl" 
    role="menu" 
    tabindex="-1"
  >
    <li
      v-for="(node, index) in nodeData"
      :key="node.id"
      :class="nodeLiClass(node)"
      role="none"
    >
      <component 
        ref="a"
        :is="currentAnchor"
        :isExpanded="node.isExpanded"
        :node="node"
        :tabindex="node.tabindex"
        @blur="anchorBlur($event, index)"
        @click="anchorClick($event, index)"
        @focus="anchorFocus($event, index)"
        @keydown="anchorKeydown($event, index)"
      />
      <node
        v-if="hasChildren(node)"
        v-show="node.isExpanded"
        :aria-labeledby="ulAriaLabeledby(node)"
        :cssClassLi="cssClassLi"
        :cssClassLiCondition="cssClassLiCondition"
        :cssClassUl="cssClassUl"
        :id="ulIdAttr(node)"
        :nodeData="node.children"
        @node-blur="nodeBlur(...arguments, index)"
        @node-collapse="nodeCollapse(...arguments, index)"
        @node-expand="nodeExpand(...arguments, index)"
        @node-focus="nodeFocus(...arguments, index)"
        @node-movedown="nodeMovedown(...arguments, index)"
        @node-moveup="nodeMoveup(...arguments, index)"
        @node-select="nodeSelect(...arguments, index)"
      />
    </li>
  </ul>
</template>

<script lang="ts" src="./tree-node.ts"></script>