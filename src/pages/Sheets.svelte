<script>
  import { RevoGrid } from '@revolist/svelte-datagrid';

  function generateHeader(index) {
    const asciiFirstLetter = 65;
    const lettersCount = 26;
    let div = index + 1;
    let label = '';
    let pos = 0;
    while (div > 0) {
      pos = (div - 1) % lettersCount;
      label = String.fromCharCode(asciiFirstLetter + pos) + label;
      div = parseInt(((div - pos) / lettersCount).toString(), 10);
    }
    return label.toLowerCase();
  }

  function generateFakeDataObject(rowsNumber, colsNumber) {
    const result = [];
    // const columns = {};

    const columns = [
      {
        name: 'Person name',
        prop: 'name',
        cellTemplate: (createElement, props) => {
          return createElement(
            'h1',
            {
              style: {
                color: 'red',
              },
            },
            props.model[props.prop]
          );
        },
      },
    ];

    const all = colsNumber * rowsNumber;
    for (let j = 0; j < all; j++) {
      let col = j % colsNumber;
      let row = (j / colsNumber) | 0;
      if (!result[row]) {
        result[row] = {};
      }
      if (!columns[col]) {
        columns[col] = {
          name: generateHeader(col),
          prop: col,
        };
      }
      result[row][col] = row + ':' + col;
    }
    let headers = Object.keys(columns).map((k) => columns[parseInt(k, 10)]);
    return {
      source: result,
      headers,
    };
  }

  function onEdit(e) {
    console.log(e);
  }

  const data = { ...generateFakeDataObject(100, 5) };
  let source = data.source;
  let columns = data.headers;
</script>

<div class="revo-grid">
  top
  <RevoGrid on:beforeedit="{onEdit}" source="{source}" resize="true" columns="{columns}" theme="material" range />
  bottom
</div>

<!-- <RevoGrid on:beforeedit="{onEdit}" source="{source}" resize="true" columns="{columns}" theme="material">
  hello
</RevoGrid> -->
<style>
  .revo-grid {
    height: 86vh;
  }
</style>
