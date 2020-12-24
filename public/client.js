document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/data');
    const data = await response.json();
    for (const item of data.data.search.edges) {
      document.querySelector('tbody').insertAdjacentHTML('beforeend', `
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            ${item.node.owner.login}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            ${item.node.name}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            ${item.node.stargazers.totalCount}
          </td>
        </tr>
      `)
    }
  } catch (err) {
    console.log(err);
  }
});
