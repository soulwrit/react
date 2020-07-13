import assert from '@writ/utils/assert';
export function Queue() {
    assert.truly(this instanceof Queue, 'Queue is a constructor, must new.');
    this.nodes = [];
}
Queue.prototype.get = function get() {
    return [].concat(this.nodes);
}
Queue.prototype.append = function append(inst) {
    const nodes = this.nodes;
    assert.truly(nodes.indexOf(inst) === -1, 'Queue member has be existed.');
    nodes.push(inst);
}
Queue.prototype.remove = function remove(inst) {
    const nodes = this.nodes;
    const index = nodes.indexOf(inst);

    assert.truly(index > -1, 'Queue member does existed.');
    nodes.splice(index, 1);
}