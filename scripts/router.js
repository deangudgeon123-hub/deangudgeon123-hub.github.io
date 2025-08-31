let renderFn;
let stack = [];

export function init(fn, initialRoute) {
  renderFn = fn;
  stack = [initialRoute];
  renderFn(initialRoute);
}

export function navigate(route) {
  stack.push(route);
  renderFn(route);
}

export function back() {
  if (stack.length > 1) stack.pop();
  renderFn(stack[stack.length - 1]);
}
