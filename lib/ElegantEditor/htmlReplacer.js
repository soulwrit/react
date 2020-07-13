export function replaceHtmlSymbol(html) {
    if (html == null) {
        return ''
    }
    return html.replace(/</gm, '&lt;')
        .replace(/>/gm, '&gt;')
        .replace(/"/gm, '&quot;')
        .replace(/(\r\n|\r|\n)/g, '<br/>')
}