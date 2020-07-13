function AssertError(message) {
  this.message = message;
}

AssertError.prototype = new Error();
AssertError.prototype.name = 'AssertError';

function ok(expr, message) {
  if (expr === true) {
    throw new AssertError(message);
  }
}

function falsly(expr, message) {
  if (expr === false) {
    throw new AssertError(message);
  }
}

function truly(expr, message) {
  if (expr === true) {
    return;
  }

  throw new AssertError(message);
}

function nuil(expr, message) {
  if (expr == null) {
    throw new AssertError(message);
  }
}

function error(expr, message) {
  if (expr instanceof Error) {
    throw new AssertError(message);
  }
}

function outputError(message) {
  throw new AssertError(message);
}

function report(error) {
  if (error instanceof Error) {
    const message = 'Current Error Information: ' + error.message + ',\
       the error may be caused by us, if you can\'t solve it, please contact me.\
       My email is [tianlugang@yeah.net], QQ: 2678962889.';
    console.error(new AssertError(message));
    return;
  }
}

function assert(expr, message) {
  if (expr == null || expr === false || expr instanceof Error) {
    console.error(new AssertError(message));
  }
}

assert.error = error;
assert.falsly = falsly;
assert.nuil = nuil;
assert.report = report;
assert.truly = truly;
assert.throw = outputError;
assert.ok = ok;
console.assert = assert;
var assert_1 = assert;

export { assert_1 as a };
