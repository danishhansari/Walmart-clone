export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
export const rerender = async (component) => {
  document.querySelector('#hero').innerHTML = await component.render();
  await component.after_render()
}
