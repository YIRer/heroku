export default (htmlData, html, helmet, extraChunks, preloadedState, loadableState) => (
  htmlData
  .replace('</body>', extraChunks.join('') + '</body>')
  .replace(`<html lang="en" itemscope>`,`<html ${helmet.htmlAttributes.toString()} itemscope>`)
  .replace('<meta helmet>', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)
  .replace('<div id="root"></div>', 
    `
      <div id="root">${html}</div>
      <script>window.__PRELOADED_STATE__ = ${JSON.stringify (preloadedState)}</script>
      ${loadableState.getScriptTag()}
    `
  )
)