export function animateModal(id: string, isOpen: boolean) {
  const stack: HTMLElement[] = [];
  const element = document.getElementById(id);
  if (element) {
    stack.push(element);
    const modal = element.querySelector("div[data-open]") as HTMLDivElement;
    if (modal) stack.push(modal);
  }
  if (stack.length == 0) {
    return false;
  }

  if (isOpen) {
    stack.forEach((el) => {
      el.dataset.open = "true";
    });
  } else {
    stack.reverse().forEach((el) => {
      el.dataset.open = "false";
      console.log(el.id);
    });
  }
  return true;
}
