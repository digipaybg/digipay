<template>
  <table class="notion-table">
    <thead v-if="tableBlock.table?.has_column_header">
      <tr>
        <th
          v-for="(cell, index) in getHeaderRow()"
          :key="`header-${index}`"
          class="notion-table-header"
        >
          <NotionRichText :rich-text="cell" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in getDataRows()"
        :key="`row-${rowIndex}`"
        class="notion-table-row"
      >
        <td
          v-for="(cell, cellIndex) in row.table_row?.cells || []"
          :key="`cell-${rowIndex}-${cellIndex}`"
          class="notion-table-cell"
        >
          <NotionRichText :rich-text="cell" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  tableBlock: BlockObjectResponse;
  children: BlockObjectResponse[];
}

const props = defineProps<Props>();

const getHeaderRow = () => {
  if (
    !props.tableBlock.table?.has_column_header ||
    props.children.length === 0
  ) {
    return [];
  }

  const firstRow = props.children[0];
  if (firstRow.type === "table_row") {
    return firstRow.table_row?.cells || [];
  }

  return [];
};

const getDataRows = () => {
  const startIndex = props.tableBlock.table?.has_column_header ? 1 : 0;
  return props.children
    .slice(startIndex)
    .filter((child) => child.type === "table_row");
};
</script>

<style scoped>
.notion-table {
  @apply w-full border-collapse border border-muted rounded-lg overflow-hidden;
}

.notion-table-header {
  @apply bg-muted font-semibold text-left p-3 border-b border-muted;
}

.notion-table-row:nth-child(even) {
  @apply bg-muted/20;
}

.notion-table-cell {
  @apply p-3 border-b border-muted text-sm;
}

.notion-table-row:last-child .notion-table-cell {
  @apply border-b-0;
}

/* Responsive table */
@media (max-width: 640px) {
  .notion-table {
    @apply text-xs;
  }

  .notion-table-header,
  .notion-table-cell {
    @apply p-2;
  }
}
</style>
