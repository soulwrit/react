function assert(expr, message) {
  if (expr || window.DEV === false) return;
  if (window.THROW) throw new Error(message);
  console.error('ConsoleAssertEx\n ', message);
}

var assertConsole = assert;

export { assertConsole as a };
