export function getElementData (selector) {
  if (typeof selector === 'string') {
    return {
      element: document.querySelector(selector),
      value: Number(document.querySelector(selector).innerHTML),
      text: document.querySelector(selector).innerHTML
    }
  } else if (selector instanceof window.HTMLElement) {
    return {
      element: selector,
      value: Number(selector.innerHTML),
      text: selector.innerHTML
    }
  }
}

export function createElement (tagname, props, children) {

}
