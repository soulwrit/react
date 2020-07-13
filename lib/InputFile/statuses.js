export const code = {
    wait: 'WAIT',
    doing: 'DOING',
    ok: 'OK',
    not: 'NOT',
    redo: 'REDO',
    done: 'DONE',
};
export const status = {
    upload: {
        [code.wait]: ['warning', '未上传', '上传'],
        [code.doing]: ['primary', '上传中', '中止'],
        [code.ok]: ['success', '上传成功', ''],
        [code.not]: ['danger', '上传失败', '重试'],
        [code.redo]: ['fatal', '重新上传', '重试'],
        [code.done]: ['muted', '已上传', ''],
    },
    download: {
        [code.wait]: ['warning', '下载'],
        [code.doing]: ['primary', '下载中'],
        [code.ok]: ['success', '下载成功'],
        [code.not]: ['danger', '下载失败'],
        [code.redo]: ['fatal', '重新下载'],
        [code.done]: ['muted', '已下载'],
    },
    remove: {
        [code.wait]: ['warning', '删除'],
        [code.doing]: ['primary', '删除中'],
        [code.ok]: ['success', '删除成功'],
        [code.not]: ['danger', '删除失败'],
        [code.redo]: ['fatal', '重新删除'],
        [code.done]: ['muted', '已删除'],
    }
};