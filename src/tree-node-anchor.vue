<template>
  <a
    ref="anchor"
    :id="node.id"
    :rel="node.url"
    :tabindex="tabindex"
    v-bind:aria-controls="ariaControls"
    :aria-expanded="ariaExpanded"
    :aria-popup="ariaPopup"
    @blur="handleFocus"
    @click.prevent="handleClick"
    @focus="handleFocus"
    @keydown="handleKey"
    href="javascript:;"
    role="menuitem"
  >
    {{ node.title }}
    <span 
      v-if="hasChildren" 
      v-text="isExpanded" 
    />
  </a>
</template>

<script lang="ts" src="./tree-node-anchor.ts"></script>